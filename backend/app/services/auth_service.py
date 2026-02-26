from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from .. import crud, models, schemas
from ..core.security import create_access_token, verify_password
from .note_service import create_default_note_for_user


def authenticate_user(db: Session, email: str, password: str) -> models.User:
    user = crud.get_user_by_email(db, email=email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    return user


def register_user(db: Session, user_in: schemas.UserCreate) -> schemas.AuthResponse:
    existing = crud.get_user_by_email(db, email=user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered",
        )

    user = crud.create_user(db, user_in=user_in)

    create_default_note_for_user(db, user)

    access_token = create_access_token({"user_id": user.id, "email": user.email})
    return schemas.AuthResponse(access_token=access_token, user=user)


def login_user(db: Session, login_in: schemas.UserLogin) -> schemas.AuthResponse:
    user = authenticate_user(db, login_in.email, login_in.password)
    access_token = create_access_token({"user_id": user.id, "email": user.email})
    return schemas.AuthResponse(access_token=access_token, user=user)

