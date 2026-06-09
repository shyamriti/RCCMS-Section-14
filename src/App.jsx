import Header from './components/Header';
import Footer from './components/Footer';
import DeveloperDashboard from './components/DeveloperDashboard';
import NewCaseRegistration from './pages/NewCaseRegistration';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="portal-layout">
      <Header />

      <main className="portal-main-workspace">
        <Routes>
          <Route
            path="/"
            element={<DeveloperDashboard />}
          />

          <Route
            path="/new-case-registration"
            element={<NewCaseRegistration />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;