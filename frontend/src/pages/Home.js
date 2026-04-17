import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import AudioUploader from "../components/AudioUploader";
import TalaResult from "../components/TalaResult";
import api from "../api/axios";
import "./Home.css";

const TALAS = [
  { key: "tishra", name: "Tishra", beats: 3, color: "#D4AF37", tamil: "திஸ்ர நடை" },
  { key: "chatusra", name: "Chatusra", beats: 4, color: "#C0392B", tamil: "சதுஸ்ர நடை" },
  { key: "kandam", name: "Kandam", beats: 5, color: "#1A6B8A", tamil: "கண்ட நடை" },
];

function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const detectTala = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", file);
      const { data } = await api.post("/api/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(data);
      toast.success("Tala detected successfully.");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-mandala" />
        <div className="hero-om">ॐ</div>
        <h1>Alaripu</h1>
        <h2>Tala Detector</h2>
        <p>
          Upload or record an audio sample to detect Bharatanatyam Alaripu nadai patterns across
          Tishra, Chatusra, and Kandam cycles.
        </p>
        <div className="tala-pills">
          {TALAS.map((tala) => (
            <span key={tala.key} style={{ borderColor: tala.color, color: tala.color }}>
              {tala.name} ({tala.beats})
            </span>
          ))}
        </div>
        <div className="hero-divider">✦ 🪷 ✦</div>
      </motion.section>

      <section className="detector-grid">
        <motion.div
          className="upload-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3>Upload Audio</h3>
          <AudioUploader file={file} setFile={setFile} />
          <button className="detect-btn" onClick={detectTala} disabled={!file || loading}>
            {loading ? "Detecting..." : "Detect Tala"}
          </button>
          <div className="kolam-grid">
            {Array.from({ length: 9 }).map((_, idx) => (
              <span key={idx} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="result-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {result ? (
            <TalaResult result={result} />
          ) : (
            <div className="result-placeholder">
              <div className="placeholder-rings ring-a" />
              <div className="placeholder-rings ring-b" />
              <div className="placeholder-rings ring-c" />
              <span>♪</span>
              <p>Result will appear here after detection.</p>
            </div>
          )}
        </motion.div>
      </section>

      <section className="info-section">
        <h3>
          <span /> The Three Nadais of Alaripu <span />
        </h3>
        <div className="info-cards">
          {TALAS.map((tala) => (
            <article key={tala.key} className="info-card" style={{ "--tala-color": tala.color }}>
              <div className="beats-box">{tala.beats}</div>
              <h4>{tala.name}</h4>
              <p className="tamil-name">{tala.tamil}</p>
              <p>
                {tala.key === "tishra" && "Three-subdivision meditative cadence for devotional opening."}
                {tala.key === "chatusra" && "Balanced four-subdivision framework central to classical training."}
                {tala.key === "kandam" && "Dynamic five-subdivision syncopation for advanced expression."}
              </p>
              <div className="mini-bars">
                {Array.from({ length: tala.beats }).map((_, idx) => (
                  <span key={idx} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
