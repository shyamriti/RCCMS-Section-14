export default function CaseRegistration() {
  return (
    <div
      style={{
        background: "#f4f7fb",
        minHeight: "100vh",
        padding: "40px",
        color: "#1f2937",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "38px",
          marginBottom: "30px",
          fontWeight: "700",
        }}
      >
        New Case Registration - Section 14
      </h1>

      {/* Location Details */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>📍 Location Details</h3>

        <div style={rowStyle}>
          <div>
            <label>District <span style={{ color: "red" }}>*</span></label>
            <br />
            <select style={inputStyle}>
              <option>Select District</option>
            </select>
          </div>

          <div>
            <label>Subdivision <span style={{ color: "red" }}>*</span></label>
            <br />
            <select style={inputStyle}>
              <option>Select Subdivision</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applicant Details */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>👤 Applicant Details</h3>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "15px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Sl No</th>
              <th style={thStyle}>Name <span style={{ color: "red" }}>*</span></th>
              <th style={thStyle}>Guardian <span style={{ color: "red" }}>*</span></th>
              <th style={thStyle}>Relation <span style={{ color: "red" }}>*</span></th>
              <th style={thStyle}>Address <span style={{ color: "red" }}>*</span></th>
              <th style={thStyle}>Mobile <span style={{ color: "red" }}>*</span></th>
              <th style={thStyle}>Email</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={tdStyle}>1</td>
              <td style={tdStyle}>
                <input style={smallInput} />
              </td>
              <td style={tdStyle}>
                <input style={smallInput} />
              </td>
              <td style={tdStyle}>
                <input style={smallInput} />
              </td>
              <td style={tdStyle}>
                <input style={smallInput} />
              </td>
              <td style={tdStyle}>
                <input style={smallInput} />
              </td>
              <td style={tdStyle}>
                <input style={smallInput} />
              </td>
            </tr>
          </tbody>
        </table>

        <button style={addBtn}>+ Add Applicant</button>
      </div>

      {/* Land Details */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>🏞️ Land Details</h3>

        <div style={rowStyle}>
          <input style={inputStyle} placeholder="Revenue Circle" />
          <input style={inputStyle} placeholder="Tehsil" />
          <input style={inputStyle} placeholder="Mouza" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <input style={smallInput} placeholder="Khatian" />
          <input style={smallInput} placeholder="Plot No" />
          <input style={smallInput} placeholder="Area Recorded" />
          <input style={smallInput} placeholder="Land Main Class" />
          <input style={smallInput} placeholder="Land Sub Class" />
        </div>

        <button style={addBtn}>+ Add Land</button>
      </div>

      {/* Area */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>📐 Area To Be Allotted</h3>

        <input
          style={inputStyle}
          placeholder="Enter area to be allotted"
        />

        <p
          style={{
            color: "#dc2626",
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          Area must be less than or equal to recorded area
        </p>
      </div>

      {/* Documents */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>📎 Supporting Documents</h3>

        <div style={rowStyle}>
          <div>
            <label>Document Type</label>
            <br />
            <select style={inputStyle}>
              <option>Select Document</option>
            </select>
          </div>

          <div>
            <label>Upload PDF</label>
            <br />
            <input type="file" />
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Other Supporting Documents</label>
          <br />
          <input type="file" />
        </div>
      </div>

      {/* Captcha */}
      <div style={cardStyle}>
        <h3 style={headingStyle}>🔒 Captcha</h3>

        <div
          style={{
            width: "180px",
            padding: "15px",
            border: "1px solid #cbd5e1",
            background: "#f8fafc",
            fontWeight: "bold",
            letterSpacing: "4px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          7CAP9H
        </div>

        <input
          style={inputStyle}
          placeholder="Enter Captcha"
        />
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "30px" }}>
        <button style={submitBtn}>Submit</button>

        <button style={cancelBtn}>Cancel</button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "24px",
  borderRadius: "16px",
  marginBottom: "24px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const headingStyle = {
  color: "#2563eb",
  marginBottom: "18px",
};

const rowStyle = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const inputStyle = {
  padding: "12px",
  width: "260px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  marginTop: "6px",
};

const smallInput = {
  width: "100%",
  padding: "8px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
};

const addBtn = {
  marginTop: "15px",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const submitBtn = {
  padding: "12px 24px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  marginRight: "12px",
  cursor: "pointer",
};

const cancelBtn = {
  padding: "12px 24px",
  background: "#6b7280",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const thStyle = {
  border: "1px solid #e5e7eb",
  padding: "10px",
  background: "#eff6ff",
};

const tdStyle = {
  border: "1px solid #e5e7eb",
  padding: "8px",
};