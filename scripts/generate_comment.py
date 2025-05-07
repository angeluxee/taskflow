import openai
import os
import subprocess
import requests

openai.api_key = os.getenv("OPENAI_API_KEY")
github_token = os.getenv("GITHUB_TOKEN")
repo = os.getenv("GITHUB_REPOSITORY")
pr_number = os.getenv("PR_NUMBER")

# Actualiza las ramas remotas
subprocess.check_call(["git", "fetch", "origin"])

# Ahora realiza la comparación entre main y la rama actual
diff = subprocess.check_output(["git", "diff", "origin/main...HEAD"], text=True)

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",  # Puedes usar gpt-3.5-turbo si quieres
    messages=[
        {"role": "system", "content": "You are a helpful code reviewer."},
        {"role": "user", "content": f"Review the following code diff and write a helpful comment:\n{diff}"}
    ]
)

comment = response["choices"][0]["message"]["content"]

# Publicar el comentario en la PR
url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
headers = {"Authorization": f"token {github_token}"}
payload = {"body": comment}
requests.post(url, headers=headers, json=payload)
