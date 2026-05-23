# 🇩🇪 Germany University Comparison Dashboard

A fully containerized interactive dashboard designed to analyze and compare German universities for Master's admissions based on academic profile, tuition fees, living costs, DevOps career alignment, eligibility, and application requirements.

This project was developed as part of my DevOps learning journey and demonstrates frontend deployment, Docker containerization, Docker Compose orchestration, CI/CD automation using GitHub Actions and live site using GitHub Pages.

---

## 🚀 Features

- 📊 Interactive university comparison dashboard
- 📑 Multi-tab navigation system
- 🎯 DevOps-focused university recommendations
- 💰 Tuition fee and living expense analysis
- 📌 Admission eligibility tracking
- 🏙️ City-wise comparison and guidance
- ⚡ Responsive UI design
- 🐳 Dockerized deployment using Nginx
- ⚙️ Docker Compose orchestration
- 🔄 CI/CD pipeline with GitHub Actions

---

## 🛠️ Tech Stack

- HTML5
- Docker
- Docker Compose
- Nginx
- GitHub Actions
- GitHub Pages

---

## 🐳 Containerization

The application is containerized using Docker and served through Nginx for lightweight and production-style deployment.

---

## ⚙️ CI/CD Workflow

A GitHub Actions pipeline automatically:

1. Validates project files
2. Builds the Docker image
3. Validates Docker Compose configuration
4. Automates deployment workflow preparation

---

## 📂 Project Structure

```bash
.
├── index.html
├── Dockerfile
├── docker-compose.yml
└── .github/workflows/ci-cd.yml