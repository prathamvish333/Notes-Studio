from typing import Optional

from pydantic import BaseModel

from .user import UserOut


class TokenData(BaseModel):
    user_id: int
    email: str


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Optional[UserOut] = None

