import React from "react";

import "./profiletripcategory.scss";

import JourneyList from "components/JourneyList";
import { Link } from "react-router-dom";

class ProfileTripCategory extends React.Component {
  render() {
    const { journey } = this.props

    return (
      <div className="trip-type-component">
        <h3 className="trip-type">
          <Link
            className="trip-journey-link"
            to={"/journey/" + journey._id.toString()}
          >
            {journey.title}
          </Link>
        </h3>
        <JourneyList postingList={journey.journeyPostings || []} />
      </div>
    );
  }
}

export default ProfileTripCategory;
