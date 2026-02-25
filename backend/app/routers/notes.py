from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, models
from ..core import get_current_user
from ..database import get_db
from ..services import note_service


router = APIRouter()


@router.get(
    "/",
    response_model=List[schemas.NoteOut],
)
def list_notes(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    """
    List all notes belonging to the authenticated user.
    """
    return note_service.list_notes_for_user(db, current_user)


@router.post(
    "/",
    response_model=schemas.NoteOut,
    status_code=status.HTTP_201_CREATED,
)
def create_note(
    note_in: schemas.NoteCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    """
    Create a new note for the authenticated user.
    """
    return note_service.create_note_for_user(db, current_user, note_in)


@router.get(
    "/{note_id}",
    response_model=schemas.NoteOut,
)
def get_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    """
    Retrieve a single note belonging to the authenticated user.
    """
    return note_service.get_note_for_user_or_404(db, note_id, current_user)


@router.put(
    "/{note_id}",
    response_model=schemas.NoteOut,
)
def update_note(
    note_id: int,
    note_in: schemas.NoteUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    """
    Update an existing note for the authenticated user.
    """
    return note_service.update_note_for_user(db, current_user, note_id, note_in)


@router.delete(
    "/{note_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    """
    Delete a note belonging to the authenticated user.
    """
    note_service.delete_note_for_user(db, current_user, note_id)
    return None

