import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardStats, getAllUsers, getAllEvaluations } from "../../Services/adminService";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvaluations: 0,
    approvedEvaluations: 0,
    pendingReview: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch users
      const usersResponse = await getAllUsers();
      const users = usersResponse.data || [];
      
      // Fetch evaluations
      const evalsResponse = await getAllEvaluations();
      const evaluations = evalsResponse.data || [];
      
      // Calculate stats
      const approved = evaluations.filter(e => e.status === 'APPROVED').length;
      const pending = evaluations.filter(e => 
        e.status === 'SUBMITTED' || e.status === 'UNDER_REVIEW'
      ).length;
      
      setStats({
        totalUsers: users.length,
        totalEvaluations: evaluations.length,
        approvedEvaluations: approved,
        pendingReview: pending,
      });
      
      console.log('✅ Admin dashboard stats loaded:', {
        users: users.length,
        evaluations: evaluations.length,
        approved,
        pending,
      });
      
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

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
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "24px",
      marginBottom: "32px",
    },
    card: {
      background: "white",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
    },
    cardIcon: {
      fontSize: "48px",
      marginBottom: "16px",
    },
    cardTitle: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "8px",
    },
    cardValue: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#111827",
    },
    loading: {
      textAlign: "center",
      padding: "40px",
      color: "#6b7280",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statsData = [
    { icon: "👥", label: "Total Users", value: stats.totalUsers },
    { icon: "📋", label: "Total Evaluations", value: stats.totalEvaluations },
    { icon: "✅", label: "Approved", value: stats.approvedEvaluations },
    { icon: "⏳", label: "Pending Review", value: stats.pendingReview },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>👑 Admin Dashboard</h1>
        <p style={styles.subtitle}>
          Welcome, {user?.name || "Administrator"}! 👋
        </p>
      </div>

      <div style={styles.grid}>
        {statsData.map((stat, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.1)";
            }}
          >
            <div style={styles.cardIcon}>{stat.icon}</div>
            <p style={styles.cardTitle}>{stat.label}</p>
            <p style={styles.cardValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
          System Administration
        </h2>
        <p style={{ color: "#6b7280" }}>
          Manage users, evaluations, and governance framework from the sidebar.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;