import React from "react";

import JourneyList from "components/JourneyList";
import "./journey.scss";

import { setJourney } from "actions/Journey"

class Journey extends React.Component {
  state = {
    _id: this.props.journeyId,
    journeyPostings: [],
    title: "",
  }

  componentDidMount(){
    setJourney(this, this.state._id)
  }

  render() {
    return (
      <div className="journey-page">
        <h1 className="trip-type">{this.state.title}</h1>
        <div className="journey-list">
          <JourneyList postingList={this.state.journeyPostings} />
        </div>
      </div>
    );
  }
}
export default Journey;
