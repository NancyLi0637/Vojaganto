import React from "react";

import "./journeylistposting.scss";
import { getAvatarUrl, formatDate, getImageUrl } from "actions"


class JourneyListPosting extends React.Component {
  render() {
    const posting = this.props.posting;
    return (
      <div className="journey-list-posting">
        <div className="journey-list-posting-text">
          <h3 className="journey-posting-date">
            {formatDate(posting.date)}
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
            posting.images.length > 0 &&
              <img
                className="journey-list-posting-image"
                src={posting.images[0] && posting.images[0].url}
                alt="journey"
              />
          }
        </div>


      </div>
    );
  }
}

export default JourneyListPosting;
