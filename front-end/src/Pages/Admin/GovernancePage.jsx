import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GOVERNANCE_PRINCIPLES } from '../../utils/constants';

const GovernancePage = () => {
  const { t } = useTranslation();
  const [principles] = useState(GOVERNANCE_PRINCIPLES);
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);

  const styles = {
    container: { padding: '24px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' },
    subtitle: { color: '#6b7280', marginBottom: '24px' },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    principleCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '10px',
      marginBottom: '12px',
      overflow: 'hidden',
    },
    principleHeader: {
      padding: '16px 20px',
      background: '#f9fafb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
    },
    principleTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '15px',
      fontWeight: '600',
      color: '#111827',
    },
    principleNum: {
      width: '30px',
      height: '30px',
      background: '#7c3aed',
      color: 'white',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '13px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏛️ {t('governance.governanceFramework')}</h1>
      <p style={styles.subtitle}>{t('governance.managePrinciples')}</p>

      <div style={styles.card}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
          {t('governance.principles')}
        </h3>

        {principles.map((principle) => (
          <div key={principle.id} style={styles.principleCard}>
            <div
              style={styles.principleHeader}
              onClick={() =>
                setExpandedPrinciple(expandedPrinciple === principle.id ? null : principle.id)
              }
            >
              <div style={styles.principleTitle}>
                <div style={styles.principleNum}>{principle.number}</div>
                <div>
                  <div>{principle.name}</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '400', marginTop: '2px' }}>
                    {t('governance.principle')} {principle.number}
                  </div>
                </div>
              </div>
              <span>{expandedPrinciple === principle.id ? '▲' : '▼'}</span>
            </div>

            {expandedPrinciple === principle.id && (
              <div style={{ padding: '16px 20px', background: 'white' }}>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  {t('governance.viewCriteria')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernancePage;