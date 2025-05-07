import os
import requests
import json
import subprocess
from openai import OpenAI

# Get environment variables
openai_api_key = os.getenv("OPENAI_API_KEY")
github_token = os.getenv("GITHUB_TOKEN")
repo = os.getenv("GITHUB_REPOSITORY")
pr_number = os.getenv("PR_NUMBER")

# Initialize the OpenAI client with the API key
client = OpenAI(api_key=openai_api_key)

def get_diff_from_github_api():
    """Fetch the PR diff directly from GitHub's API."""
    print(f"Fetching diff from GitHub API for PR #{pr_number} in {repo}")
    
    headers = {
        "Accept": "application/vnd.github.v3.diff",
        "Authorization": f"token {github_token}"
    }
    
    url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}"
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error fetching PR diff: {response.status_code}")
        print(response.text)
        # Fallback to an empty diff if API fails
        return "No diff available"
    
    return response.text

# Get the diff using GitHub API
diff = get_diff_from_github_api()

# Generate comment using OpenAI's new API format
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": """Eres un revisor de código experto. Analiza minuciosamente el diff de código proporcionado y ofrece comentarios valiosos que ayuden a mejorar la calidad, seguridad y mantenibilidad del código.

Sigue estas pautas:
1. Primero identifica el tipo de cambios (adición de funcionalidad, corrección de errores, refactorización, etc.)
2. Destaca fortalezas específicas en la implementación
3. Identifica posibles problemas o áreas de mejora:
   - Preocupaciones sobre la calidad del código (legibilidad, mantenibilidad)
   - Consideraciones de rendimiento
   - Vulnerabilidades de seguridad
   - Exhaustividad en el manejo de errores
   - Casos extremos que podrían no estar cubiertos
   - Carencias en las pruebas
4. Sugiere mejoras específicas y accionables con ejemplos de código cuando sea apropiado
5. Considera las mejores prácticas para el lenguaje/framework utilizado
6. Mantén un tono constructivo y útil

Formatea tu revisión con secciones claras usando Markdown. Sé conciso pero exhaustivo."""},
        {"role": "user", "content": f"Revisa el siguiente diff de código y escribe un comentario útil:\n{diff}"}
    ]
)

comment = response.choices[0].message.content

# Add informative header to the comment
comment = f"## AI Review Bot\n\n{comment}"

# Post the comment to the PR
url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
headers = {"Authorization": f"token {github_token}"}
payload = {"body": comment}
print(f"Posting comment to PR #{pr_number}")
comment_response = requests.post(url, headers=headers, json=payload)

if comment_response.status_code == 201:
    print("Comment posted successfully!")
else:
    print(f"Error posting comment: {comment_response.status_code}")
    print(comment_response.text)
