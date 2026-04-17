import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./TalaResult.css";

const TABS = ["Overview", "History", "Performance Tips", "Mudras & Ragas"];

function TalaResult({ result }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const tala = result?.tala_info || {};
  const predicted = result?.predicted || "chatusra";
  const confidencePct = Math.round((result?.confidence || 0) * 100);
  const scores = result?.scores || {};

  const scoreItems = useMemo(
    () => [
      { key: "tishra", label: "Tishra", color: "#D4AF37", value: scores.tishra || 0 },
      { key: "chatusra", label: "Chatusra", color: "#C0392B", value: scores.chatusra || 0 },
      { key: "kandam", label: "Kandam", color: "#1A6B8A", value: scores.kandam || 0 },
    ],
    [scores]
  );

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (confidencePct / 100) * circumference;

  return (
    <motion.section
      className="tala-result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-header">
        <div className="detected-badge">🥁 Detected</div>

        <div className="name-block">
          <h3>{tala.name}</h3>
          <p className="lang-line">{tala.sanskrit}</p>
          <p className="lang-line tamil">{tala.tamil}</p>
        </div>

        <div className="confidence-ring glow-pulse">
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r={radius} className="ring-bg" />
            <circle
              cx="55"
              cy="55"
              r={radius}
              className="ring-progress"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
                stroke: tala.color || "#D4AF37",
              }}
            />
          </svg>
          <span>{confidencePct}%</span>
        </div>
      </div>

      <div className="divider-line" />

      <div className="beat-visualiser">
        {Array.from({ length: tala.beats || 0 }).map((_, idx) => (
          <div key={idx} className="beat-circle" style={{ borderColor: tala.color || "#D4AF37" }}>
            {idx + 1}
          </div>
        ))}
      </div>

      <div className="score-bars">
        {scoreItems.map((item) => {
          const active = predicted === item.key;
          return (
            <div key={item.key} className="score-row">
              <label>{item.label}</label>
              <div className="score-track">
                <div
                  className={`score-fill ${active ? "active" : ""}`}
                  style={{
                    width: `${Math.round(item.value * 100)}%`,
                    background: active ? item.color : "rgba(212,175,55,0.24)",
                  }}
                />
              </div>
              <span>{Math.round(item.value * 100)}%</span>
            </div>
          );
        })}
      </div>

      <div className="tabs-row">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Overview" && (
          <>
            <p>{tala.description}</p>
            <ul>
              {(tala.characteristics || []).map((item) => (
                <li key={item} style={{ color: tala.color || "#D4AF37" }}>
                  ◈ <span>{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "History" && <p>{tala.history}</p>}

        {activeTab === "Performance Tips" && (
          <div className="tips-box">
            <p>{tala.performance_tips}</p>
          </div>
        )}

        {activeTab === "Mudras & Ragas" && (
          <>
            <h4>Mudras</h4>
            <div className="pill-wrap">
              {(tala.mudras || []).map((mudra) => (
                <span key={mudra} className="pill mudra-pill">
                  {mudra}
                </span>
              ))}
            </div>
            <h4>Associated Ragas</h4>
            <div className="pill-wrap">
              {(tala.associated_ragas || []).map((raga) => (
                <span key={raga} className="pill raga-pill" style={{ borderColor: tala.color || "#D4AF37" }}>
                  {raga}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
}

export default TalaResult;
