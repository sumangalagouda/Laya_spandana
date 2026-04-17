import os
import pickle

import librosa
import noisereduce as nr
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    get_jwt_identity,
    jwt_required,
)
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename

from config import Config


app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db = SQLAlchemy(app)
jwt = JWTManager(app)


TALA_INFO = {
    "tishra": {
        "name": "Tishra Nadai",
        "sanskrit": "तिस्र नडई",
        "tamil": "திஸ்ர நடை",
        "beats": 3,
        "color": "#D4AF37",
        "description": "Tishra Nadai uses three subdivisions per beat creating a flowing meditative rhythm. Rooted in ancient Natya Shastra, it is the most devotional of the three Alaripu nadais.",
        "history": "Dating back to 200 BCE in the Natya Shastra of Bharata Muni, Tishra is the opening tala for invoking the divine. The triplet rhythm was used in temple rituals to create a meditative spiritual atmosphere.",
        "characteristics": [
            "Three subdivisions per beat",
            "Flowing meditative rhythm",
            "Associated with Eka tala in Alaripu",
            "Creates graceful wave-like movement",
            "Used in slower devotional compositions",
        ],
        "mudras": ["Tripataka", "Ardhachandra", "Pataka"],
        "associated_ragas": ["Gambhiranata", "Shankarabharanam", "Kalyani"],
        "performance_tips": "Begin with gentle drishti bhedas (eye movements) and greeva bhedas (neck movements). Introduce hand gestures gradually in triplet patterns matching the 3-beat cycle.",
    },
    "chatusra": {
        "name": "Chatusra Nadai",
        "sanskrit": "चतुस्र नडई",
        "tamil": "சதுஸ்ர நடை",
        "beats": 4,
        "color": "#C0392B",
        "description": "Chatusra Nadai is the most fundamental rhythm in Bharatanatyam with four equal subdivisions per beat. It forms the backbone of most classical compositions.",
        "history": "The most documented nadai in ancient texts including Abhinaya Darpana and Sangita Ratnakara. The Chatusra Alaripu in Adi tala is the traditional opening item taught first to all Bharatanatyam students.",
        "characteristics": [
            "Four subdivisions per beat",
            "Most balanced and stable rhythm",
            "Standard framework for Adi tala",
            "Suitable for all speeds",
            "Foundation of Bharatanatyam training",
        ],
        "mudras": ["Pataka", "Tripataka", "Kartarimukha", "Ardhachandra"],
        "associated_ragas": ["Mohanam", "Hamsadhwani", "Bilahari", "Natabhairavi"],
        "performance_tips": "Introduce body parts systematically — eyes, neck, shoulders, arms, torso, hips, knees, feet. Each section responds to the four-count cycle with precision and grace.",
    },
    "kandam": {
        "name": "Kandam Nadai",
        "sanskrit": "खण्ड नडई",
        "tamil": "கண்ட நடை",
        "beats": 5,
        "color": "#1A6B8A",
        "description": "Kandam Nadai uses five subdivisions creating a syncopated dynamic rhythm. The word Khanda means broken in Sanskrit reflecting the irregular powerful feel.",
        "history": "Kandam compositions were historically associated with fierce deities and powerful bhavas. The Kandam Alaripu is an advanced piece performed by experienced dancers demanding precise internal counting.",
        "characteristics": [
            "Five subdivisions per beat",
            "Complex syncopated rhythm",
            "Creates tension and dynamism",
            "Advanced level composition",
            "Associated with powerful bhavas",
        ],
        "mudras": ["Simhamukha", "Kangula", "Alapadma", "Sarpashirsha"],
        "associated_ragas": ["Varali", "Todi", "Saveri", "Punnagavarali"],
        "performance_tips": "Internalise the 5-beat cycle fully before attempting performance. Body movements are more forceful and angular than Tishra reflecting the dynamic energy of the five-beat pattern.",
    },
}


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    full_name = db.Column(db.String(150))
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())
    is_active = db.Column(db.Boolean, default=True)


class Prediction(db.Model):
    __tablename__ = "predictions"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    filename = db.Column(db.String(255))
    predicted = db.Column(db.String(100), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    tishra_score = db.Column(db.Float, default=0)
    chatusra_score = db.Column(db.Float, default=0)
    kandam_score = db.Column(db.Float, default=0)
    audio_duration = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.current_timestamp())


def user_payload(user: User):
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "is_active": user.is_active,
        "created_at": user.created_at.strftime("%Y-%m-%d %H:%M:%S") if user.created_at else None,
    }


def current_user_id():
    identity = get_jwt_identity()
    try:
        return int(identity)
    except (TypeError, ValueError):
        return None


def preprocess_audio(path: str):
    y, _ = librosa.load(path, sr=16000, mono=True)
    y = nr.reduce_noise(y=y, sr=16000)
    y, _ = librosa.effects.trim(y, top_db=20)

    target_length = 80000
    if len(y) < target_length:
        y = np.pad(y, (0, target_length - len(y)), mode="constant")
    else:
        y = y[:target_length]

    y = y / (np.max(np.abs(y)) + 1e-9)
    return y.astype(np.float32)


