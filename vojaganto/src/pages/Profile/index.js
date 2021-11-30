import React from "react";

import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Map";

import Profile from "components/Profile";

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
          <Profile
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
