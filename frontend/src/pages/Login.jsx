import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password });

      if (response.success) {
        if (fromPath) {
          navigate(fromPath, { replace: true });
          return;
        }

        const role = (response.data.user.role || "user").toLowerCase();

        // Redirect based on role
        if (role === "user") navigate("/orders");
        else if (role === "vendor") navigate("/vendor/dashboard");
        else if (role === "rider") navigate("/rider/dashboard");
        else navigate("/");

      } else {
        alert(response.message || "Login failed. Check your inputs.");
      }

    } catch (err) {
      console.error("Login error:", err);
      alert(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-lg h-4/6 shadow-2xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Flashio</h1>

        <div className="mt-14 mb-20">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 mb-4 w-full rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 mb-4 w-full rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;