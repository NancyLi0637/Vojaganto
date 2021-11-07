import React from "react";

import "./profileinfo.scss";

class ProfileInfo extends React.Component {
  render() {
    const {profileInfo} = this.props;
    return (
      <div className="profile-info-page">
        <div className="profile-avatar-container">
          <img
            className="profile-image"
            src={profileInfo.image}
            alt="profile image"
          />
        </div>
        <div className="profile-text">
          <h1 className="user-nick-name">{profileInfo.name}</h1>
          <h2 className="user-name">{profileInfo.username}</h2>
          <span className="user-content-body">{profileInfo.body}</span>
        </div>
      </div>
    );
  }
}
export default ProfileInfo;
