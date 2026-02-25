# Notes Studio

**Notes Studio** is a production-grade, full-stack application designed to showcase modern backend architecture, container orchestration, and seamless frontend integrations. Built by Pratham Vishwakarma, this project demonstrates real-world software engineering practices, prioritizing scalability, security, and maintainability.

---

## 🚀 Architecture Overview

Notes Studio is built using a strict **3-Tier Containerized Architecture** orchestrated by Kubernetes and Docker.

### 1. The Frontend (Next.js)
- **Framework**: Next.js (App Router) + React
- **Styling**: Tailwind CSS with a custom Apple-inspired glassmorphism UI.
- **Optimization**: Configured as a Next.js `standalone` build for ultra-lightweight Docker images.
- **Deployment**: Exposed via a Kubernetes LoadBalancer Service.

### 2. The Backend API (FastAPI)
- **Framework**: FastAPI (Python)
- **Database ORM**: SQLAlchemy with Pydantic for strict schema validation.
- **Security**: Stateless JWT Authentication using bcrypt password hashing.
- **Deployment**: Scaled horizontally using a Kubernetes Deployment with multiple replicas for High Availability (HA).

### 3. The Database (PostgreSQL)
- **Engine**: PostgreSQL for ACID-compliant persistent storage.
- **Security**: Credentials securely injected at runtime using Kubernetes Secrets.
- **Networking**: Isolated internal cluster networking via Kubernetes Services.

---

## 🛠️ Local Development & Deployment

This project relies on Kubernetes (`minikube` or Docker Desktop) to run locally.

### Prerequisites
- Docker
- Minikube or Kubernetes enabled on Docker Desktop
- `kubectl` CLI

### Running the Cluster
1. **Start your local Kubernetes cluster:**
   ```bash
   minikube start
   ```

2. **Apply the Kubernetes Manifests:**
   The `k8s/` directory contains all routing, deployments, and secrets.
   ```bash
   kubectl apply -f k8s/
   ```

3. **Verify running pods:**
   Wait until all pods in the `notes-app` namespace are running:
   ```bash
   kubectl get pods -n notes-app -w
   ```

4. **Expose the LoadBalancer (Minikube users):**
   In a separate terminal, run the tunnel to expose the frontend to your local browser:
   ```bash
   minikube tunnel
   ```

5. **Access the Application:**
   Navigate to `http://localhost:3000` in your web browser.

---

## 🔒 Security & Best Practices Implemented

- **Kubernetes Secrets:** No hardcoded passwords. Database credentials are stored opaquely in Kubernetes Secrets and mounted as environment variables.
- **Stateless Authentication:** JSON Web Tokens (JWT) are used for secure, scalable authentication without the need for sticky load balancer sessions.
- **Separation of Concerns:** The backend is modularized deeply into `routers`, `services`, `crud`, and `schemas`, cleanly separating business logic from database operations.
- **Image Optimization:** Employs multi-stage Dockerfiles (`node:18-alpine` and `python:3.11-slim`) to minimize attack surfaces and registry pull times.

---

## 📫 Connect with the Creator

Created and maintained by **Pratham Vishwakarma**.
- **LinkedIn:** [prathamvishwakarma](https://www.linkedin.com/in/prathamvishwakarma/)
- **GitHub:** [prathamvish333](https://github.com/prathamvish333)

*Note: This repository is intended as a showcase of DevOps and Backend Engineering capabilities.*
