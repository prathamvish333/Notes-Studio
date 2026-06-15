import os
import google.generativeai as genai
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
        genai.configure(api_key=api_key)
        
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
        
        # We use the Gemini Flash model as it is extremely fast and great for function calling
        # Register the tools directly during initialization of GenerativeModel
        model = genai.GenerativeModel('gemini-1.5-flash', tools=my_tools)
        
        # We start a chat session because function calling requires maintaining conversation history
        # so the model can call the tool, receive the response, and then answer the user.
        chat = model.start_chat()
        
        # Send the user's message. The model may decide to call a tool, in which case the chat wrapper
        # will automatically execute our local Python function and send the result back to Gemini!
        response = chat.send_message(request.message)
        
        return {"reply": response.text}
        
    except Exception as e:
        return {"reply": f"AI Error: {str(e)}"}
