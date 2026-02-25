from sqlalchemy.orm import Session

from .. import crud, models, schemas


DEFAULT_NOTE_TITLE = "Welcome to Notes Studio"
DEFAULT_NOTE_CONTENT = """Welcome to Notes Studio.

Notes Studio is a production-style application designed to reflect how modern backend systems are structured, secured, and maintained. Rather than serving as a basic CRUD demonstration, this project emphasizes clean API design, robust data integrity, and practical software engineering patterns utilized in scalable architectures.

🔹 Project Overview

Notes Studio is built using:

• FastAPI for high-performance API development
• PostgreSQL for persistent data storage
• Next.js for a lightweight, optimized frontend interface
• SQLAlchemy ORM for database interaction
• Pydantic for strict data validation
• JWT Authentication for secure access control

🔹 3-Tier Containerized Architecture

This project has been Dockerized into a full 3-tier architecture:
1. Frontend Container (Next.js Standalone Build)
2. Backend API Container (FastAPI with Uvicorn)
3. Database Container (PostgreSQL)
They communicate over an isolated Docker network using Docker Compose.

🚀 Future DevOps Infrastructure Plannings:
We are actively working to migrate this project to a robust Kubernetes (K8s) environment, which will feature:
• ArgoCD for GitOps continuous deployment
• Prometheus & Grafana for advanced system monitoring and metrics

🔹 API Inspection & Security Demo

You can inspect the production-style API routing and security right from your browser!
1. Right-click anywhere on the page and select "Inspect" (or press F12).
2. Go to the "Network" tab.
3. Refresh the page or click "New note".
4. Click on any of the network requests (like `notes/`) and look at the "Headers" tab.
5. You will see an `Authorization: Bearer <token>` header being sent to the backend. This is the JWT token that securely identifies you without using session cookies!

🔹 Developer Profiles

LinkedIn:
https://www.linkedin.com/in/prathamvishwakarma/

GitHub:
https://github.com/prathamvish333

Thank you for exploring Notes Studio."""


def create_default_note_for_user(db: Session, user: models.User) -> models.Note:
    note_in = schemas.NoteCreate(title=DEFAULT_NOTE_TITLE, content=DEFAULT_NOTE_CONTENT)
    return crud.create_note_for_user(db, user_id=user.id, note_in=note_in)


def list_notes_for_user(db: Session, user: models.User) -> list[models.Note]:
    return crud.get_notes_for_user(db, user_id=user.id)


def get_note_for_user_or_404(
    db: Session, note_id: int, user: models.User
) -> models.Note:
    note = crud.get_note_for_user(db, note_id=note_id, user_id=user.id)
    if not note:
        from fastapi import HTTPException, status

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Note not found"
        )
    return note


def create_note_for_user(
    db: Session, user: models.User, note_in: schemas.NoteCreate
) -> models.Note:
    return crud.create_note_for_user(db, user_id=user.id, note_in=note_in)


def update_note_for_user(
    db: Session, user: models.User, note_id: int, note_in: schemas.NoteUpdate
) -> models.Note:
    note = get_note_for_user_or_404(db, note_id=note_id, user=user)
    return crud.update_note_for_user(db, note=note, note_in=note_in)


def delete_note_for_user(db: Session, user: models.User, note_id: int) -> None:
    note = get_note_for_user_or_404(db, note_id=note_id, user=user)
    crud.delete_note_for_user(db, note=note)

