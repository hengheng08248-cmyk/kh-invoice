import React, { useState } from 'react';

export const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign in:', { email, password });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logoCircle}>
            <span style={styles.logoText}>K</span>
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>
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
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  logoCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#2563EB',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748B',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #CBD5E1',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#F8FAFC',
    color: '#1E293B',
  },
  button: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
  },
};
