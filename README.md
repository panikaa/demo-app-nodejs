# 🌐 **How These Repositories Work Together**

This project is split into three separate repositories, each responsible for a different layer of the platform.
Together, they form a complete, production-ready **AWS → Kubernetes → GitOps** delivery pipeline.

---

## 🔧 **1. [terraform-aws-k8s-platform](https://github.com/panikaa/terraform-aws-k8s-platform) — Infrastructure Layer (IaC)**

This repository provisions the entire cloud environment using Terraform:

* VPC, subnets, routing
* EKS cluster
* RDS/PostgreSQL
* ALB + target groups
* IAM roles, OIDC provider
* AWS Secrets Manager (for Kubernetes External Secrets)

**Output of this repository is a fully bootstrapped EKS cluster**, ready to be managed declaratively through GitOps.

---

## 📦 **2. [gitops-cluster-config](https://github.com/panikaa/gitops-cluster-config) — Runtime & GitOps Layer**

This repository defines the **desired state** of the EKS cluster:

* ArgoCD applications and sync rules
* Helm releases for system components
* Ingress, HPA, services
* External Secrets Operator
* Node/pod-level configurations
* Deployment definitions for each environment (dev/staging/prod)

ArgoCD continuously reconciles this repository with the live cluster, ensuring that **Kubernetes always matches what is stored in Git**.

Terraform provides the cluster →
GitOps manages the cluster →
Everything flows through pull requests.

---

## 🚀 **3. [demo-app-nodejs](https://github.com/panikaa/demo-app-nodejs) — Application Layer (CI/CD + Helm)**

This repository contains the sample Node.js application:

* Source code
* Dockerfile (multi-stage)
* Helm chart
* GitHub Actions pipeline:

  * build
  * test
  * scan
  * push to ECR
  * version bump → GitOps repo update

The GitOps update step automatically changes the image version in the `gitops-cluster-config` repository.
ArgoCD detects the change and deploys the new version to the EKS cluster.

---

# 🔄 **End-to-End Delivery Flow**

```
[1] terraform-aws-k8s-platform
        │
        ▼
Creates EKS cluster + AWS infrastructure
        │
        ▼
[2] gitops-cluster-config
Declaratively manages cluster state via ArgoCD
        │
        ▼
[3] demo-app-nodejs
Builds & pushes image → updates GitOps repo
        │
        ▼
ArgoCD applies new release to the cluster
```

---

# HCM Platform – Demo Application (Node.js + React + PostgreSQL + Kubernetes)

This repository contains a production-grade **Human Capital Management (HCM)** demo platform designed to showcase modern DevOps, SRE, and Cloud-Native engineering practices.

The system includes:

- **Backend**: Node.js (TypeScript), Express, Prisma ORM
- **Frontend**: React + Vite
- **Database**: PostgreSQL
- **Worker jobs**: Background sync worker & data generator
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Deployments, Services, HPA, StatefulSet)
- **Ingress**: NGINX Ingress Controller
- **Helm chart**: Full production-ready Helm chart

This application is used for:
- Demonstrating CI/CD pipelines
- GitOps deployments (ArgoCD / FluxCD)
- Infrastructure as Code with Terraform (EKS + RDS)
- Kubernetes best practices

---

## 🚀 Features

### Application Features
- Employee CRUD API (`/api/employees`)
- System diagnostics (`/api/system`)
- Database-backed employee storage using Prisma + PostgreSQL
- Frontend dashboard listing employees with pagination
- Employee detail view with extended profile data
- Background worker generating random events & updates

### DevOps / SRE Features
- Dockerized backend & frontend
- Full Helm chart for installation on Kubernetes
- Ingress routing frontend + backend on shared domain
- Auto Prisma migrations on container startup
- Health checks (readiness & liveness probes)
- Horizontal Pod Autoscaler (HPA) for backend
- K8s manifests organized by Helm templates

---

## 🏗 Architecture Overview

                    ┌──────────────────────────┐
                    │        Frontend          │
                    │    React + Nginx         │
                    └────────────┬─────────────┘
                                 │ / (SPA)
                                 ▼
                        ┌─────────────────┐
                        │  NGINX Ingress  │
                        └───────┬────────┘
                /api           │            /assets
                 ▼             │                 ▼
        ┌────────────────┐     │     ┌────────────────┐
        │   Backend      │◄────┘     │   Frontend      │
        │ Node.js + TS   │           │ React + Nginx   │
        └───────┬────────┘           └────────────────┘
                │ Prisma
                ▼
        ┌──────────────────┐
        │   PostgreSQL      │
        │   StatefulSet     │
        └──────────────────┘
---

## 📦 Project Structure

---

```
demo-app-nodejs/
  backend/
    src/
      prisma/
    Dockerfile
  frontend/
    src/
    Dockerfile
  charts/
    hcm/
      Chart.yaml
      values.yaml
  templates/
    k8s/
      base/ (legacy manifests before Helm)
```

---

## 🐳 Docker Build

### Backend
```
cd backend
docker build -t hcm-backend:1.0 .
```

### Frontend
```
cd frontend
docker build -t hcm-frontend:1.0 .
```

## ☸️ Deploying to Kubernetes with Helm
Ensure the namespace exists:

```
kubectl create namespace hcm
```

### Install the chart:

```
helm install hcm ./charts/hcm -n hcm
```

### Upgrade:

```
helm upgrade hcm ./charts/hcm -n hcm
```
Remove:

```
helm uninstall hcm -n hcm
```

## 🌐 Accessing the App
Configure DNS or /etc/hosts:

```
<MINIKUBE_IP>  tailon.suramar.int
```
Then open:

```
http://tailon.suramar.int
```

### API test:

```
curl http://tailon.suramar.int/api/health
curl http://tailon.suramar.int/api/employees?page=1
```

## 🧪 Health Checks
Backend:

Liveness: /api/health

Readiness: /api/health

Frontend:

Nginx static SPA → always live after pod start.

## 📈 Autoscaling
HPA is included:

```
autoscaling/v2
backend minReplicas = 1
backend maxReplicas = 5
CPU target = 60%
```

### Enable metrics server:

```
minikube addons enable metrics-server
```

## 🛠 Local Development

### Backend
```
cd backend
npm install
npm run dev
```
### Frontend
```
cd frontend
npm install
npm run dev
```
# 🎯 Purpose of This Repository
This project is intentionally designed to be rich in DevOps/SRE elements so it can be used for:

Resume / CV portfolio

DevOps engineer showcase

GitOps demo

Kubernetes, Helm, and Terraform labs

CI/CD pipelines (GitHub Actions, GitLab, Jenkins)

Cloud deployment (EKS + RDS + ALB)

# 📜 License
MIT License — free to use and extend.

# 🤝 Contributing
PRs welcome!
This project is structured to be easily expandable (monitoring, service mesh, tracing, multitenancy, etc.).
