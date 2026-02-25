from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from .. import schemas
from ..database import get_db
from ..services import auth_service


router = APIRouter()


@router.post(
    "/signup",
    response_model=schemas.AuthResponse,
    status_code=status.HTTP_201_CREATED,
)
def signup(user_in: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user and automatically create a default note.
    Returns an access token and user details.
    """
    return auth_service.register_user(db, user_in)


@router.post(
    "/login",
    response_model=schemas.AuthResponse,
)
def login(login_in: schemas.UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate a user and return an access token.
    """
    return auth_service.login_user(db, login_in)

