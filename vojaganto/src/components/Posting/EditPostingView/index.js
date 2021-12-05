import React from 'react';

import Editor from 'components/Posting/Editor';

import "./EditPostingView.scss"

import { getUserJourneys } from "actions/EditPosting"


class EditPostingView extends React.Component {
    state = {
        userJourneys: []
    }


    componentDidMount() {
        getUserJourneys(this, this.props.currUser._id)
    }

    render() {
        const { currUser, posting, handleInputChange, handleImageUpload, submitPosting, deletePosting, handleDeleteImage } = this.props

        return (
            <div className="edit-posting-view">
                <form className="posting-form" id="postingForm" >
                    {/* <datalist id="user-journeys">
                        {
                            this.state.userJourneys.map((journey, i) => {
                                return (
                                    <option key={i} value={journey._id}>{journey.title}</option>
                                )
                            })
                        }
                    </datalist> */}

                    <div className="edit-metadata-container">
                        <input type="text"
                            name="title"
                            className="edit-title edit-input"
                            id="postingTitleInput"
                            placeholder="TITLE"
                            onChange={handleInputChange}
                            value={posting.title}
                        />

                        <div className="posting-info-container">
                            {/* <input type="text"
                                name="journey"
                                className="edit-meta edit-input"
                                list="user-journeys"

                                id="postingJourneyInput"
                                placeholder="JOURNEY"
                                onChange={handleInputChange}
                                value={posting.journey.title || posting.journey}
                            /> */}
                            <select
                                name="journey"
                                className="edit-meta edit-input"
                                placeholder="My Journey"
                                // onChange={handle}
                            >
                                {
                                    this.state.userJourneys.map((journey, i) => {
                                        return (
                                            <option key={i} value={journey._id}>{journey.title}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="date"
                                name="date"
                                className="edit-meta edit-input"
                                id="postingDateInput"
                                onChange={handleInputChange}
                                value={posting.date}
                            />
                            <input type="text"
                                name="destination"
                                className="edit-meta edit-input"
                                id="postingDestinationInput"
                                placeholder="DESTINATION"
                                onChange={handleInputChange}
                                value={posting.destination}
                            />
                        </div>
                    </div>

                    <div className="edit-image-container">
                        <div className="add-image-container">
                            <input type="file"
                                name="image"
                                className="edit-input edit-image-upload-btn"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </div>
                        <div className="posting-images">

                            {posting.images.map((img, idx) => {
                                return (
                                    <div key={idx} className="posting-image">
                                        <button type="button" className="img-del-btn" onClick={() => handleDeleteImage(idx)}>delete</button>
                                        <img src={img} alt={img} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="edit-body-container">
                        <Editor body={posting.body} handleChange={handleInputChange} />
                    </div>

                    <div className="edit-control-container">
                        <button type="button" className="edit-delete-btn" onClick={deletePosting}>DELETE</button>

                        <div className="edit-public-container">
                            <input type="checkbox"
                                name="public"
                                className="edit-public-checkbox"
                                id="postingPublicInput"
                                onChange={handleInputChange}
                                checked={posting.public}
                            /> <span>Public</span>
                        </div>
                        <button type="button" className="edit-post-btn" onClick={submitPosting}>POST</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditPostingView;
