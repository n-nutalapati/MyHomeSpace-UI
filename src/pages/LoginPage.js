import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import email_icon from "../assets/icons/email.png";
import password_icon from "../assets/icons/password.png";
import Loading from "../assets/Loading.gif";

import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = await UserService.login(email, password);
      setLoading(false);  
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userId", userData.id);
        localStorage.setItem("role", userData.role);

        navigate('/home');
      } else {
        setError(
          userData.message.substring(0, userData.message.indexOf(".")) ||
            userData.message
        );
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err);
      setTimeout(() => {
        setError("");
      }, 5000);
      
    }
  };

  return (
    <div className="auth-container">
      <div className={loading ? "loading-container" : "inactive"}>
        {loading && <img src={Loading} alt="Loading.." />}
      </div>
      <h2>Login</h2>
      <div className="underline"></div>
      <div className={error ? "error-message" : null}>
        {error && <p>{error}</p>}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            value={email}
            placeholder="User id..."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            value={password}
            placeholder="password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="submit-button">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
