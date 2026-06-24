import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function NewCaseRegistration() {
  const location = useLocation();

const { appId } = location.state || {
  appId: "rccms_summer_camp"
};

const [districts, setDistricts] = useState([]);
useEffect(() => {
  const loadDistricts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/districts?appId=${appId}`
      );

      console.log(response.data);
      setDistricts(response.data);
    } catch (error) {
      console.error("Error loading districts:", error);
    }
  };

  loadDistricts();
}, [appId]);
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
const handleSubmit = async () => {

  const payload = {
    appId: "rccms_summer_camp",
    appKey: "d4d6e2c0dd461e873663bb228229d9200cc2a2799a88df817k6e7b95a0992797",

  caseData: {
  statecode: "16",
  distcode: "02",
  officeid: "1",
  subdivcode: "1",
  revcirclecode: "1",
  caseyear: "2026",
  subject: "Sample Subject",
  undersection: "95",

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
    moucode: "1",
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

  try {

    const response = await axios.post(
      "http://localhost:8080/api/submit-section14",
      payload
    );

    console.log(response.data);

    alert("Case Submitted Successfully");
    alert("Case ID : " + response.data.caseId);

  } catch (error) {

    console.error(error);

    alert("Submission Failed");
  }
};
  return (
    <div className="glass-container">

      <div className="header-area">
      <h1 className="registration-title">
  New Case Registration
      </h1>

        <p className="app-subtitle">
          Section 14 Application Form
        </p>
      </div>

      <div className="form-section">
  <div className="form-section">
  <div className="section-label">
    Applicant Details
  </div>

  <div className="form-grid">

    <div className="form-group">
      <label>District</label>
     <select>
  <option value="">Select District</option>

  {districts.map((district) => (
    <option
      key={district.distcode}
      value={district.distcode}
    >
      {district.distname}
    </option>
  ))}
</select>
    </div>

    <div className="form-group">
      <label>Subdivision</label>
      <select>
        <option>Select Subdivision</option>
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
        <input type="text" />
      </td>

      <td>
        <input type="text" />
      </td>

      <td>
        <input type="text" />
      </td>

      <td>
        <input type="text" />
      </td>

      <td>
        <input type="text" />
      </td>

      <td>
        <input type="email" />
      </td>

    </tr>
  ))}
</tbody>

  </table>

  <div className="table-actions">
    <button className="add-btn"
    onClick={addApplicant}
    >
      + Add Applicant
    </button>
  </div>
    <div className="section-divider"></div>

</div>
</div>
</div>

<div className="form-section">
  <div className="section-label">Land Details</div>
</div>

<div className="form-grid">

  <div className="form-group">
    <label>Revenue Circle</label>
    <select>
      <option>Select Revenue Circle</option>
    </select>
  </div>

  <div className="form-group">
    <label>Tehsil</label>
    <select>
      <option>Select Tehsil</option>
    </select>
  </div>

  <div className="form-group">
    <label>Mouja</label>
    <select>
      <option>Select Mouja</option>
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
        <input type="text" />
      </td>

      <td>
        <input type="text" />
      </td>

      <td>
        <input type="text" />
      </td>

      <td>
        <input type="text" />
      </td>

      <td>
        <input type="text" />
      </td>

    </tr>
  ))}
</tbody>

  </table>

  <div className="table-actions">
    <button className="add-btn"
    onClick={addLand}>
      + Add Land
    </button>
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

  <div className="captcha-box">
    ABCDE
  </div>

  <input
    type="text"
    placeholder="Enter Captcha"
  />

</div>
      <div className="form-actions">
  <div className="button-group">

  <button
    className="btn-primary"
    onClick={handleSubmit}
>
    Submit
</button>

<button className="cancel-btn">
    Cancel
</button>

</div>
</div>
    </div>
  );
}

export default NewCaseRegistration;