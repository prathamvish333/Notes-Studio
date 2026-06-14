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
        
        # We use the Gemini Flash model as it is extremely fast and great for function calling
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        # NOTE: In the next step, we will bind all our K8s, Docker, and Jenkins functions
        # as "tools" to this model so it can run them autonomously!
        
        response = model.generate_content(request.message)
        return {"reply": response.text}
        
    except Exception as e:
        return {"reply": f"AI Error: {str(e)}"}
