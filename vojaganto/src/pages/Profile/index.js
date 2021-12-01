import React from "react";

import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Map";

import ProfileView from "components/Profile/ProfileView";

import "./index.scss";


class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileId: this.props.match.params.uid,
    };
  }

  render() {
    const { currUser, setCurrUser } = this.props;
    return (
      <div className="page profile-page">
        <div className="main-view profile-page-main">
          <ProfileView
            currUser={currUser}
            setCurrUser={setCurrUser}
            profileId={this.props.match.params.uid}
          />
        </div>
        <Navbar currUser={currUser} />
        <div className="map-view edit-posting-map">
          <Map />
        </div>
      </div>
    );
  }
}

export default ProfilePage;
