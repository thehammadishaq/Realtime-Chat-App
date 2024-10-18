import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [hidePass, setHidePass] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("register", {
        username,
        email,
        password,
      });
      navigate("/");
    } catch (error) {
      const err = error.response.data.message;
      setError(err);
    }
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card" autoComplete="off">
        <div className="form-title">Register</div>
        <div className="form-subtitle">Create your account</div>

        <div className="auth">
          <div className="input-elm">
            <div className="auth-label">Username</div>
            <input
              className="auth-input"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="input-elm">
            <div className="auth-label">Email</div>
            <input
              className="auth-input"
              type="email"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="input-elm">
            <div className="auth-label">Password</div>
            <div className="input-container">
              <input
                className="auth-input"
                type={!hidePass ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
              {hidePass ? (
                <BsEyeSlash
                  className="eye-svg"
                  onClick={() => setHidePass(!hidePass)}
                />
              ) : (
                <BsEye
                  className="eye-svg"
                  onClick={() => setHidePass(!hidePass)}
                />
              )}
            </div>
          </div>
          <div className="input-elm">
            <div className="auth-label">Confirm Password</div>
            <div className="input-container">
              <input
                className="auth-input"
                type={!hidePass ? "text" : "password"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
              />
              {hidePass ? (
                <BsEyeSlash
                  className="eye-svg"
                  onClick={() => setHidePass(!hidePass)}
                />
              ) : (
                <BsEye
                  className="eye-svg"
                  onClick={() => setHidePass(!hidePass)}
                />
              )}
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="auth-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
