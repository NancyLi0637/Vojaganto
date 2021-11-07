import React from "react";
import ProfileInfo from "components/ProfileInfo";
import ProfileTripCategory from "components/ProfileTripCategory";
import ProfileEditorPrompt from "components/ProfileEditorPrompt";
import "./profile.scss";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
    };
  }

  toggleEditProfile = () => {
    this.setState({
      editProfile: !this.state.editProfile,
    });
  };

  render() {
    const profileInfo = this.props.profileInfo;
    const tripType = this.props.tripType;
    const postingList = this.props.postingList;
    const applyEdition = this.props.applyEdition;
    const setCurrUser = this.props.setCurrUser;

    return (
      <div className="profile-page">
        <div className="edit-profile-container">
          <button className="edit-profile" onClick={this.toggleEditProfile}>
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
              key={tripType}
              tripType={tripType}
              postingList={postingList[tripType]}
            />
          );
        })}

        <ProfileEditorPrompt
          className="edit-profile-prompt"
          openModal={this.state.editProfile}
          profileInfo={profileInfo}
          toggleEditProfile={this.toggleEditProfile}
          applyEdition={applyEdition}
        />
        <button
          className="user-logout"
          onClick={() => setCurrUser({ currUser: null })}
        >
          Log out
        </button>
      </div>
    );
  }
}
export default Profile;
