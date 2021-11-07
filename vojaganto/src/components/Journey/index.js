import React from "react";

import JourneyList from "components/JourneyList";
import "./journey.scss";

class Journey extends React.Component {
  render() {
    const tripType = this.props.tripType;
    const postingList = this.props.postingList;
    return (
      <div className="journey-page">
        <h1 className="trip-type">{tripType}</h1>
        <div className="journey-list">
          <JourneyList postingList={postingList} />
        </div>
      </div>
    );
  }
}
export default Journey;
