import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function NewCaseRegistration() {
  const location = useLocation();

  const defaultAppId = "rccms_summer_camp";
  const defaultAppKey =
    "d4d6e2c0dd461e873663bb228229d9200cc2a2799a88df817k6e7b95a0992797";

  const appId = location.state?.appId ?? defaultAppId;
  const appKey = location.state?.appKey ?? defaultAppKey;

  const [districts, setDistricts] = useState([]);
  const [subdivisions, setSubdivisions] = useState([]);
  const [revenueCircles, setRevenueCircles] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [mouzas, setMouzas] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedSubdivision, setSelectedSubdivision] = useState("");
  const [selectedRevenueCircle, setSelectedRevenueCircle] = useState("");
  const [selectedTehsil, setSelectedTehsil] = useState("");
  const [selectedMouja, setSelectedMouja] = useState("");

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      name: "",
      guardian: "",
      relation: "",
      address: "",
      mobile: "",
      email: ""
    }
  ]);

  const [lands, setLands] = useState([
    {
      id: 1,
      khatianNo: "",
      plotNo: "",
      areaRecorded: "",
      landMainClass: "",
      landSubClass: ""
    }
  ]);

  const [caseYear, setCaseYear] = useState("2026");
  const [subject, setSubject] = useState("Sample Subject");
  const [undersection, setUndersection] = useState("95");
  const [areaToBeAllotted, setAreaToBeAllotted] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    setCaptchaValue(code);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    const loadDistricts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/districts?appId=${appId}`
        );
        setDistricts(response.data || []);
      } catch (error) {
        console.error("Error loading districts:", error);
      }
    };

    loadDistricts();
  }, [appId]);

  useEffect(() => {
    if (!selectedDistrict) {
      setSubdivisions([]);
      setSelectedSubdivision("");
      setRevenueCircles([]);
      setSelectedRevenueCircle("");
      setTehsils([]);
      setSelectedTehsil("");
      setMouzas([]);
      setSelectedMouja("");
      return;
    }

    const loadSubdivisions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/subdivisions?appId=${appId}&distcode=${selectedDistrict}`
        );
        setSubdivisions(response.data || []);
      } catch (error) {
        console.error("Error loading subdivisions:", error);
      }
    };

    loadSubdivisions();
  }, [selectedDistrict, appId]);

  useEffect(() => {
    if (!selectedSubdivision) {
      setRevenueCircles([]);
      setSelectedRevenueCircle("");
      setTehsils([]);
      setSelectedTehsil("");
      setMouzas([]);
      setSelectedMouja("");
      return;
    }

    const loadRevenueCircles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/revenue-circles?appId=${appId}&distcode=${selectedDistrict}&subdivcode=${selectedSubdivision}`
        );
        setRevenueCircles(response.data || []);
      } catch (error) {
        console.error("Error loading revenue circles:", error);
      }
    };

    loadRevenueCircles();
  }, [selectedSubdivision, selectedDistrict, appId]);

  useEffect(() => {
    if (!selectedRevenueCircle) {
      setTehsils([]);
      setSelectedTehsil("");
      setMouzas([]);
      setSelectedMouja("");
      return;
    }

    const loadTehsils = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/tehsils?appId=${appId}&distcode=${selectedDistrict}&subdivcode=${selectedSubdivision}&revcirclecode=${selectedRevenueCircle}`
        );
        setTehsils(response.data || []);
      } catch (error) {
        console.error("Error loading tehsils:", error);
      }
    };

    loadTehsils();
  }, [selectedRevenueCircle, selectedSubdivision, selectedDistrict, appId]);

  useEffect(() => {
    if (!selectedTehsil) {
      setMouzas([]);
      setSelectedMouja("");
      return;
    }

    const loadMouzas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mouzas?appId=${appId}&distcode=${selectedDistrict}&subdivcode=${selectedSubdivision}&revcirclecode=${selectedRevenueCircle}&tehsilcode=${selectedTehsil}`
        );
        setMouzas(response.data || []);
      } catch (error) {
        console.error("Error loading mouzas:", error);
      }
    };

    loadMouzas();
  }, [selectedTehsil, selectedRevenueCircle, selectedSubdivision, selectedDistrict, appId]);

  const addApplicant = () => {
    setApplicants([
      ...applicants,
      {
        id: applicants.length + 1,
        name: "",
        guardian: "",
        relation: "",
        address: "",
        mobile: "",
        email: ""
      }
    ]);
  };

  const removeLastApplicant = () => {
    setApplicants((prev) =>
      prev.length > 1 ? prev.slice(0, -1) : prev
    );
  };

  const addLand = () => {
    setLands([
      ...lands,
      {
        id: lands.length + 1,
        khatianNo: "",
        plotNo: "",
        areaRecorded: "",
        landMainClass: "",
        landSubClass: ""
      }
    ]);
  };

  const removeLastLand = () => {
    setLands((prev) =>
      prev.length > 1 ? prev.slice(0, -1) : prev
    );
  };

  const handleApplicantChange = (index, field, value) => {
    setApplicants((prev) =>
      prev.map((applicant, idx) =>
        idx === index ? { ...applicant, [field]: value } : applicant
      )
    );
  };

  const handleLandChange = (index, field, value) => {
    setLands((prev) =>
      prev.map((land, idx) =>
        idx === index ? { ...land, [field]: value } : land
      )
    );
  };

  const handleSubmit = async () => {
    if (
      !selectedDistrict ||
      !selectedSubdivision ||
      !selectedRevenueCircle ||
      !selectedTehsil ||
      !selectedMouja
    ) {
      alert("Please select district, subdivision, revenue circle, tehsil, and mouja.");
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaValue) {
      alert("Captcha does not match. Please try again.");
      generateCaptcha();
      return;
    }

    const payload = {
      appId,
      appKey,
      caseData: {
        statecode: "16",
        distcode: selectedDistrict,
        officeid: "1",
        subdivcode: selectedSubdivision,
        revcirclecode: selectedRevenueCircle,
        caseyear: caseYear,
        subject,
        undersection,
        petitioners: applicants.map((a, index) => ({
          petisl: index + 1,
          petiname: a.name,
          petirelation: a.relation,
          petifh_name: a.guardian,
          petiaddress: a.address,
          peticontactno: a.mobile,
          petiemail: a.email
        })),
        lands: lands.map((l) => ({
          moucode: selectedMouja,
          ktsr: l.khatianNo,
          ptsr: l.plotNo,
          area: l.areaRecorded,
          main_class_code: l.landMainClass,
          sub_class_code: l.landSubClass
        })),
        user: {
          userid: "demo",
          computer: "localhost"
        }
      }
    };

    setIsConnecting(true);
    setSubmitMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/submit-section14",
        payload
      );

      if (response.data?.success) {
        setSubmitMessage(`Case Submitted Successfully. Case ID: ${response.data.caseId}`);
      } else {
        setSubmitMessage(response.data?.message || "Submission failed.");
      }
    } catch (error) {
      console.error(error);
      const backendMessage =
        error.response?.data?.message || error.response?.data || error.message;
      setSubmitMessage(`Submission Failed: ${backendMessage}`);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="glass-container">
      <div className="header-area">
        <h1 className="registration-title">New Case Registration</h1>
        <p className="app-subtitle">Section 14 Application Form</p>
      </div>

      <div className="form-section">
        <div className="section-label">Applicant Details</div>

        <div className="form-grid">
          <div className="form-group">
            <label>District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.distcode} value={district.distcode}>
                  {district.distname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Subdivision</label>
            <select
              value={selectedSubdivision}
              onChange={(e) => setSelectedSubdivision(e.target.value)}
              disabled={!subdivisions.length}
            >
              <option value="">Select Subdivision</option>
              {subdivisions.map((subdiv) => (
                <option key={subdiv.subdivcode} value={subdiv.subdivcode}>
                  {subdiv.subdivname}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="applicant-table-container">
          <div className="table-wrapper"></div>
          <table className="applicant-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Guardian</th>
                <th>Relation</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant, index) => (
                <tr key={applicant.id}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={applicant.name}
                      onChange={(e) =>
                        handleApplicantChange(index, "name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={applicant.guardian}
                      onChange={(e) =>
                        handleApplicantChange(index, "guardian", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={applicant.relation}
                      onChange={(e) =>
                        handleApplicantChange(index, "relation", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={applicant.address}
                      onChange={(e) =>
                        handleApplicantChange(index, "address", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={applicant.mobile}
                      onChange={(e) =>
                        handleApplicantChange(index, "mobile", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={applicant.email}
                      onChange={(e) =>
                        handleApplicantChange(index, "email", e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-actions">
            <button className="add-btn" onClick={addApplicant}>
              + Add Applicant
            </button>
            {applicants.length > 1 && (
              <button
                className="cancel-btn"
                type="button"
                onClick={removeLastApplicant}
              >
                Cancel
              </button>
            )}
          </div>
          <div className="section-divider"></div>
        </div>
      </div>

      <div className="form-section">
        <div className="section-label">Land Details</div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Revenue Circle</label>
          <select
            value={selectedRevenueCircle}
            onChange={(e) => setSelectedRevenueCircle(e.target.value)}
            disabled={!revenueCircles.length}
          >
            <option value="">Select Revenue Circle</option>
            {revenueCircles.map((circle) => (
              <option key={circle.revcirclecode} value={circle.revcirclecode}>
                {circle.revcirclename}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tehsil</label>
          <select
            value={selectedTehsil}
            onChange={(e) => setSelectedTehsil(e.target.value)}
            disabled={!tehsils.length}
          >
            <option value="">Select Tehsil</option>
            {tehsils.map((tehsil) => (
              <option key={tehsil.tehsilcode} value={tehsil.tehsilcode}>
                {tehsil.tehsilname}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Mouja</label>
          <select
            value={selectedMouja}
            onChange={(e) => setSelectedMouja(e.target.value)}
            disabled={!mouzas.length}
          >
            <option value="">Select Mouja</option>
            {mouzas.map((mouza) => (
              <option key={mouza.moucode} value={mouza.moucode}>
                {mouza.mouname}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="applicant-table">
          <thead>
            <tr>
              <th>Khatian No</th>
              <th>Plot No</th>
              <th>Area Recorded</th>
              <th>Land Main Class</th>
              <th>Land Sub Class</th>
            </tr>
          </thead>
          <tbody>
            {lands.map((land, index) => (
              <tr key={land.id}>
                <td>
                  <input
                    type="text"
                    value={land.khatianNo}
                    onChange={(e) =>
                      handleLandChange(index, "khatianNo", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={land.plotNo}
                    onChange={(e) => handleLandChange(index, "plotNo", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={land.areaRecorded}
                    onChange={(e) =>
                      handleLandChange(index, "areaRecorded", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={land.landMainClass}
                    onChange={(e) =>
                      handleLandChange(index, "landMainClass", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={land.landSubClass}
                    onChange={(e) =>
                      handleLandChange(index, "landSubClass", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-actions">
          <button className="add-btn" onClick={addLand}>
            + Add Land
          </button>
          {lands.length > 1 && (
            <button
              className="cancel-btn"
              type="button"
              onClick={removeLastLand}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="section-divider"></div>
      </div>

      <div className="form-section">
        <div className="section-label">Area Allocation</div>
      </div>
      <div className="form-group">
        <label>Area To Be Allotted</label>
        <input
          type="number"
          placeholder="Enter Area"
          value={areaToBeAllotted}
          onChange={(e) => setAreaToBeAllotted(e.target.value)}
        />
      </div>
      <div className="section-divider"></div>

      <div className="form-section">
        <div className="section-label">Supporting Documents</div>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>Electricity Bill (PDF)</label>
          <input type="file" />
        </div>
        <div className="form-group">
          <label>Other Supporting Document</label>
          <input type="file" />
        </div>
      </div>
      <div className="section-divider"></div>

      <div className="form-section">
        <div className="section-label">Captcha Verification</div>
      </div>
      <div className="form-group">
        <label>Captcha</label>
        <div className="captcha-box">{captchaValue}</div>
        <input
          type="text"
          placeholder="Enter Captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <div className="button-group">
          <button className="btn-primary" onClick={handleSubmit} disabled={isConnecting}>
            {isConnecting ? "Submitting..." : "Submit"}
          </button>
          <button
            className="cancel-btn"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>

      {submitMessage ? <div className="form-message">{submitMessage}</div> : null}
    </div>
  );
}

export default NewCaseRegistration;
