import React from "react";
import ProfileInfo from "components/ProfileInfo";
import ProfileTripCategory from "components/ProfileTripCategory";
import ProfileEditorPrompt from "components/ProfileEditorModal";
import "./profile.scss";

import { setProfileInfo } from "actions/Profile"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
      profileInfo: {},
    };
  }

  componentDidMount() {
    setProfileInfo(this, this.props.profileId)
  }

  toggleEditProfile = () => {
    this.setState({
      editProfile: !this.state.editProfile,
    });
  };

  render() {
    const tripType = this.props.tripType;
    const postingList = this.props.postingList;
    // const setCurrUser = this.props.setCurrUser;

    const { currUser } = this.props;

    return (

      <div className="profile-view">
        {
          currUser && currUser._id == this.props.profileId ?
            <div className="edit-profile-container">
              <button className="edit-profile" onClick={this.toggleEditProfile}>
                Edit Profile
              </button>

              <ProfileEditorPrompt
                className="edit-profile-prompt"
                display={this.state.editProfile}
                toggleEditProfile={this.toggleEditProfile}
                profileInfo={this.state.profileInfo}
              />
            </div>
            : <></>
        }

        <ProfileInfo
          className="profile-information"
          profileInfo={this.state.profileInfo}
        />
        {
          tripType.map((tripType) => {
            return (
              <ProfileTripCategory
                key={tripType}
                tripType={tripType}
                postingList={postingList[tripType]}
              />
            );
          })
        }


      </div>
    );
  }
}
export default Profile;
