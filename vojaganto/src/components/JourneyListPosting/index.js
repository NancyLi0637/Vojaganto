import React from "react";
import { Link } from "react-router-dom";

import "./journeylistposting.scss";

class JourneyListPosting extends React.Component {
  render() {
    const posting = this.props.posting;
    return (
      <div className="journey-list-posting">
        <div className="journey-list-posting-text">
          <h3 className="journey-posting-date">
            <b>{posting.date.toString().substring(0, 11)}</b>
          </h3>
          <h5
            className="journey-posting-title"
          >
            {posting.title}
          </h5>
          <h5 className="journey-posting-body">{posting.body}</h5>
        </div>
        <img
          className="journey-list-posting-image"
          src={posting.image.length !== 0 ? posting.image[0] : "noImage"}
          alt="journey"
        />
      </div>
    );
  }
}

export default JourneyListPosting;
