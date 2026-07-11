// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api.js";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalMessage, setGeneralMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "⚠️ First Name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "⚠️ Last Name is required.";
    if (!form.email.trim()) newErrors.email = "⚠️ Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "⚠️ Invalid email address.";
    if (!form.phone.trim()) newErrors.phone = "⚠️ Phone number is required.";
    if (!form.password) newErrors.password = "⚠️ Password is required.";
    else if (form.password.length < 8) newErrors.password = "⚠️ Password must be at least 8 characters.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear field error on change
    setGeneralMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setGeneralMessage("");

    try {
      const response = await registerUser(form);

      if (response.success) {
        setGeneralMessage(
          "✅ Signup successful! Please check your email or spam to verify your account."
        );
        setTimeout(() => navigate("/login"), 4000);
      } else {
        const msg = response.message?.toLowerCase() || "";
        const fieldError = {};
        if (msg.includes("email")) fieldError.email = `⚠️ ${response.message}`;
        else if (msg.includes("phone")) fieldError.phone = `⚠️ ${response.message}`;
        else setGeneralMessage(`⚠️ ${response.message}`);

        setErrors((prev) => ({ ...prev, ...fieldError }));
      }
    } catch (err) {
      console.error("Signup error:", err);
      setGeneralMessage("⚠️ Server error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded shadow-md w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create your Flashio account
        </h1>

        {generalMessage && (
          <p
            className={`mb-4 text-center text-sm ${
              generalMessage.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {generalMessage}
          </p>
        )}

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="flex-1">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className={`border p-2 w-full rounded ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`border p-2 w-full rounded ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={`border p-2 w-full rounded ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`border p-2 w-full rounded ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;