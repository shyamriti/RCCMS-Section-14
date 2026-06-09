import React from 'react';
import Header from './components/Header';
import DeveloperDashboard from './components/DeveloperDashboard';
import CaseRegistration from './components/CaseRegistration';
import Footer from './components/Footer';

function App() {
  return (
    <div className="portal-layout">
      <Header />

      <main className="portal-main-workspace">
      <CaseRegistration />
      </main>

      <Footer />
    </div>
  );
}

export default App;
