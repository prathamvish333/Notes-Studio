from sqlalchemy.orm import Session

from .. import models, schemas


def get_notes_for_user(db: Session, user_id: int) -> list[models.Note]:
    return (
        db.query(models.Note)
        .filter(models.Note.owner_id == user_id)
        .order_by(models.Note.updated_at.desc())
        .all()
    )


def get_note_for_user(
    db: Session, note_id: int, user_id: int
) -> models.Note | None:
    return (
        db.query(models.Note)
        .filter(models.Note.id == note_id, models.Note.owner_id == user_id)
        .first()
    )


def create_note_for_user(
    db: Session, user_id: int, note_in: schemas.NoteCreate
) -> models.Note:
    note = models.Note(
        title=note_in.title,
        content=note_in.content,
        owner_id=user_id,
    )
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


def update_note_for_user(
    db: Session, note: models.Note, note_in: schemas.NoteUpdate
) -> models.Note:
    if note_in.title is not None:
        note.title = note_in.title
    if note_in.content is not None:
        note.content = note_in.content
    db.add(note)
    db.commit()
    db.refresh(note)
    return note


def delete_note_for_user(db: Session, note: models.Note) -> None:
    db.delete(note)
    db.commit()

