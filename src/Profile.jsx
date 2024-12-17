import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useContext(AppContext);

  return (
    <div className="profile">
      <div className="profile-header">
           <img
          className="profile-img"
          src={user.profilePicture}
          alt={user.name}
        />
      </div>

      <div className="profile-info">
        <h2>{user.name}</h2>
        <p className="username">@{user.username}</p>
        <p><span className="info">Bio:</span><br></br>
        This is a sample bio for {user.name}.</p>
        <p><span className="info">Location:</span><br></br>
        Lemvig, Denmark</p>
        <p><span className="info">Email:</span>
        <br></br> karine@example.com</p>
      </div>
    </div>
  );
};

export default Profile;
