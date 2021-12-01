import React from "react";
import "./EditJourneyModal.scss";

import { handleInputChange } from "actions";
import { updateJourney, deleteJourney } from "actions/Journey";

class EditJourneyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.journeyId,
            title: this.props.title,
            author: this.props.currUser,
        };
    }

    /**
     * Submit profile updates to server.
     */
    submitJourney() {
        const body = {
            title: this.state.title,
            author: this.state.author,
        }

        updateJourney(this, this.state._id, body)
    }

    deleteJourney() {
        if(window.confirm("Are you sure you want to delete this journey? Your trips will be moved to Unnamed journey.")){
            deleteJourney(this, this.state._id)
        }
    }

    render() {
        const { display, toggleModal } = this.props

        if (!display) {
            // Hide the modal
            return <></>
        } else {
            return (
                <div className="update-journey-modal">
                    <h2 className="update-journey-instruction">Edit Journey</h2>
                    <div className="update-journey-content">

                        <form className="update-journey-form">

                            <div className="update-journey-item">
                                <span className="update-journey-title">
                                    Title
                                </span>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Journey to the West"
                                    onChange={e => handleInputChange(this, e)}
                                    value={this.state.title}
                                />
                            </div>
                            <div className="modal-buttons">
                                <button
                                    type="button"
                                    className="update-journey-btn"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="update-journey-btn"
                                    onClick={() => this.deleteJourney()}
                                >
                                    Delete Journey
                                </button>

                                <button
                                    type="button"
                                    className="update-journey-btn"
                                    id="update-journey-apply"
                                    onClick={this.submitJourney.bind(this)}
                                >
                                    Update
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            );
        }
    }
}
export default EditJourneyModal;
