import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import CaseRegistration from './components/CaseRegistration';
import Footer from './components/Footer';

const defaultRequest = {
  applicationId: 'app_98374_prod',
  userId: 'usr_alpha_77',
  hmac: 'rjepYs2e8mW4luDKKkGunRvbzNk2VWUpWLwv52pSBbE=',
  callbackUrl: 'https://your-callback-endpoint.gov.in/login.jsp',
  underSection: 'Section 14',
};

function buildQueryString(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  searchParams.set('page', 'registration');
  return searchParams.toString();
}

function App() {
  const [route, setRoute] = useState('home');
  const [requestData, setRequestData] = useState(defaultRequest);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('page') === 'registration') {
      setRoute('registration');
      setRequestData({
        applicationId: params.get('applicationId') || defaultRequest.applicationId,
        userId: params.get('userId') || defaultRequest.userId,
        hmac: params.get('hmac') || defaultRequest.hmac,
        callbackUrl: params.get('callbackUrl') || defaultRequest.callbackUrl,
        underSection: params.get('underSection') || defaultRequest.underSection,
      });
    }
  }, []);

  const handleStartApplication = () => {
    const queryString = buildQueryString(defaultRequest);
    window.history.pushState({}, '', `?${queryString}`);
    setRequestData(defaultRequest);
    setRoute('registration');
  };

  const handleCancel = () => {
    window.history.pushState({}, '', window.location.pathname);
    setRoute('home');
  };

  return (
    <div className="portal-layout page-shell">
      <Header />

      <main className="portal-main-workspace page-body">
        {route === 'home' ? (
          <div className="landing-page">
            <section className="landing-card tricolor-border-box">
              <div className="landing-copy">
                <span className="eyebrow">Government Service Portal</span>
                <h1>Jami Pariseva Case Registration</h1>
                <p>
                  Initiate a new government case registration in a simplified, accessible form. The page below reflects the user-friendly workflow for Section 14 applications for citizens and officials alike.
                </p>
              </div>

              <div className="landing-content">
                <div className="landing-panel">
                  <h2>Redirect payload</h2>
                  <div className="payload-grid">
                    {Object.entries(defaultRequest).map(([label, value]) => (
                      <div key={label} className="payload-pill">
                        <span className="payload-label">{label.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="payload-value">{value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="payload-note">
                    These values simulate redirect parameters from the source portal. HMAC and callback URL are system-provided and not part of the user-filled registration form.
                  </p>
                </div>

                <div className="landing-panel landing-action-panel">
                  <h2>Start application</h2>
                  <p>Click to open the registration form and continue the user journey. This is the front-end simulation of a government portal redirect flow.</p>
                  <button className="primary-button" onClick={handleStartApplication}>Go to Application</button>
                </div>

                <div className="landing-panel security-panel">
                  <h2>Security checks</h2>
                  <ul className="note-list">
                    <li>App ID and HMAC are passed from the source portal.</li>
                    <li>The backend is expected to validate the request before loading the form.</li>
                    <li>External API responses must be checked for validity and non-empty values.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <CaseRegistration requestData={requestData} onCancel={handleCancel} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
