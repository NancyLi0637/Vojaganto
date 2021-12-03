import React from "react";

import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Mapp";

import JourneyView from "components/Journey/JourneyView";
import * as actions from "actions/Journey"
import "./index.scss";


class JourneyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journeyId: this.props.match.params.jid,
      journeyPostings: [],
      title: "",
      author: null,
    };
  }

  componentDidMount() {
    actions.setJourney(this, this.state._id)
  }

  render() {
    const { currUser } = this.props;
    return (
      <div className="page journey">
        <div className="main-view journey-main-view">
          {(this.state.journeyId && this.state.journeyPostings && this.state.author && this.state.title) ?
            <JourneyView
            journeyId={this.state.journeyId}
            journeyPostings={this.state.journeyPostings}
            title={this.state.title}
            author={this.state.author}
            currUser={currUser}
            />
            : <div className="posting-placeholder">Loading Journey</div>
          }
          
          <Navbar currUser={currUser} />
        </div>
        <div className="map-view edit-posting-map">
          {(this.state.journeyPostings) ?
            <Map parent="JourneyPosting" allPostings={this.state.journeyPostings}
            />
            : <div className="posting-placeholder">Loading Map</div>
          }
        </div>
      </div>
    );
  }
}

export default JourneyPage;
