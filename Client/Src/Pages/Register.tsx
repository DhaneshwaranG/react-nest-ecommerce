import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegisterMutation } from "../Services/Api/authApi";

import ThemeToggle from "../Components/ThemeToggle";

import "./auth.css";

function Register() {
  const navigate = useNavigate();

  const [register, { isLoading, error }] = useRegisterMutation();

  const [username, setUsername] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    if (!username.trim() || !name.trim() || !email.trim() || !password) {
      setFormError("Please fill in all fields.");

      return;
    }

    try {
      const response = await register({
        username: username.trim(),
        name: name.trim(),
        email: email.trim(),
        password,
      }).unwrap();

      setSuccessMessage(response.message || "Registration successful.");

      setUsername("");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (registerError: any) {
      const message =
        registerError?.data?.message ||
        registerError?.message ||
        "Registration failed";

      setFormError(
        Array.isArray(message) ? message.join(", ") : String(message),
      );
    }
  };

  const getApiErrorMessage = () => {
    if (!error) {
      return "";
    }

    const apiError = error as {
      data?: {
        message?: string | string[];
      };
    };

    const message = apiError.data?.message;

    if (Array.isArray(message)) {
      return message.join(", ");
    }

    return message || "Registration failed";
  };

  return (
    <div className="auth-page">
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>

          <p className="auth-subtitle">Register for a new account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="name">Name</label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </div>

          {(formError || getApiErrorMessage()) && (
            <p className="auth-message auth-error">
              {formError || getApiErrorMessage()}
            </p>
          )}

          {successMessage && (
            <p className="auth-message auth-success">{successMessage}</p>
          )}

          <button className="auth-button" type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