def extract_embedding(waveform: np.ndarray):
    scores, embeddings, spectrogram = yamnet_model(waveform)
    mean_embedding = tf.reduce_mean(embeddings, axis=0)
    return mean_embedding.numpy().astype(np.float32), scores, spectrogram


# Load models at startup
yamnet_model = hub.load("https://tfhub.dev/google/yamnet/1")
classifier_model = tf.keras.models.load_model("models/tala_final_model.keras")
with open("models/model_config.pkl", "rb") as f:
    model_config = pickle.load(f)
with open("models/label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}

    username = (data.get("username") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    full_name = (data.get("full_name") or "").strip()

    if not username or not email or not password:
        return jsonify({"error": "username, email and password are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password),
        full_name=full_name,
    )
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user_payload(user)}), 201


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user_payload(user)}), 200


@app.route("/api/auth/me", methods=["GET"])
@jwt_required()
def me():
    user_id = current_user_id()
    if user_id is None:
        return jsonify({"error": "Invalid token identity"}), 422
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"user": user_payload(user)}), 200


@app.route("/api/predict", methods=["POST"])
@jwt_required()
def predict():
    user_id = current_user_id()
    if user_id is None:
        return jsonify({"error": "Invalid token identity"}), 422
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if "audio" not in request.files:
        return jsonify({"error": "Audio file is required"}), 400

    audio_file = request.files["audio"]
    if audio_file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    safe_name = secure_filename(audio_file.filename)
    temp_path = os.path.join(app.config["UPLOAD_FOLDER"], f"tmp_{safe_name}")

    try:
        audio_file.save(temp_path)

        waveform = preprocess_audio(temp_path)
        embedding, _, _ = extract_embedding(waveform)

        pred_probs = classifier_model.predict(np.expand_dims(embedding, axis=0), verbose=0)[0]
        predicted_idx = int(np.argmax(pred_probs))

        if hasattr(label_encoder, "inverse_transform"):
            predicted_label = label_encoder.inverse_transform([predicted_idx])[0]
        else:
            class_names = model_config.get("class_names", ["tishra", "chatusra", "kandam"])
            predicted_label = class_names[predicted_idx]

        predicted_label = str(predicted_label).lower()
        confidence = float(pred_probs[predicted_idx])

        class_map = {"tishra": 0, "chatusra": 1, "kandam": 2}
        tishra_score = float(pred_probs[class_map["tishra"]]) if len(pred_probs) > class_map["tishra"] else 0.0
        chatusra_score = float(pred_probs[class_map["chatusra"]]) if len(pred_probs) > class_map["chatusra"] else 0.0
        kandam_score = float(pred_probs[class_map["kandam"]]) if len(pred_probs) > class_map["kandam"] else 0.0

        record = Prediction(
            user_id=user_id,
            filename=safe_name,
            predicted=predicted_label,
            confidence=confidence,
            tishra_score=tishra_score,
            chatusra_score=chatusra_score,
            kandam_score=kandam_score,
            audio_duration=5.0,
        )
        db.session.add(record)
        db.session.commit()

        tala_info = TALA_INFO.get(predicted_label, TALA_INFO["chatusra"])

        return (
            jsonify(
                {
                    "predicted": predicted_label,
                    "confidence": confidence,
                    "scores": {
                        "tishra": tishra_score,
                        "chatusra": chatusra_score,
                        "kandam": kandam_score,
                    },
                    "tala_info": tala_info,
                    "record_id": record.id,
                }
            ),
            200,
        )
    except Exception as exc:
        db.session.rollback()
        err_text = str(exc)
        if "audioread" in err_text.lower() or "ffmpeg" in err_text.lower() or "format" in err_text.lower():
            return (
                jsonify(
                    {
                        "error": "Unsupported audio format or codec. Please upload WAV, MP3, AAC, FLAC, or M4A.",
                    }
                ),
                400,
            )
        return jsonify({"error": f"Prediction failed: {err_text}"}), 500
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


@app.route("/api/history", methods=["GET"])
@jwt_required()
def history():
    user_id = current_user_id()
    if user_id is None:
        return jsonify({"error": "Invalid token identity"}), 422
    records = (
        Prediction.query.filter_by(user_id=user_id)
        .order_by(Prediction.created_at.desc())
        .limit(20)
        .all()
    )

    payload = []
    for rec in records:
        payload.append(
            {
                "id": rec.id,
                "filename": rec.filename,
                "predicted": rec.predicted,
                "confidence": rec.confidence,
                "created_at": rec.created_at.strftime("%Y-%m-%d %H:%M:%S") if rec.created_at else None,
            }
        )

    return jsonify({"records": payload}), 200


@app.route("/api/stats", methods=["GET"])
@jwt_required()
def stats():
    user_id = current_user_id()
    if user_id is None:
        return jsonify({"error": "Invalid token identity"}), 422

    total = Prediction.query.filter_by(user_id=user_id).count()
    tishra_count = Prediction.query.filter_by(user_id=user_id, predicted="tishra").count()
    chatusra_count = Prediction.query.filter_by(user_id=user_id, predicted="chatusra").count()
    kandam_count = Prediction.query.filter_by(user_id=user_id, predicted="kandam").count()

    return (
        jsonify(
            {
                "total": total,
                "tishra": tishra_count,
                "chatusra": chatusra_count,
                "kandam": kandam_count,
            }
        ),
        200,
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
