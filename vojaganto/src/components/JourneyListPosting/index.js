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
            {posting.date.toString().substring(0, 11)}
          </h3>
          <h4
            className="journey-posting-title"
          >
            {posting.title}
          </h4>
          <p className="journey-posting-body">{posting.body}</p>
        </div>
        <div className="journey-list-posting-image-container">
          {
            posting.image.length > 0 ?
              <img
                className="journey-list-posting-image"
                src={posting.image[0]}
                alt="journey"
              />
              : null
          }
        </div>


      </div>
    );
  }
}

export default JourneyListPosting;
