import React, { useState } from 'react';
import { Clipboard, Check, Eye, EyeOff } from 'lucide-react';

export default function CredentialCard({ 
  label, 
  value, 
  maskedValue, 
  isSecret = false, 
  showSecret = false, 
  onToggleShow,
  onChange,
  icon: IconComponent 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getDisplayValue = () => {
    if (isSecret && !showSecret) {
      return maskedValue || 'sec_••••••••••••x92';
    }
    return value;
  };

  return (
    <div className="credential-field">
      <div className="credential-label-row">
        <span className="credential-label">
          {IconComponent && <IconComponent size={14} />}
          {label}
        </span>
      </div>
      <div className="credential-input-wrapper">
        {onChange ? (
          <input
            type="text"
            className="credential-input"
            value={value}
            onChange={onChange}
            placeholder={`Enter ${label}...`}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
              color: 'var(--text-primary)',
              flexGrow: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              width: '100%',
              letterSpacing: '0.02em'
            }}
          />
        ) : (
          <div 
            className={`credential-value ${isSecret && !showSecret ? 'masked' : ''}`}
            title={isSecret && !showSecret ? 'Masked for security' : 'Double click to select'}
          >
            {getDisplayValue()}
          </div>
        )}
        
        <div className="action-buttons-group">
          {isSecret && onToggleShow && (
            <button
              type="button"
              className="icon-btn"
              onClick={onToggleShow}
              title={showSecret ? "Hide Secret Key" : "Show Secret Key"}
            >
              {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}

          <button 
            type="button"
            className={`icon-btn ${copied ? 'active' : ''}`}
            onClick={handleCopy}
            title="Copy to Clipboard"
          >
            {copied ? <Check size={16} className="text-success" /> : <Clipboard size={16} />}
            <span className={`copied-badge ${copied ? 'show' : ''}`}>
              Copied!
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
