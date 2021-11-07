import React from "react";

import JourneyListPosting from "components/JourneyListPosting";

import "./JourneyList.scss";

class JourneyList extends React.Component {
  render() {
    const postingList = this.props.postingList;
    return (
      <div className="posting-list-page">
        {postingList.map((posting) => (
          <JourneyListPosting
            key={posting.pid}
            className="journey-list-posting"
            posting={posting}
          />
        ))}
      </div>
    );
  }
}
export default JourneyList;
