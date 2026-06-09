import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  AppWindow,
  User,
  Key,
  ShieldCheck,
  ArrowRight,
  Terminal,
  Activity,
  Globe,
  X,
  Layers,
  Info
} from 'lucide-react';
import CredentialCard from './CredentialCard';

async function calculateHMAC(message, secret) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );

  const signature = await window.crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    messageData
  );

  const bytes = new Uint8Array(signature);

let binary = '';

bytes.forEach(byte => {
  binary += String.fromCharCode(byte);
});

let hashBase64 = btoa(binary);

hashBase64 = hashBase64
  .replace(/%(?![0-9a-fA-F]{2})/g, "%25")
  .replace(/\+/g, "");

return hashBase64;
}

export default function DeveloperDashboard() {
const [credentials] = useState({
  userId: 'usr_alpha_77',

  secretKey:
    'd4d6e2c0dd461e873663bb228229d9200cc2a2799a88df817k6e7b95a0992797',

  maskedSecretKey:
    'd4d6••••••••••••••••••••••••2797',

  appId: 'rccms_summer_camp'
});

  const targetUrl = 'https://your-target-endpoint.gov.in/login.jsp';

  const [transactionId, setTransactionId] = useState('tx_98374_prod');
  const [callbackUrl, setCallbackUrl] = useState('https://your-callback-endpoint.gov.in/login.jsp');
  const [undersection, setUndersection] = useState('Section 14');
  const [generatedHmac, setGeneratedHmac] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showHmacModal, setShowHmacModal] = useState(false);

  const messageString = `${transactionId}|${credentials.userId}|${callbackUrl}|${undersection}|${credentials.appId}`;
  useEffect(() => {
    const updateHmac = async () => {
      try {
        const hmac = await calculateHMAC(messageString, credentials.secretKey);
        setGeneratedHmac(hmac);
      } catch (err) {
        console.error('Failed to compute HMAC: ', err);
      }
    };
    updateHmac();
  }, [messageString, credentials.secretKey]);
  const navigate = useNavigate();
  const handleLaunch = async () => {

  setIsConnecting(true);

  try {

    const payload = {
      transactionId,
      userId: credentials.userId,
      appId: credentials.appId,
      undersection,
      callbackUrl,
      hmac: generatedHmac
    };

    const response = await axios.post(
      "http://localhost:8080/api/validate-hmac",
      payload
    );

    console.log("Validation Response:", response.data);

    if (response.data.valid) {

      navigate("/new-case-registration", {
        state: {
          transactionId,
          userId: credentials.userId,
          appId: credentials.appId,
          undersection,
          callbackUrl,
          hmac: generatedHmac
        }
      });

    } else {

      alert(response.data.message);

    }

  } catch (error) {

    console.error("Validation Error:", error);

    alert("Unable to connect to validation service.");

  } finally {

    setIsConnecting(false);

  }
};

  return (
    <div className="glass-container" style={{ maxWidth: '680px' }}>
      <div className="credentials-list" style={{ marginBottom: '1.25rem' }}>
        <CredentialCard
          label="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          icon={AppWindow}
        />
        <CredentialCard
          label="User Account ID"
          value={credentials.userId}
          icon={User}
        />
        <CredentialCard
          label="Secret Handoff Key"
          value={credentials.secretKey}
          maskedValue={credentials.maskedSecretKey}
          isSecret={true}
          showSecret={showSecret}
          onToggleShow={() => setShowSecret(!showSecret)}
          icon={Key}
        />
      </div>

      <div className="section-label" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
        <ShieldCheck size={14} />
        HMAC Security Configuration
      </div>

      <div className="credentials-list" style={{ marginBottom: '1.5rem' }}>
        <CredentialCard
          label="App ID"
          value={credentials.appId}
          icon={AppWindow}
        />
        <CredentialCard
          label="Callback URL"
          value={callbackUrl}
          onChange={(e) => setCallbackUrl(e.target.value)}
          icon={Globe}
        />
        <CredentialCard
          label="Under Section"
          value={undersection}
          onChange={(e) => setUndersection(e.target.value)}
          icon={Activity}
        />
      </div>

      <div className="credentials-list" style={{ marginBottom: '2.5rem' }}>
        <div className="credential-field">
          <div className="credential-label-row">
            <span
              className="credential-label"
              style={{
                color: 'var(--accent-cyan)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'opacity 0.2s',
              }}
              onClick={() => setShowHmacModal(true)}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = 0.8; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = 1; }}
              title="Click to view HMAC logic and code examples"
            >
              <Terminal size={14} />
              Generated HMAC Signature (SHA-256)
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                background: 'rgba(231, 76, 60, 0.08)',
                padding: '1px 6px',
                borderRadius: '10px',
                border: '1px solid rgba(231, 76, 60, 0.15)',
                fontWeight: 'normal',
                marginLeft: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px'
              }}>
                View Logic ↗
              </span>
            </span>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              background: 'rgba(231, 76, 60, 0.1)',
              padding: '0.15rem 0.4rem',
              borderRadius: '4px',
              border: '1px solid rgba(231, 76, 60, 0.2)',
              letterSpacing: '0.05em'
            }}>
              LIVE COMPILING
            </span>
          </div>
          <div
            className="credential-input-wrapper"
            style={{
              borderColor: 'rgba(231, 76, 60, 0.25)',
              boxShadow: '0 0 12px rgba(231, 76, 60, 0.05)'
            }}
          >
            <div
              className="credential-value"
              style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}
              title="Double click to select signature hash"
            >
              {generatedHmac || 'Generating signature...'}
            </div>
            <div className="action-buttons-group">
              <CredentialCardCopyButton value={generatedHmac} />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary"
        disabled={isConnecting}
        onClick={handleLaunch}
      >
        {isConnecting ? (
          <>
            <div className="spinner" />
            <span>Connecting to Jami Pariseva...</span>
          </>
        ) : (
          <>
            <span>Go to Application</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <div className="redirect-note" style={{
        marginTop: '1.5rem',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#e74c3c',
        textAlign: 'center',
        letterSpacing: '0.02em',
        padding: '0.85rem 1.25rem',
        background: 'rgba(231, 76, 60, 0.06)',
        border: '1px dashed rgba(231, 76, 60, 0.3)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <span>⚠️ * Note: Change your redirect URL.</span>
      </div>

      {showHmacModal && (
        <div 
          className="modal-overlay" 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setShowHmacModal(false)}
        >
          <div 
            className="modal-content"
            style={{
              background: '#0f172a',
              border: '1px solid rgba(231, 76, 60, 0.2)',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '750px',
              padding: '2rem',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px rgba(231, 76, 60, 0.15)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
              color: '#f8fafc',
              animation: 'modal-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  background: 'rgba(231, 76, 60, 0.12)',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(231, 76, 60, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Terminal size={20} style={{ color: '#e74c3c' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                    HMAC SHA-256 Signature Logic
                  </h3>
                  <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                    Cryptographic integrity verification for Jami Pariseva handoff
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowHmacModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#64748b';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Step-by-Step Visualization */}
              <div>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e74c3c', fontWeight: 700 }}>
                  1. Concatenation Formula
                </h4>
                <div style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  position: 'relative'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 500 }}>
                    The signature is computed over a pipe (<code style={{ color: '#e74c3c', background: 'rgba(231, 76, 60, 0.1)', padding: '2px 4px', borderRadius: '4px' }}>|</code>) concatenated string of parameters in this exact sequence:
                  </div>
                  
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: '#38bdf8',
                    background: '#090d16',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(56, 189, 248, 0.15)',
                    lineHeight: 1.4,
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    marginBottom: '0.75rem'
                  }}>
                    transactionId <span style={{ color: '#f43f5e' }}>|</span> userId <span style={{ color: '#f43f5e' }}>|</span> callbackUrl <span style={{ color: '#f43f5e' }}>|</span> undersection <span style={{ color: '#f43f5e' }}>|</span> appId
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 500 }}>
                    Current Concatenated Value:
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#090d16',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '0.5rem 0.75rem',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: '#e2e8f0',
                      overflowX: 'auto',
                      whiteSpace: 'nowrap',
                      flexGrow: 1,
                      paddingRight: '0.5rem'
                    }}>
                      {messageString}
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(messageString);
                        alert('Concatenated message copied to clipboard!');
                      }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#94a3b8',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)' }}
                    >
                      <Layers size={12} />
                      Copy String
                    </button>
                  </div>
                </div>
              </div>

              {/* Cryptographic Key & Result */}
              <div>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e74c3c', fontWeight: 700 }}>
                  2. Cryptographic Execution
                </h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem'
                }}>
                  <div style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Key size={14} style={{ color: '#f59e0b' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>Secret Handoff Key</span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: '#f59e0b',
                      background: '#090d16',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(245, 158, 11, 0.15)',
                      wordBreak: 'break-all'
                    }}>
                      {credentials.secretKey}
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <ShieldCheck size={14} style={{ color: '#10b981' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>Generated HMAC Hash</span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: '#10b981',
                      background: '#090d16',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(16, 185, 129, 0.15)',
                      wordBreak: 'break-all',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden'
                    }}>
                      {generatedHmac}
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CredentialCardCopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      type="button"
      className={`icon-btn ${copied ? 'active' : ''}`}
      onClick={handleCopy}
      title="Copy Content"
      style={{ color: copied ? 'var(--success)' : 'var(--accent-cyan)' }}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
      )}
      <span className={`copied-badge ${copied ? 'show' : ''}`} style={{ background: 'var(--success)' }}>
        Copied!
      </span>
    </button>
  );
}
