import React from "react";

import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Mapp";

import JourneyView from "components/Journey/JourneyView";
import "./index.scss";

class JourneyPage extends React.Component {
  render() {
    const { currUser } = this.props;
    return (
      <div className="page journey">
        <div className="main-view journey-main-view">
          <JourneyView
            journeyId={this.props.match.params.jid}
            currUser={currUser}
          />
          <Navbar currUser={currUser} />
        </div>
        <div className="map-view edit-posting-map">
          <Map />
        </div>
      </div>
    );
  }
}

export default JourneyPage;
