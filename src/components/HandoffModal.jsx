import React, { useState, useEffect } from 'react';
import { X, Server, Terminal } from 'lucide-react';

export default function HandoffModal({ 
  isOpen, 
  onClose, 
  transactionId, 
  userId, 
  secretKey, 
  appId, 
  targetUrl 
}) {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      return;
    }
    
    const logTimeline = [
      { delay: 100, msg: 'Initializing handshake request with target terminal...', type: 'info' },
      { delay: 500, msg: `Connection established to endpoint: ${targetUrl}`, type: 'info' },
      { delay: 900, msg: 'Wrapping payload into AES-256 secure tunnel handoff...', type: 'info' },
      { delay: 1400, msg: 'HTTP POST payload sent containing HMAC security block.', type: 'success' },
      { delay: 1900, msg: 'Server Response: HTTP/1.1 200 OK (Secure Session Verified)', type: 'success' },
      { delay: 2400, msg: `Auth handshake complete. Welcome back, user [${userId}]!`, type: 'success' }
    ];

    const timers = logTimeline.map((item) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, {
          timestamp: new Date().toLocaleTimeString(),
          msg: item.msg,
          type: item.type
        }]);
      }, item.delay);
    });

    return () => timers.forEach(clearTimeout);
  }, [isOpen, userId, targetUrl]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Server size={20} />
            <span>Secure POST Handoff Terminal</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Your credentials and HMAC security headers were packaged and transmitted via an encrypted handoff payload simulation to:
          </p>

          <div className="payload-console">
            <span className="console-tag">HTTP POST PAYLOAD</span>
            <pre style={{ margin: 0, padding: 0 }}>
              <code>
                {`{
  `}
                <span className="json-property">"event"</span>: <span className="json-string">"handshake.initiate"</span>,
                {`
  `}
                <span className="json-property">"payload"</span>: {`{`}
                {`
    `}
                <span className="json-property">"transactionId"</span>: <span className="json-string">"{transactionId}"</span>,
                {`
    `}
                <span className="json-property">"userId"</span>: <span className="json-string">"{userId}"</span>,
                {`
    `}
                <span className="json-property">"secretKey"</span>: <span className="json-string">"{secretKey}"</span>,
                {`
    `}
                <span className="json-property">"appId"</span>: <span className="json-string">"{appId}"</span>
                {`
  },`}
                {`
  `}
                <span className="json-property">"channel"</span>: <span className="json-string">"antigravity-secure-tunnel"</span>,
                {`
  `}
                <span className="json-property">"version"</span>: <span className="json-string">"1.0.0"</span>
                {`
}`}
              </code>
            </pre>
          </div>

          <div className="section-label" style={{ marginBottom: '0.75rem', fontSize: '0.7rem' }}>
            <Terminal size={12} />
            Handoff Server Event Log
          </div>

          <div className="server-logs">
            {logs.length === 0 && (
              <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Connecting to server tunnel...
              </div>
            )}
            {logs.map((log, index) => (
              <div key={index} className="log-entry">
                <span className="log-timestamp">[{log.timestamp}]</span>
                <span className={`log-msg ${log.type}`}>{log.msg}</span>
              </div>
            ))}
          </div>

          <div className="integration-selector-card" style={{ background: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.15)', margin: 0, padding: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '50%', padding: '0.4rem', display: 'flex' }}>
                <CheckIcon />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--success)' }}>
                  Handshake Active
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Token has been securely shared. Callback redirected successfully.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
