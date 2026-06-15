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

    Uses the google-genai SDK with automatic_function_calling so that when Gemini
    decides to invoke a tool, the SDK executes the local Python function automatically
    and feeds the result back — giving us a final text reply every time.
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

        # Use a chat session with automatic_function_calling (default: enabled).
        # This means when the model returns a tool call, the SDK will:
        #   1. Execute the matching Python function locally
        #   2. Send the result back to the model
        #   3. Return the model's final text answer
        # So response.text will always contain a human-readable reply.
        chat = client.chats.create(
            model="gemini-2.0-flash",
            config=types.GenerateContentConfig(
                tools=my_tools,
                automatic_function_calling=types.AutomaticFunctionCallingConfig(
                    disable=False,
                    maximum_remote_calls=10,
                ),
                system_instruction=(
                    "You are a DevOps AI assistant with access to tools for "
                    "Kubernetes, Jenkins, ArgoCD, Docker, Trivy, SonarQube and Git. "
                    "When the user asks about infrastructure, always use the available "
                    "tools to get real-time data before answering."
                ),
            ),
        )

        response = chat.send_message(request.message)
        return {"reply": response.text}

    except Exception as e:
        return {"reply": f"AI Error: {str(e)}"}
