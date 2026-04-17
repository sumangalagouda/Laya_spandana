import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./History.css";

const talaColor = {
  tishra: "#D4AF37",
  chatusra: "#C0392B",
  kandam: "#1A6B8A",
};

function History() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({ total: 0, tishra: 0, chatusra: 0, kandam: 0 });

  useEffect(() => {
    const load = async () => {
      const [h, s] = await Promise.all([api.get("/api/history"), api.get("/api/stats")]);
      setRecords(h.data.records || []);
      setStats(s.data || {});
    };
    load().catch(() => {
      setRecords([]);
    });
  }, []);

  const statCards = useMemo(
    () => [
      { label: "Total", value: stats.total || 0, color: "#D4AF37" },
      { label: "Tishra", value: stats.tishra || 0, color: "#D4AF37" },
      { label: "Chatusra", value: stats.chatusra || 0, color: "#C0392B" },
      { label: "Kandam", value: stats.kandam || 0, color: "#1A6B8A" },
    ],
    [stats]
  );

  return (
    <div className="history-page">
      <motion.div className="history-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>Detection History</h1>
        <p>Welcome, {user?.username || "Dancer"}</p>
      </motion.div>

      <section className="stats-row">
        {statCards.map((card) => (
          <article key={card.label} className="stat-card" style={{ "--stat-color": card.color }}>
            <h3>{card.value}</h3>
            <p>{card.label}</p>
            <span className="progress" />
          </article>
        ))}
      </section>

      <section className="records-section">
        {records.length === 0 ? (
          <div className="empty-state">
            <span>🜁</span>
            <p>No records yet. Detect your first tala to see entries here.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>Detected Tala</th>
                <th>Confidence</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {records.map((row) => {
                const color = talaColor[row.predicted] || "#D4AF37";
                return (
                  <tr key={row.id}>
                    <td>{row.filename || "audio-file"}</td>
                    <td>
                      <span className="dot" style={{ background: color }} />
                      {row.predicted}
                    </td>
                    <td>
                      <div className="confidence-bar">
                        <div style={{ width: `${Math.round((row.confidence || 0) * 100)}%`, background: color }} />
                      </div>
                    </td>
                    <td>{row.created_at}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default History;
