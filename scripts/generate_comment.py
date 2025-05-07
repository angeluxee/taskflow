import subprocess
import os
import openai
import requests

openai.api_key = os.getenv("OPENAI_API_KEY")
github_token = os.getenv("GITHUB_TOKEN")
repo = os.getenv("GITHUB_REPOSITORY")
pr_number = os.getenv("PR_NUMBER")

# Fetch all branches to ensure origin/main is available
subprocess.check_call(["git", "fetch", "--all"])

def get_diff():
    try:
        # Try to get the diff with origin/main
        return subprocess.check_output(["git", "diff", "origin/main...HEAD"], text=True)
    except subprocess.CalledProcessError:
        try:
            # Fallback to origin/master if origin/main is not available
            return subprocess.check_output(["git", "diff", "origin/master...HEAD"], text=True)
        except subprocess.CalledProcessError:
            # Fallback to local diff if no remote branch is available
            return subprocess.check_output(["git", "diff", "HEAD~1..HEAD"], text=True)

diff = get_diff()

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful code reviewer."},
        {"role": "user", "content": f"Review the following code diff and write a helpful comment:\n{diff}"}
    ]
)

comment = response["choices"][0]["message"]["content"]

# Post the comment to the PR
url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
headers = {"Authorization": f"token {github_token}"}
payload = {"body": comment}
requests.post(url, headers=headers, json=payload)
