import React from "react";

import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Mapp";

import ProfileView from "components/Profile/ProfileView";
import * as actions from "actions/Profile"

import "./index.scss";


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileId: this.props.match.params.uid,
      profileInfo: {},
      journeys: {}
    };
  }

  componentDidMount() {
    actions.setProfileInfo(this, this.props.profileId)
    actions.setProfileJourneys(this, this.props.profileId)
  }

  render() {
    const { currUser, setCurrUser } = this.props;
    return (
      <div className="page profile-page">
        <div className="main-view profile-page-main">
          {(this.state.profileInfo && this.state.journeys) ?
            <ProfileView
            currUser={currUser}
            setCurrUser={setCurrUser}
            //profileId={this.props.match.params.uid}
            profileInfo={this.state.profileInfo}
            journeys={this.state.journeys}
            />
            : <div className="posting-placeholder">Loading Profile</div>
          }
          {/* <ProfileView
            currUser={currUser}
            setCurrUser={setCurrUser}
            //profileId={this.props.match.params.uid}
            profileInfo={this.state.profileInfo}
            journeys={this.state.journeys}
          /> */}
        </div>
        <Navbar currUser={currUser} />
        <div className="map-view edit-posting-map">
          {(this.state.profileInfo && this.state.journeys) ?
            <Map parent="Profile" allPostings={this.state.journeys}
            />
            : <div className="posting-placeholder">Loading Map</div>
          }
        </div>
      </div>
    );
  }
}

export default ProfilePage;
