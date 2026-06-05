import React from "react";

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const aiSecurity = JSON.parse(localStorage.getItem("aiSecurity")) || {};

  const riskAnalysis = aiSecurity.riskAnalysis || {};
  const botDetection = aiSecurity.botDetection || {};
  const anomalyDetection = aiSecurity.anomalyDetection || {};
  const behaviorAnalysis = aiSecurity.behaviorAnalysis || {};

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
    localStorage.removeItem("aiSecurity");

    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <h1>🔥 AI Secure Dashboard</h1>
      <p>Real-time AI based authentication and threat monitoring</p>

      <div className="dashboard-grid">
        <div className="analytics-card">
          <h3>User</h3>
          <div className="value">{userData.username || "User"}</div>
        </div>

        <div className="analytics-card">
          <h3>Risk Score</h3>
          <div className="value">{riskAnalysis.riskScore || 0}%</div>
        </div>

        <div className="analytics-card">
          <h3>Risk Level</h3>
          <div className="value">{riskAnalysis.riskLevel || "Low"}</div>
        </div>

        <div className="analytics-card">
          <h3>Bot Status</h3>
          <div className="value">
            {botDetection.isBot ? "Bot" : "Human"}
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-card">
          <h3>🛡️ AI Analysis Result</h3>

          <ul>
            <li>✅ Email: {userData.email || "N/A"}</li>
            <li>✅ Bot Score: {botDetection.botScore || 0}</li>
            <li>✅ Behavior Risk: {behaviorAnalysis.riskLevel || "Low"}</li>
            <li>
              ✅ Anomaly Detected:{" "}
              {anomalyDetection.isAnomaly ? "Yes" : "No"}
            </li>
            <li>
              ✅ Access Blocked:{" "}
              {riskAnalysis.blockAccess ? "Yes" : "No"}
            </li>
          </ul>
        </div>

        <div className="security-status">
          <h3>📊 AI Risk Score Chart</h3>

          <div className="risk-chart">
            <div className="risk-row">
              <span>
                <b>Overall Risk</b>
                <b>{riskAnalysis.riskScore || 0}%</b>
              </span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${riskAnalysis.riskScore || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="risk-row">
              <span>
                <b>Bot Risk</b>
                <b>{botDetection.botScore || 0}%</b>
              </span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${botDetection.botScore || 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="status-pulse">
            <span className="status-dot"></span>
            AI Security Status: {riskAnalysis.riskLevel || "Protected"}
          </div>
        </div>
      </div>

      <div className="login-table">
        <h3>🧾 Current Login Activity</h3>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Status</th>
              <th>Risk</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{userData.username || "User"}</td>
              <td>{userData.email || "N/A"}</td>
              <td>Success</td>
              <td>{riskAnalysis.riskLevel || "Low"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;