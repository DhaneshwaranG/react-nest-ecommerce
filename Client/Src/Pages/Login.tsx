import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../Services/Api/authApi";
import { setCredentials } from "../Redux/Slices/authSlice";

import type { AppDispatch } from "../Redux/Store";

import ThemeToggle from "../Components/ThemeToggle";

import "./auth.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [login, { isLoading, error }] = useLoginMutation();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError("");

    if (!username.trim() || !password) {
      setFormError("Please enter username and password.");

      return;
    }

    try {
      const response = await login({
        username: username.trim(),
        password,
      }).unwrap();

      dispatch(
        setCredentials({
          accessToken: response.accessToken,

          refreshTokenId: response.refreshTokenId,
        }),
      );

      navigate("/home", {
        replace: true,
      });
    } catch (loginError: any) {
      const message =
        loginError?.data?.message || loginError?.message || "Login failed";

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

    return message || "Login failed";
  };

  return (
    <div className="auth-page">
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>

          <p className="auth-subtitle">Login to your account</p>
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

          <button className="auth-button" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
