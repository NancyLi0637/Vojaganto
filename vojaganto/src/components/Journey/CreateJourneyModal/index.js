import React from "react";
import "./CreateJourneyModal.scss";

import { handleInputChange } from "actions";
import { createJourney } from "actions/Journey";

class CreateJourneyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
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

        createJourney(this, body)
    }

    render() {
        const { display, toggleModal } = this.props

        if (!display) {
            // Hide the modal
            return <></>
        } else {
            return (
                <div className="create-journey-modal">
                    <h2 className="create-journey-instruction">New Journey</h2>
                    <div className="create-journey-content">

                        <form className="create-journey-form">

                            <div className="create-journey-item">
                                <span className="create-journey-title">
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
                                    className="create-journey-btn"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="create-journey-btn"
                                    id="create-journey-apply"
                                    onClick={this.submitJourney.bind(this)}
                                >
                                    Create
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            );
        }
    }
}
export default CreateJourneyModal;
