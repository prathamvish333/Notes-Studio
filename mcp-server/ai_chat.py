import os
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Receives a message from the frontend, sends it to Gemini (with access to our DevOps tools),
    and returns the intelligent response.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return {"reply": "Error: GEMINI_API_KEY environment variable is not set. Cannot contact AI."}
        
    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        from k8s_tools import k8s_get_pods, k8s_get_logs, k8s_get_secret
        from cicd_tools import jenkins_get_builds, argocd_get_apps
        from security_tools import trivy_scan_image, sonarqube_get_metrics
        from infra_tools import docker_list_containers, git_recent_commits

        my_tools = [
            k8s_get_pods, k8s_get_logs, k8s_get_secret,
            jenkins_get_builds, argocd_get_apps,
            trivy_scan_image, sonarqube_get_metrics,
            docker_list_containers, git_recent_commits
        ]

        # Use the new SDK with gemini-2.0-flash (supports function calling)
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=request.message,
            config=types.GenerateContentConfig(
                tools=my_tools,
            ),
        )

        return {"reply": response.text}

    except Exception as e:
        return {"reply": f"AI Error: {str(e)}"}
