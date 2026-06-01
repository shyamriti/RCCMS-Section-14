import React from 'react';
import Header from './components/Header';
import DeveloperDashboard from './components/DeveloperDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="portal-layout">
      <Header />

      <main className="portal-main-workspace">
        <DeveloperDashboard />
      </main>

      <Footer />
    </div>
  );
}

export default App;
