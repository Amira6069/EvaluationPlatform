import React, { useState, useEffect } from "react";
import { STORAGE_KEYS } from "../../utils/constants";

const EvaluatorDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const styles = {
    container: {
      padding: "24px",
    },
    header: {
      marginBottom: "32px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#6b7280",
    },
    card: {
      background: "white",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 Evaluator Dashboard</h1>
        <p style={styles.subtitle}>
          Welcome, {user?.name || "Evaluator"}! 👋
        </p>
      </div>

      <div style={styles.card}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
          Evaluator Dashboard
        </h2>
        <p style={{ color: "#6b7280" }}>
          Review submitted evaluations here.
        </p>
      </div>
    </div>
  );
};

export default EvaluatorDashboard;