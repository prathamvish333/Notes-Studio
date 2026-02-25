from sqlalchemy.orm import Session

from .. import crud, models, schemas


DEFAULT_NOTE_TITLE = "Welcome to Notes Studio"
DEFAULT_NOTE_CONTENT = """Welcome to Notes Studio!

Notes Studio is created by Pratham Vishwakarma, a Backend & DevOps Engineer with a strong focus on building scalable services, automation-driven systems, and highly available architectures.

This project is not just a basic CRUD application; it serves as a live, production-grade showcase of modern software engineering patterns, system design, and DevOps principles.

🔹 Engineering Skills & Expertise Highlighted:
• Backend Development: FastAPI, Python, SQLAlchemy ORM, Pydantic
• Database Management: PostgreSQL, Data Modeling, Migrations
• Security & Authentication: Stateless JWT Auth, Secure API Routing
• Containerization: Docker, Minimal multi-stage builds (Next.js Standalone, Python slim) 
• Orchestration: Kubernetes (Deployments, Services, Secrets, Namespaces, LoadBalancers)
• Infrastructure: 3-Tier Architecture (Frontend, API, DB)

🔹 Kubernetes & Docker Architecture
Notes Studio is fully deployed in a 3-tier containerized architecture on Kubernetes:
1. Frontend Deployment (Next.js optimized standalone build)
2. Backend API Deployment (FastAPI, scaled with multiple replicas for High Availability)
3. Database Deployment (PostgreSQL with secure internal credentials)

These services are orchestrated using Kubernetes Services, Namespaces, and securely managed Secrets, demonstrating real-world cloud-native capabilities.

🚀 Infrastructure Roadmap:
We are continuing to expand this cluster with:
• ArgoCD for GitOps continuous delivery
• Prometheus & Grafana for advanced metrics and log monitoring

🔹 API Inspection & Security Demo
Explore the production-style API interactions live:
1. Right-click anywhere and select "Inspect" (F12).
2. Navigate to the "Network" tab.
3. Refresh the page or click "New note".
4. Click any backend request (like `notes/`) and check the "Headers" tab.
5. You will see an `Authorization: Bearer <token>` header verifying your identity seamlessly.

🔹 Connect with the Creator

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

