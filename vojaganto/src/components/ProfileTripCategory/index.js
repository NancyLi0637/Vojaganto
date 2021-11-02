import React from "react";

import "./profiletripcategory.scss";

import JourneyList from "components/JourneyList";
import { Link } from "react-router-dom";

class ProfileTripCategory extends React.Component {
  render() {
    const tripType = this.props.tripType;
    const postingList = this.props.postingList;
    return (
      <div className="trip-type-component">
        <h3 className="trip-type">
          <Link className="trip-journey-link" to="/journey/underfined">
            {tripType}
          </Link>
        </h3>
        <JourneyList postingList={postingList} />
      </div>
    );
  }
}

export default ProfileTripCategory;
