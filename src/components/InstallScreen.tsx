import React from 'react';

interface InstallScreenProps {
  onInstall?: () => void;
}

export const InstallScreen: React.FC<InstallScreenProps> = ({ onInstall }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logoCircle}>
            <span style={styles.logoText}>K</span>
          </div>
        </div>
        <h1 style={styles.title}>Install Application</h1>
        <p style={styles.description}>
          Get the full experience right on your device. Fast, secure, and always up to date.
        </p>
        <button style={styles.button} onClick={onInstall}>
          Install Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F8FAFC',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
  } as React.CSSProperties,
  card: {
    backgroundColor: '#FFFFFF',
    padding: '40px 30px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center' as const,
  },
  logoContainer: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  logoCircle: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '12px',
  },
  description: {
    fontSize: '14px',
    color: '#64748B',
    lineHeight: '1.5',
    marginBottom: '32px',
  },
  button: {
    width: '100%',
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
