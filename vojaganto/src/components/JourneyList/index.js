import React from "react";

import JourneyListPosting from "components/JourneyListPosting";
import { Link } from "react-router-dom";
import "./JourneyList.scss";

class JourneyList extends React.Component {
  render() {
    const postingList = this.props.postingList;
    return (
      <div className="posting-list-page">
        {postingList.map((posting, idx) => (
          <Link
            key={idx}
            className="journey-posting-link"
            to={"/trip/" + posting._id.toString()}
          >
            <JourneyListPosting
              key={posting._id}
              posting={posting}
            />
          </Link>
        ))}
      </div>
    );
  }
}
export default JourneyList;
