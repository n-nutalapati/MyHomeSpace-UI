import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import user_icon from "../assets/icons/person.png";
import email_icon from "../assets/icons/email.png";
import password_icon from "../assets/icons/password.png";

import "./RegistrationPage.css";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER',
    });
    // const [error, setError] = useState();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // const token = localStorage.getItem(token);
        await UserService.register(formData);
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'USER',
        })

        alert('User Created successfully');
        navigate('/login');
    } catch (err) {
      console.log('error while registering: ', err);
      alert('An error occured while registering user');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registration</h2>
      <div className="underline"></div>
      <form onSubmit={(e) => handleSubmit(e)}>

      <div className="form-group">
          <img src={user_icon} alt="user icon" />
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter Name..."
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email id..."
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="password..."
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-button">
          <button type="submit">Register</button>
        </div>
      </form>
      {/* {JSON.stringify(formData)} */}
    </div>
  );
};

export default RegistrationPage;
