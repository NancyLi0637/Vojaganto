import React from "react";

import JourneyList from "components/Journey/JourneyList";
import EditJourneyModal from "../EditJourneyModal";
import "./journey.scss";

// import { setJourney } from "actions/Journey"

class Journey extends React.Component {
  state = {
    // _id: this.props.journeyId,
    // journeyPostings: [],
    // title: "",
    // author: null,
    displayEditModal: false
  }

  // componentDidMount() {
  //   setJourney(this, this.state._id)
  // }


  toggleEditModal() {
    this.setState({
      displayEditModal: !this.state.displayEditModal
    })
  }

  render() {
    const { currUser } = this.props

    return (
      <div className="journey-page">
        <div className="journey-meta">
          <h1 className="trip-type">{this.props.title}</h1>

          {
            currUser && this.props.author && (String(currUser._id) === String(this.props.author) || String(currUser._id) === String(this.props.author._id)) ?
              <div>
                <button className="edit-journey-btn" onClick={() => this.toggleEditModal()}>Edit</button>
                <EditJourneyModal
                  display={this.state.displayEditModal}
                  toggleModal={() => this.toggleEditModal()}
                  title={this.props.title}
                  journeyId={this.props.journeyId}
                  currUser={currUser}
                />
              </div>


              : <></>
          }
        </div>

        <div className="journey-list">
          <JourneyList postingList={this.props.journeyPostings} />
        </div>
      </div>
    );
  }
}
export default Journey;
