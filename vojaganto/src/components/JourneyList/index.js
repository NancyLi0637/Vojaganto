import React from "react";

import JourneyListPosting from "components/JourneyListPosting";

import "./JourneyList.scss";

class JourneyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postingList: this.props.postingList,
    };
  }

  render() {
    return (
      <div className="posting-list-page">
        {this.state.postingList.map((posting) => (
          <JourneyListPosting
            className="journey-list-posting"
            posting={posting}
          />
        ))}
      </div>
    );
  }
}
export default JourneyList;
