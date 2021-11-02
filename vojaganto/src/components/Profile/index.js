import React from "react";
import { Link } from "react-router-dom";
import ProfileInfo from "components/ProfileInfo";
import ProfileTripCategory from "components/ProfileTripCategory";
import "./profile.scss";

class Profile extends React.Component {


  render() {
    const profileInfo = this.props.profileInfo;
    const tripType = this.props.tripType;
    const postingList = this.props.postingList;

    return (
      <div className="profile-page">
        <div className="edit-profile-container">
          <button className="edit-profile">
             {/*TODO: Replace this with a prompt for editing profile, this should not be to /edit */}
            Edit Profile
          </button>
        </div>
        <ProfileInfo
          className="profile-information"
          profileInfo={profileInfo}
        />
        {tripType.map((tripType) => {
          return (
            <ProfileTripCategory
              tripType={tripType}
              postingList={postingList[tripType]}
            />
          );
        })}
      </div>
    );
  }
}
export default Profile;
