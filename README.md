# Bharatanatyam Alaripu Tala Detector

A full-stack web application for detecting Alaripu nadai tala classes (Tishra, Chatusra, Kandam) from uploaded or recorded audio using TensorFlow + YAMNet embeddings and a trained Keras classifier.

## Setup Instructions

1. Copy the 3 model files into backend/models/
   - tala_final_model.keras
   - model_config.pkl
   - label_encoder.pkl
2. Run backend/setup_db.sql in MySQL to create the database and tables.
3. Open backend/.env and fill your connection values (DATABASE_URL, SECRET_KEY, JWT_SECRET_KEY, etc.).
4. Start backend:
   - cd backend
   - python -m venv venv
   - Activate virtual environment:
     - Windows PowerShell: .\\venv\\Scripts\\Activate.ps1
   - pip install -r requirements.txt
   - python app.py
5. Start frontend:
   - cd frontend
   - npm install
   - npm start
6. Open http://localhost:3000
7. Register an account, login, upload audio, and detect tala.
