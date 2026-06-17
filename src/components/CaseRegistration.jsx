import React, { useState } from 'react';

export default function CaseRegistration({ requestData, onCancel }) {
  const [applicantRows, setApplicantRows] = useState([
    { id: 1, name: '', guardian: '', relation: '', address: '', mobile: '', email: '' },
  ]);
  const [landRows, setLandRows] = useState([
    { id: 1, khatian: '1235', plotNo: '', areaRecorded: '', mainClass: '', subClass: '' },
  ]);
  const [selectedDocument, setSelectedDocument] = useState('Electricity Bill');
  const [district, setDistrict] = useState('');
  const [subdivision, setSubdivision] = useState('');
  const [revenueCircle, setRevenueCircle] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [mouza, setMouza] = useState('');
  const [areaToAllocate, setAreaToAllocate] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [supportingFile, setSupportingFile] = useState(null);
  const [otherSupportingFile, setOtherSupportingFile] = useState(null);
  const [errors, setErrors] = useState({});
  const generatedCaptcha = '7CAP9H';

  const districts = ['02 - West Tripura', '05 - North Tripura', '07 - Sepahijala'];
  const subdivisions = ['01 - Sadar', '02 - Panisagar', '03 - Kailashahar'];
  const revenueCircles = ['01 - Agartala', '02 - Udaipur', '03 - Belonia'];
  const tehsils = ['02 - Agartala West', '04 - Jirania', '06 - Mohanpur'];
  const mouzas = ['Agartala Sheet No. 9', 'Mouza Chandrapur', 'Mouza Narsingarh'];
  const documentTypes = ['Electricity Bill', 'Land Agreement', 'Khutiyani', 'Other'];

  const addApplicant = () => {
    setApplicantRows(prev => [
      ...prev,
      { id: prev.length + 1, name: '', guardian: '', relation: '', address: '', mobile: '', email: '' },
    ]);
  };

  const addLandRow = () => {
    setLandRows(prev => [
      ...prev,
      { id: prev.length + 1, khatian: '1235', plotNo: '', areaRecorded: '', mainClass: '', subClass: '' },
    ]);
  };

  const handleApplicantChange = (id, field, value) => {
    setApplicantRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleLandChange = (id, field, value) => {
    setLandRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const validate = () => {
    const nextErrors = {};

    if (!district) nextErrors.district = 'Please select district';
    if (!subdivision) nextErrors.subdivision = 'Please select subdivision';
    if (!revenueCircle) nextErrors.revenueCircle = 'Please select revenue circle';
    if (!tehsil) nextErrors.tehsil = 'Please select tehsil';
    if (!mouza) nextErrors.mouza = 'Please select mouza';

    const firstApplicant = applicantRows[0] || {};
    if (!firstApplicant.name?.trim()) nextErrors['applicant-1-name'] = 'Please enter applicant name';
    if (!firstApplicant.guardian?.trim()) nextErrors['applicant-1-guardian'] = 'Please enter guardian name';
    if (!firstApplicant.relation?.trim()) nextErrors['applicant-1-relation'] = 'Please enter relation';
    if (!firstApplicant.address?.trim()) nextErrors['applicant-1-address'] = 'Please enter address';
    if (!firstApplicant.mobile?.trim()) nextErrors['applicant-1-mobile'] = 'Please enter mobile number';
    if (!firstApplicant.email?.trim()) {
      nextErrors['applicant-1-email'] = 'Please enter email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(firstApplicant.email)) {
      nextErrors['applicant-1-email'] = 'Please enter a valid email';
    }

    const firstLand = landRows[0] || {};
    if (!firstLand.plotNo?.trim()) nextErrors['land-1-plotNo'] = 'Please enter plot number';
    if (!firstLand.areaRecorded?.trim()) nextErrors['land-1-areaRecorded'] = 'Please enter area recorded';
    if (!firstLand.mainClass?.trim()) nextErrors['land-1-mainClass'] = 'Please enter land main class';
    if (!firstLand.subClass?.trim()) nextErrors['land-1-subClass'] = 'Please enter land sub class';

    if (!areaToAllocate.trim()) {
      nextErrors.areaToAllocate = 'Please enter area to be allotted';
    } else {
      const allot = Number(areaToAllocate);
      const recorded = Number(firstLand.areaRecorded);
      if (Number.isNaN(allot)) {
        nextErrors.areaToAllocate = 'Please enter a valid area number';
      } else if (!Number.isNaN(recorded) && allot > recorded) {
        nextErrors.areaToAllocate = 'Allotted area must be less than or equal to recorded area';
      }
    }

    if (!supportingFile) {
      nextErrors.supportingFile = 'Please upload a supporting PDF';
    } else if (supportingFile.type !== 'application/pdf') {
      nextErrors.supportingFile = 'Only PDF uploads are accepted';
    } else if (supportingFile.size > 2 * 1024 * 1024) {
      nextErrors.supportingFile = 'File must be smaller than 2MB';
    }

    if (!captchaInput.trim()) {
      nextErrors.captchaInput = 'Please enter the captcha';
    } else if (captchaInput.trim().toUpperCase() !== generatedCaptcha) {
      nextErrors.captchaInput = 'Captcha does not match';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!validate()) {
      setSubmitMessage('');
      return;
    }

    setSubmitMessage('Form submitted successfully. Redirecting to callback URL with status...');
  };

  return (
    <div className="case-registration-page page-content">
      <div className="registration-hero">
        <div>
          <h1 className="page-title">New Case Registration</h1>
          <p className="page-subtitle">
            Complete the case registration details for Section 14. This page is the primary front-end experience for applicant and land capture.
          </p>
        </div>

        <div className="request-payload-grid">
          {requestData && (
            ['applicationId', 'userId', 'hmac', 'underSection', 'callbackUrl'].map(key => (
              <div key={key} className="request-chip">
                <div className="chip-label">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div className="chip-value">{requestData[key]}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="section-panel tricolor-border-box">
          <div className="section-head"><span>📍</span> Location Details</div>

          <div className="form-row">
            <div className={`field-group ${errors.district ? 'field-group-invalid' : ''}`}>
              <label className="field-label">District <span className="api-label">API</span></label>
              <select
                className={`select-field ${errors.district ? 'invalid-field' : ''}`}
                value={district}
                onChange={e => setDistrict(e.target.value)}
              >
                <option value="">Select district</option>
                {districts.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.district && <div className="error-message">{errors.district}</div>}
            </div>
            <div className={`field-group ${errors.subdivision ? 'field-group-invalid' : ''}`}>
              <label className="field-label">Subdivision <span className="api-label">API</span></label>
              <select
                className={`select-field ${errors.subdivision ? 'invalid-field' : ''}`}
                value={subdivision}
                onChange={e => setSubdivision(e.target.value)}
              >
                <option value="">Select subdivision</option>
                {subdivisions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.subdivision && <div className="error-message">{errors.subdivision}</div>}
            </div>
          </div>
        </div>

        <div className="section-panel tricolor-border-box">
          <div className="section-head"><span>👤</span> Applicant Details</div>

          <div className="table-scroll">
            <table className="applicant-table">
              <thead>
                <tr>
                  <th className="table-header">Sl No</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Guardian</th>
                  <th className="table-header">Relation</th>
                  <th className="table-header">Address</th>
                  <th className="table-header">Mobile</th>
                  <th className="table-header">Email</th>
                </tr>
              </thead>
              <tbody>
                {applicantRows.map(row => (
                  <tr key={row.id}>
                    <td className="table-cell">{row.id}</td>
                    <td className="table-cell">
                      <input
                        value={row.name}
                        onChange={e => handleApplicantChange(row.id, 'name', e.target.value)}
                        className={`small-input ${errors[`applicant-${row.id}-name`] ? 'invalid-field' : ''}`}
                      />
                      {errors[`applicant-${row.id}-name`] && <div className="error-message">{errors[`applicant-${row.id}-name`]}</div>}
                    </td>
                    <td className="table-cell">
                      <input
                        value={row.guardian}
                        onChange={e => handleApplicantChange(row.id, 'guardian', e.target.value)}
                        className={`small-input ${errors[`applicant-${row.id}-guardian`] ? 'invalid-field' : ''}`}
                      />
                      {errors[`applicant-${row.id}-guardian`] && <div className="error-message">{errors[`applicant-${row.id}-guardian`]}</div>}
                    </td>
                    <td className="table-cell">
                      <input
                        value={row.relation}
                        onChange={e => handleApplicantChange(row.id, 'relation', e.target.value)}
                        className={`small-input ${errors[`applicant-${row.id}-relation`] ? 'invalid-field' : ''}`}
                      />
                      {errors[`applicant-${row.id}-relation`] && <div className="error-message">{errors[`applicant-${row.id}-relation`]}</div>}
                    </td>
                    <td className="table-cell">
                      <input
                        value={row.address}
                        onChange={e => handleApplicantChange(row.id, 'address', e.target.value)}
                        className={`small-input ${errors[`applicant-${row.id}-address`] ? 'invalid-field' : ''}`}
                      />
                      {errors[`applicant-${row.id}-address`] && <div className="error-message">{errors[`applicant-${row.id}-address`]}</div>}
                    </td>
                    <td className="table-cell">
                      <input
                        value={row.mobile}
                        onChange={e => handleApplicantChange(row.id, 'mobile', e.target.value)}
                        className={`small-input ${errors[`applicant-${row.id}-mobile`] ? 'invalid-field' : ''}`}
                      />
                      {errors[`applicant-${row.id}-mobile`] && <div className="error-message">{errors[`applicant-${row.id}-mobile`]}</div>}
                    </td>
                    <td className="table-cell">
                      <input
                        value={row.email}
                        onChange={e => handleApplicantChange(row.id, 'email', e.target.value)}
                        className={`small-input ${errors[`applicant-${row.id}-email`] ? 'invalid-field' : ''}`}
                      />
                      {errors[`applicant-${row.id}-email`] && <div className="error-message">{errors[`applicant-${row.id}-email`]}</div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type="button" onClick={addApplicant} className="secondary-button add-button">+ Add Applicant</button>
        </div>

        <div className="section-panel tricolor-border-box">
          <div className="section-head"><span>🏞️</span> Land Details</div>

          <div className="form-row wide">
            <div className={`field-group ${errors.revenueCircle ? 'field-group-invalid' : ''}`}>
              <label className="field-label">Revenue Circle <span className="api-label">API</span></label>
              <select
                className={`select-field ${errors.revenueCircle ? 'invalid-field' : ''}`}
                value={revenueCircle}
                onChange={e => setRevenueCircle(e.target.value)}
              >
                <option value="">Select revenue circle</option>
                {revenueCircles.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.revenueCircle && <div className="error-message">{errors.revenueCircle}</div>}
            </div>
            <div className={`field-group ${errors.tehsil ? 'field-group-invalid' : ''}`}>
              <label className="field-label">Tehsil <span className="api-label">API</span></label>
              <select
                className={`select-field ${errors.tehsil ? 'invalid-field' : ''}`}
                value={tehsil}
                onChange={e => setTehsil(e.target.value)}
              >
                <option value="">Select tehsil</option>
                {tehsils.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.tehsil && <div className="error-message">{errors.tehsil}</div>}
            </div>
            <div className={`field-group ${errors.mouza ? 'field-group-invalid' : ''}`}>
              <label className="field-label">Mouza <span className="api-label">API</span></label>
              <select
                className={`select-field ${errors.mouza ? 'invalid-field' : ''}`}
                value={mouza}
                onChange={e => setMouza(e.target.value)}
              >
                <option value="">Select mouza</option>
                {mouzas.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.mouza && <div className="error-message">{errors.mouza}</div>}
            </div>
          </div>

          <div className="form-row grid-five">
            {landRows.map(row => (
              <React.Fragment key={row.id}>
                <div>
                  <input className="small-input" value={row.khatian} readOnly placeholder="Khatian" />
                </div>
                <div>
                  <input
                    className={`small-input ${errors[`land-${row.id}-plotNo`] ? 'invalid-field' : ''}`}
                    value={row.plotNo}
                    onChange={e => handleLandChange(row.id, 'plotNo', e.target.value)}
                    placeholder="Plot No"
                  />
                  {errors[`land-${row.id}-plotNo`] && <div className="error-message">{errors[`land-${row.id}-plotNo`]}</div>}
                </div>
                <div>
                  <input
                    className={`small-input ${errors[`land-${row.id}-areaRecorded`] ? 'invalid-field' : ''}`}
                    value={row.areaRecorded}
                    onChange={e => handleLandChange(row.id, 'areaRecorded', e.target.value)}
                    placeholder="Area Recorded"
                  />
                  {errors[`land-${row.id}-areaRecorded`] && <div className="error-message">{errors[`land-${row.id}-areaRecorded`]}</div>}
                </div>
                <div>
                  <input
                    className={`small-input ${errors[`land-${row.id}-mainClass`] ? 'invalid-field' : ''}`}
                    value={row.mainClass}
                    onChange={e => handleLandChange(row.id, 'mainClass', e.target.value)}
                    placeholder="Land Main Class"
                  />
                  {errors[`land-${row.id}-mainClass`] && <div className="error-message">{errors[`land-${row.id}-mainClass`]}</div>}
                </div>
                <div>
                  <input
                    className={`small-input ${errors[`land-${row.id}-subClass`] ? 'invalid-field' : ''}`}
                    value={row.subClass}
                    onChange={e => handleLandChange(row.id, 'subClass', e.target.value)}
                    placeholder="Land Sub Class"
                  />
                  {errors[`land-${row.id}-subClass`] && <div className="error-message">{errors[`land-${row.id}-subClass`]}</div>}
                </div>
              </React.Fragment>
            ))}
          </div>

          <button type="button" onClick={addLandRow} className="secondary-button add-button">+ Add Land</button>
        </div>

        <div className="section-panel tricolor-border-box">
          <div className="section-head"><span>📐</span> Area To Be Allotted</div>
          <input
            className={`input-field compact-input ${errors.areaToAllocate ? 'invalid-field' : ''}`}
            value={areaToAllocate}
            onChange={e => setAreaToAllocate(e.target.value)}
            placeholder="Enter area to be allotted"
          />
          {errors.areaToAllocate && <div className="error-message">{errors.areaToAllocate}</div>}
          <p className="help-text">Area must be less than or equal to recorded area.</p>
        </div>

        <div className="section-panel tricolor-border-box">
          <div className="section-head"><span>📎</span> Supporting Documents</div>

          <div className="form-row narrow">
            <div className="field-group">
              <label className="field-label">Document Type</label>
              <select className="select-field" value={selectedDocument} onChange={e => setSelectedDocument(e.target.value)}>
                {documentTypes.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">Upload PDF</label>
              <input
                type="file"
                accept="application/pdf"
                className={`file-field ${errors.supportingFile ? 'invalid-field' : ''}`}
                onChange={e => setSupportingFile(e.target.files[0] || null)}
              />
              {errors.supportingFile && <div className="error-message">{errors.supportingFile}</div>}
            </div>
          </div>

          <div className="field-group extra-margin-top">
            <label className="field-label">Other Supporting Document</label>
            <input
              type="file"
              accept="application/pdf"
              className="file-field"
              onChange={e => setOtherSupportingFile(e.target.files[0] || null)}
            />
          </div>
        </div>

        <div className="section-panel tricolor-border-box captcha-card">
          <div className="section-head"><span>🔒</span> Captcha</div>
          <div className="captcha-code">{generatedCaptcha}</div>
          <input
            className={`input-field ${errors.captchaInput ? 'invalid-field' : ''}`}
            placeholder="Fill Captcha"
            value={captchaInput}
            onChange={e => setCaptchaInput(e.target.value)}
          />
          {errors.captchaInput && <div className="error-message">{errors.captchaInput}</div>}
        </div>

        {submitMessage && <div className="success-banner">{submitMessage}</div>}

        <div className="action-row">
          <button type="submit" className="primary-button">Submit</button>
          <button type="button" onClick={onCancel} className="secondary-button">Cancel</button>
        </div>
      </form>
    </div>
  );
}
