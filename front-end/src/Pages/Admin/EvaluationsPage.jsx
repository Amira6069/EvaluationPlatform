import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllEvaluations } from '../../Services/adminService';

const EvaluationsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('📡 Fetching all evaluations...');
      const response = await getAllEvaluations();
      
      setEvaluations(response.data || []);
      console.log('✅ Evaluations loaded:', response.data.length);
      
    } catch (err) {
      console.error('❌ Error fetching evaluations:', err);
      setError(t('evaluation.loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      CREATED: { bg: '#f3f4f6', color: '#374151' },
      IN_PROGRESS: { bg: '#dbeafe', color: '#1e40af' },
      SUBMITTED: { bg: '#e0e7ff', color: '#4338ca' },
      UNDER_REVIEW: { bg: '#fef3c7', color: '#92400e' },
      APPROVED: { bg: '#d1fae5', color: '#065f46' },
      REJECTED: { bg: '#fee2e2', color: '#991b1b' },
    };
    return colors[status] || { bg: '#f3f4f6', color: '#374151' };
  };

  const filteredEvaluations = evaluations.filter(evaluation => {
    if (filter === 'all') return true;
    return evaluation.status === filter;
  });

  const styles = {
    container: { padding: '24px' },
    header: {
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#111827' },
    filterBar: {
      display: 'flex',
      gap: '8px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    filterButton: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s',
    },
    filterActive: {
      background: '#7c3aed',
      color: 'white',
    },
    filterInactive: {
      background: '#f3f4f6',
      color: '#6b7280',
    },
    table: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    tableHeader: {
      background: '#f9fafb',
      borderBottom: '1px solid #e5e7eb',
      padding: '14px 24px',
      display: 'grid',
      gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr',
      gap: '16px',
      fontSize: '13px',
      fontWeight: '600',
      color: '#6b7280',
    },
    tableRow: {
      borderBottom: '1px solid #f3f4f6',
      padding: '16px 24px',
      display: 'grid',
      gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr',
      gap: '16px',
      alignItems: 'center',
    },
    badge: {
      display: 'inline-block',
      padding: '4px 10px',
      borderRadius: '10px',
      fontSize: '12px',
      fontWeight: '600',
    },
    loading: {
      textAlign: 'center',
      padding: '40px',
      color: '#6b7280',
    },
    error: {
      padding: '12px 16px',
      background: '#fee2e2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      color: '#dc2626',
      marginBottom: '16px',
    },
    empty: {
      textAlign: 'center',
      padding: '60px',
      color: '#6b7280',
    },
    viewButton: {
      padding: '6px 12px',
      background: '#eff6ff',
      color: '#2563eb',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '12px',
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const statuses = ['all', 'CREATED', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📋 {t('evaluation.manageEvaluations')}</h1>
      </div>

      {error && <div style={styles.error}>⚠️ {error}</div>}

      <div style={styles.filterBar}>
        {statuses.map((status) => (
          <button
            key={status}
            style={{
              ...styles.filterButton,
              ...(filter === status ? styles.filterActive : styles.filterInactive),
            }}
            onClick={() => setFilter(status)}
            onMouseEnter={(e) => {
              if (filter !== status) e.target.style.background = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              if (filter !== status) e.target.style.background = '#f3f4f6';
            }}
          >
            {status === 'all' ? t('evaluation.all') : t(`evaluation.${status.toLowerCase()}`)}
          </button>
        ))}
      </div>

      <div style={styles.table}>
        <div style={styles.tableHeader}>
          <span>{t('evaluation.organization')}</span>
          <span>{t('evaluation.evaluationName')}</span>
          <span>{t('evaluation.period')}</span>
          <span>{t('evaluation.status')}</span>
          <span>{t('common.actions')}</span>
        </div>

        {filteredEvaluations.length > 0 ? (
          filteredEvaluations.map((evaluation) => {
            const statusColor = getStatusColor(evaluation.status);
            return (
              <div
                key={evaluation.evaluationId}
                style={styles.tableRow}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'white')}
              >
                <span style={{ fontWeight: '500' }}>
                  {evaluation.organizationName || 'N/A'}
                </span>
                <span>{evaluation.name}</span>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>
                  {evaluation.period}
                </span>
                <span
                  style={{
                    ...styles.badge,
                    background: statusColor.bg,
                    color: statusColor.color,
                  }}
                >
                  {t(`evaluation.${evaluation.status.toLowerCase()}`)}
                </span>
                <button
                  style={styles.viewButton}
                  onClick={() => navigate(`/admin/evaluations/${evaluation.evaluationId}`)}
                >
                  {t('common.view')}
                </button>
              </div>
            );
          })
        ) : (
          <div style={styles.empty}>
            <p style={{ fontSize: '40px', marginBottom: '12px' }}>📋</p>
            <p style={{ fontWeight: '600' }}>{t('evaluation.noEvaluationsFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationsPage;