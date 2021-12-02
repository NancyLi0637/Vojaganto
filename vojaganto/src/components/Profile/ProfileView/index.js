import React from "react";
import ProfileInfo from "components/Profile/ProfileInfo";
import ProfileJourneys from "components/Profile/ProfileJourneys";
import ProfileEditorModal from "components/Profile/ProfileEditorModal";
import CreateJourneyModal from "components/Journey/CreateJourneyModal";

import "./profile.scss";

// import { setProfileInfo, setProfileJourneys } from "actions/Profile"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false,
      createJourney: false,
      // profileInfo: {},
      // journeys: {}
    };
  }

  // componentDidMount() {
  //   setProfileInfo(this, this.props.profileId)
  //   setProfileJourneys(this, this.props.profileId)
  // }

  toggleEditProfile = () => {
    this.setState({
      editProfile: !this.state.editProfile,
    });
  };

  toggleCreateJourney = () => {
    this.setState({
      createJourney: !this.state.createJourney,
    });
  };

  render() {
    const { currUser, profileInfo, journeys } = this.props;

    return (

      <div className="profile-view">
        {
          currUser && String(currUser._id) === String(this.props.profileId) ?
            <div className="edit-profile-container">
              <button className="edit-profile" onClick={this.toggleEditProfile}>
                Edit Profile
              </button>

              <ProfileEditorModal
                className="edit-profile-prompt"
                display={this.state.editProfile}
                toggleEditProfile={this.toggleEditProfile}
                profileInfo={profileInfo}
              />
            </div>
            : <></>
        }

        <ProfileInfo
          className="profile-information"
          profileInfo={profileInfo}
        />

        {
          currUser && String(currUser._id) === String(this.props.profileId) ?
            <div className="new-journey-container">
              <button className="new-journey-btn" onClick={this.toggleCreateJourney}>
                New Journey
              </button>

              <CreateJourneyModal
                className="new-journey-prompt"
                display={this.state.createJourney}
                toggleModal={this.toggleCreateJourney}
                currUser={currUser}
              />
            </div>
            : <></>
        }
        
        {
          Object.keys(journeys).map((journey) => {
            return (
              <ProfileJourneys
                key={journey}
                journey={journeys[journey]}
              />
            );
          })
        }


      </div>
    );
  }
}
export default Profile;
