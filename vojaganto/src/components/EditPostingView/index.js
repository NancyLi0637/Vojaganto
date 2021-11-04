import React from 'react';

import Editor from 'components/Editor';

import "./EditPostingView.scss"


class EditPostingView extends React.Component {
    constructor(props) {
        super(props)
    }

    
    render() {
        const { currUser, posting, handleInputChange, submitPosting } = this.props

        return (
            <div className="edit-posting-view">
                <form className="posting-form" id="postingForm" >

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
                            <input type="text"
                                name="journey"
                                className="edit-meta edit-input"
                                id="postingJourneyInput"
                                placeholder="JOURNEY"
                                onChange={handleInputChange}
                                value={posting.journey}
                            />
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
                        <div className="posting-images">
                            <input type="file"
                                name="image"
                                className="edit-input edit-image-upload-btn"
                                multiple
                            />
                        </div>
                    </div>

                    <div className="edit-body-container">
                        <Editor body={posting.body} handleChange={handleInputChange} />
                    </div>

                    <div className="edit-control-container">
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
