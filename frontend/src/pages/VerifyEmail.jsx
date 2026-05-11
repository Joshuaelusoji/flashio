// src/pages/VerifyEmail.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function VerifyEmail() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");

    if (!token) {
      setStatus("failed");
      setMessage("Invalid verification link.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${API_URL}/auth/verify-email?token=${encodeURIComponent(token)}`
        );
        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setStatus("failed");
          setMessage(data.message || "Verification failed. Please try again.");
        }
      } catch {
        setStatus("failed");
        setMessage("Network error. Please try again.");
      }
    };

    verify();
  }, [search, navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f4f4f4",
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "3rem 2rem",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      }}>

        {/* ── LOADING ── */}
        {status === "loading" && (
          <>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "3px solid #f0f0f0",
              borderTopColor: "#FF4500",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 1.5rem",
            }} />
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 8px", color: "#1a1a1a" }}>
              Verifying your email
            </h2>
            <p style={{ fontSize: 14, color: "#888", margin: 0, lineHeight: 1.6 }}>
              Please wait a moment...
            </p>
          </>
        )}

        {/* ── SUCCESS ── */}
        {status === "success" && (
          <>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "#EAF3DE",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="#3B6D11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 8px", color: "#1a1a1a" }}>
              Email verified!
            </h2>
            <p style={{ fontSize: 14, color: "#666", margin: 0, lineHeight: 1.6 }}>
              Redirecting you to login...
            </p>
          </>
        )}

        {/* ── FAILED ── */}
        {status === "failed" && (
          <>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "#FCEBEB",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                stroke="#A32D2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 8px", color: "#1a1a1a" }}>
              Verification failed
            </h2>
            <p style={{ fontSize: 14, color: "#666", margin: "0 0 1.5rem", lineHeight: 1.6 }}>
              {message}
            </p>
            <a href="/signup" style={{
              display: "inline-block", padding: "10px 28px",
              background: "#FF4500", color: "#fff",
              borderRadius: 8, fontSize: 14, fontWeight: 600,
              textDecoration: "none",
            }}>
              Back to signup
            </a>
          </>
        )}

      </div>
    </div>
  );
}

export default VerifyEmail;