import React from "react";

import "./profileinfo.scss";

import { getAvatarUrl } from "actions"

class ProfileInfo extends React.Component {
  render() {
    const { profileInfo } = this.props;
    return (
      <div className="profile-info-page">
        <div className="profile-avatar-container">
          <img
            className="profile-image"
            src={getAvatarUrl(profileInfo.avatar)}
            alt="avatar"
          />
        </div>
        <div className="profile-text">
          <h1 className="user-nick-name">{profileInfo.name}</h1>
          <h2 className="user-name">{profileInfo.username}</h2>
          <div className="user-content-body">{profileInfo.description}</div>
        </div>
      </div>
    );
  }
}
export default ProfileInfo;
