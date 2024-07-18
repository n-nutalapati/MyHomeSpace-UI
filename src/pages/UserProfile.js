import React, { useEffect, useState } from "react";
import UserService from "../service/UserService";
import "./UserProfile.css";
import Loading from "../assets/Loading.gif";

const UserProfile = () => {
    const [loading, setLoading] = useState(false)
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        setLoading(true);
        const response = await UserService.getYourProfile(token);
        setProfileInfo(response.myUsers);
        setLoading(false)
      } catch (error){
        console.error("Error while fetching the Details!", error);
      }
    }
    
    getProfileInfo();
  }, []);
  return (
    <div className="profile-page-container">
        <div className={loading ? "loading-container" : "inactive"}>
        {loading && <img src={Loading} alt="Loading.."/>}
      </div>
      <h2>Profile Information</h2>
      <p>Id: {profileInfo.id}</p>
      <p>Name: {profileInfo.name}</p>
      <p>Email: {profileInfo.email}</p>
      <p>role: {profileInfo.role}</p>
    </div>
  );
};

export default UserProfile;
