import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../service/UserService";
import Loading from "../assets/Loading.gif";
// import user_icon from "../assets/icons/person.png";
// import email_icon from "../assets/icons/email.png";
// import password_icon from "../assets/icons/password.png";

import "./UserUpdatePage.css";

const UserUpdatePage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserDataById = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true)
        const response = await UserService.getUserById(userId, token);
        setLoading(false)
        const { id, name, email, role } = response.myUsers;
        setUserData({ id, name, email, role });
      } catch (error) {
        setLoading(false)
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDataById(userId);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm("Are you sure you want to update the changes?");
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        await UserService.updateUser(userId, userData, token);
        navigate("/admin/users");
      }
    } catch (err) {
      console.error("error while registering: ", err);
      alert("An error occured while registering user");
    }
  };

  return (
    <div className="auth-container">
      <div className={loading ? "loading-container" : "inactive"}>
        {loading && <img src={Loading} alt="Loading.."/>}
      </div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group not-allowed">
          <label>User Id:</label>
          <input className="not-allowed" type="text" name="id" value={userData.id} onChange={handleChange} readOnly />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </div>
        <div className="form-group not-allowed">
          <label>Email:</label>
          <input className="not-allowed" type="email" name="email" value={userData.email} onChange={handleChange} readOnly/>
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input type="text" name="role" value={userData.role} onChange={handleChange} />
        </div>
        <div className="submit-button">
        <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdatePage;
