import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';
import emblemLogo from '../assets/emblem.jpg';

export default function Header() {
  return (
    <header className="portal-header">
      <div className="header-left">
        <img 
          src={emblemLogo} 
          alt="National Emblem of India" 
          className="header-emblem"
        />
        <div className="header-brand-group">
          <span className="header-brand-title">Jami Pariseva</span>
          <span className="header-brand-badge">Demo Revenue Service Delivery Portal</span>
        </div>
      </div>

      <div className="header-right">
      </div>
    </header>
  );
}
