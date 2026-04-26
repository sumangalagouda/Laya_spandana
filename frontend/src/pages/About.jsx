import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const NADAIS = [
  {
    beats: 3,
    color: "#D4AF37",
    name: "Tishra Nadai",
    tamil: "திஸ்ர நடை",
    meaning: "Triplet Flow",
    paragraph:
      "Tishra Nadai opens space for meditative expansion. The threefold pulse carries devotional intent and a wave-like inner breath through eye, neck, and torso transitions.",
    chips: ["Ta", "Ki", "Ta"],
  },
  {
    beats: 4,
    color: "#C0392B",
    name: "Chatusra Nadai",
    tamil: "சதுஸ்ர நடை",
    meaning: "Balanced Four",
    paragraph:
      "Chatusra Nadai is the foundational square of Bharatanatyam rhythm. It holds proportion, symmetry, and pedagogical clarity across beginner and advanced Alaripu renderings.",
    chips: ["Ta", "Ka", "Di", "Mi"],
  },
  {
    beats: 5,
    color: "#1A6B8A",
    name: "Kandam Nadai",
    tamil: "கண்ட நடை",
    meaning: "Dynamic Five",
    paragraph:
      "Kandam Nadai introduces asymmetrical strength and dramatic velocity. Its five-beat architecture demands deep internal counting and precise articulation of angular energy.",
    chips: ["Ta", "Ka", "Ta", "Ki", "Ta"],
  },
];

function About() {
  return (
    <div className="about-page">
      <motion.section className="about-hero" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <div className="big-om">ॐ</div>
        <h1>About This Project</h1>
        <div className="intro-grid">
          <article>
            <p>
              Bharatanatyam Alaripu Tala Detector is built to bridge classical dance pedagogy with AI-assisted rhythmic analysis. It helps learners and performers inspect nadai structures in audio and reflect on tala precision.
            </p>
          </article>
          <aside className="lotus-mandala">
            <div className="petal p1" />
            <div className="petal p2" />
            <div className="petal p3" />
            <div className="petal p4" />
            <div className="petal p5" />
            <div className="petal p6" />
          </aside>
        </div>
      </motion.section>

      <section className="nadai-timeline">
        <h2>The Three Nadais of Alaripu</h2>
        {NADAIS.map((item) => (
          <article key={item.name} className="nadai-item" style={{ "--nadai-color": item.color }}>
            <div className="beat-box">{item.beats}</div>
            <div className="nadai-text">
              <h3>{item.name}</h3>
              <p className="tamil">{item.tamil}</p>
              <p className="meaning">{item.meaning}</p>
              <p>{item.paragraph}</p>
              <div className="chip-row">
                {item.chips.map((chip, idx) => (
                  <span key={`${chip}-${idx}`}>{chip}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="ai-works">
        <h2>How the AI Works</h2>
        <div className="tech-cards">
          <article>
            <h3>Audio Input</h3>
            <p>Uploads and live recordings are prepared for consistent analysis at 16kHz mono.</p>
          </article>
          <article>
            <h3>Preprocessing</h3>
            <p>Noise reduction, silence trimming, and fixed 5-second normalization improve signal quality.</p>
          </article>
          <article>
            <h3>YAMNet Embedding</h3>
            <p>TensorFlow Hub YAMNet extracts semantically rich 1024-dimensional acoustic embeddings.</p>
          </article>
          <article>
            <h3>Classification</h3>
            <p>A trained Keras model predicts Tishra, Chatusra, or Kandam confidence scores.</p>
          </article>
        </div>
        <div className="stack-pills">
          <span><i />React</span>
          <span><i />Flask</span>
          <span><i />MySQL</span>
          <span><i />TensorFlow</span>
          <span><i />YAMNet</span>
          <span><i />JWT</span>
        </div>
      </section>
    </div>
  );
}

export default About;