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

# Generate comment using OpenAI's new API format with gpt-4o
response_gpt4o = client.chat.completions.create(
    model="gpt-4o",
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

comment_gpt4o = response_gpt4o.choices[0].message.content
comment_gpt4o = f"## AI Review Bot (gpt-4o)\n\n{comment_gpt4o}"

# Generate comment using OpenAI's new API format with o4-mini
response_o4_mini = client.chat.completions.create(
    model="o4-mini",
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

comment_o4_mini = response_o4_mini.choices[0].message.content
comment_o4_mini = f"## AI Review Bot (o4-mini)\n\n{comment_o4_mini}"

# Post the gpt-4o comment to the PR
url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
headers = {"Authorization": f"token {github_token}"}

payload_gpt4o = {"body": comment_gpt4o}
print(f"Posting gpt-4o comment to PR #{pr_number}")
comment_response_gpt4o = requests.post(url, headers=headers, json=payload_gpt4o)

if comment_response_gpt4o.status_code == 201:
    print("gpt-4o comment posted successfully!")
else:
    print(f"Error posting gpt-4o comment: {comment_response_gpt4o.status_code}")
    print(comment_response_gpt4o.text)

# Post the o4-mini comment to the PR
payload_o4_mini = {"body": comment_o4_mini}
print(f"Posting o4-mini comment to PR #{pr_number}")
comment_response_o4_mini = requests.post(url, headers=headers, json=payload_o4_mini)

if comment_response_o4_mini.status_code == 201:
    print("o4-mini comment posted successfully!")
else:
    print(f"Error posting o4-mini comment: {comment_response_o4_mini.status_code}")
    print(comment_response_o4_mini.text)
