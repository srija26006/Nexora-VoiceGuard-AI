import { useState } from "react";
import "./App.css";

const mockResponse = {
  risk_score: 79.75,
  risk_level: "ALERT",
  recommended_action: "Warn user and request verification",
  deepfake_risk: 90,
  speaker_mismatch_risk: 70,
  prosody_risk: 40,
  behavioral_risk: 95,
  context_risk: 80,
  reasons: [
    "Synthetic voice patterns detected",
    "Speaker identity mismatch detected",
    "Urgent financial request detected",
    "Secrecy and social-engineering indicators found",
  ],
};

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      alert("Please select an audio file first.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // Mock processing until FastAPI integration is ready
    setTimeout(() => {
      setResult(mockResponse);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusClass = (level) => {
    return level ? level.toLowerCase() : "";
  };

  const riskCards = result
    ? [
        { label: "Deepfake Risk", value: result.deepfake_risk },
        {
          label: "Speaker Mismatch Risk",
          value: result.speaker_mismatch_risk,
        },
        { label: "Prosody Anomaly Risk", value: result.prosody_risk },
        { label: "Behavioral Risk", value: result.behavioral_risk },
        { label: "Context Risk", value: result.context_risk },
      ]
    : [];

  return (
    <div className="app">
      <header className="navbar">
        <div>
          <h1 className="logo">NEXORA</h1>
          <p className="tagline">
            AI-Powered Voice Integrity Security Platform
          </p>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM ACTIVE
        </div>
      </header>

      <main className="dashboard">
        <section className="hero">
          <p className="eyebrow">VOICE SECURITY ANALYSIS</p>
          <h2>Detect. Verify. Protect.</h2>
          <p>
            Analyze suspicious voice communications and identify deepfake,
            impersonation, behavioral, and social-engineering risks.
          </p>
        </section>

        <section className="upload-section">
          <h2>Analyze Voice Recording</h2>
          <p className="section-description">
            Upload an audio file for Nexora risk intelligence analysis.
          </p>

          <div className="upload-box">
            <div className="upload-icon">🎙</div>

            <h3>Upload Audio File</h3>
            <p>Supported: MP3, WAV, M4A</p>

            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
            />

            <label htmlFor="audio-upload" className="file-button">
              Choose Audio File
            </label>

            {selectedFile && (
              <div className="selected-file">
                <span>Selected File:</span>
                <strong>{selectedFile.name}</strong>
              </div>
            )}

            <button
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing Voice..." : "Analyze Call"}
            </button>

            {isAnalyzing && (
              <div className="loading-container">
                <div className="loader"></div>
                <p>Running Nexora security analysis...</p>
              </div>
            )}
          </div>
        </section>

        {result && (
          <section className="results-section">
            <div className="results-header">
              <div>
                <p className="eyebrow">ANALYSIS COMPLETE</p>
                <h2>Risk Intelligence Report</h2>
              </div>

              <div
                className={`risk-status ${getStatusClass(
                  result.risk_level
                )}`}
              >
                {result.risk_level}
              </div>
            </div>

            <div className="summary-grid">
              <div className="risk-score-card">
                <p>FINAL RISK SCORE</p>
                <div className="risk-score">
                  {result.risk_score}
                  <span>/100</span>
                </div>
                <div className="score-meter">
                  <div
                    className="score-fill"
                    style={{ width: `${result.risk_score}%` }}
                  ></div>
                </div>
              </div>

              <div className="action-card">
                <p>RECOMMENDED ACTION</p>
                <h3>{result.recommended_action}</h3>
                <span className="action-level">
                  Current Status: {result.risk_level}
                </span>
              </div>
            </div>

            <div className="risk-grid">
              {riskCards.map((risk) => (
                <div className="risk-card" key={risk.label}>
                  <div className="risk-card-top">
                    <span>{risk.label}</span>
                    <strong>{risk.value}%</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${risk.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="threat-section">
              <h3>Threat Indicators</h3>

              <ul className="threat-list">
                {result.reasons.map((reason, index) => (
                  <li key={index}>
                    <span className="threat-icon">⚠</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            <div className="decision-flow">
              <div className="decision-label">DECISION ENGINE OUTPUT</div>

              <div className="decision-statuses">
                <span className="safe">SAFE</span>
                <span className="verify">VERIFY</span>
                <span className="alert active">ALERT</span>
                <span className="block">BLOCK</span>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        NEXORA — VoiceGuard AI Security Layer
      </footer>
    </div>
  );
}

export default App;