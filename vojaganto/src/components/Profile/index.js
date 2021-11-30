import React from "react";
import ProfileInfo from "components/ProfileInfo";
import ProfileTripCategory from "components/ProfileTripCategory";
import ProfileEditorPrompt from "components/ProfileEditorModal";
import "./profile.scss";

import { setProfileInfo, setProfileJourneys } from "actions/Profile"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
      profileInfo: {},
      journeys: {}
    };
  }

  componentDidMount() {
    setProfileInfo(this, this.props.profileId)
    setProfileJourneys(this, this.props.profileId)
  }

  toggleEditProfile = () => {
    this.setState({
      editProfile: !this.state.editProfile,
    });
  };

  render() {
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
          Object.keys(this.state.journeys).map((journey) => {
            return (
              <ProfileTripCategory
                key={journey}
                journey={this.state.journeys[journey]}
              />
            );
          })
        }


      </div>
    );
  }
}
export default Profile;
