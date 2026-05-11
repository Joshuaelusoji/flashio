import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(search).get("token");

    if (!token) {
      setStatus("failed");
      setMessage("Verification link is invalid or incomplete.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/verify-email?token=${token}`
        );

        const text = await res.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }

        if (res.ok) {
          setStatus("success");

          setTimeout(() => {
            navigate("/login");
          }, 2500);
        } else {
          setStatus("failed");
          setMessage(data.message || "Verification failed.");
        }
      } catch (err) {
        setStatus("failed");
        setMessage("Network error. Try again later.");
      }
    };

    verifyEmail();
  }, [search, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

        {status === "loading" && (
          <>
            <div className="w-14 h-14 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold">Verifying email</h2>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we confirm your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              ✔
            </div>
            <h2 className="text-lg font-semibold text-green-600">
              Email verified
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Redirecting you to login...
            </p>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              ✕
            </div>
            <h2 className="text-lg font-semibold text-red-600">
              Verification failed
            </h2>
            <p className="text-sm text-gray-600 mt-2 mb-4">
              {message}
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="bg-orange-500 text-white px-5 py-2 rounded-lg"
            >
              Go to signup
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default VerifyEmail;