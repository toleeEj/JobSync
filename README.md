JobSync

A full-stack project using Django (backend) and Next.js (frontend).
Backend handles APIs and database operations, while frontend provides a modern UI.

🚀 Project Setup (For Team Members)
1. Clone the repository
git clone https://github.com/toleeEj/JobSync.git
cd JobSync

2. Backend (Django + PostgreSQL)
Create virtual environment
cd backend
python -m venv backend-venv
.\backend-venv\Scripts\Activate.ps1   # Windows PowerShell

Install dependencies
pip install -r requirements.txt

# database connection
DATABASE_NAME=jobsyncdb
DATABASE_USER=tw
DATABASE_PASSWORD=ABcd@123456
DATABASE_HOST=localhost
DATABASE_PORT=5432

Run migrations & start server
python manage.py migrate
python manage.py runserver

3. Frontend (Next.js + TypeScript)
Install dependencies
cd ../frontend
npm install

Run development server
npm run dev


Frontend will be running at http://localhost:3000
.

4. Git & Collaboration Best Practices

Update dependencies → after installing new packages:

Backend: pip freeze > requirements.txt

Frontend: commit updated package-lock.json.

📂 Project Structure
JobSync/
│── backend/          # Django backend
│   ├── backend-venv/ # Virtual environment (ignored in git)
│   ├── requirements.txt
│   └── .gitignore
│
│── frontend/         # Next.js frontend
│   ├── node_modules/ # Dependencies (ignored in git)
│   ├── package.json
│   └── .gitignore
│
│── .gitignore        # Root ignore (system/editor files)
│── README.md         # Setup instructions






✅ Quick Start
# Backend
cd backend
.\backend-venv\Scripts\Activate.ps1
python manage.py runserver

# Frontend
cd ../frontend
npm run dev
