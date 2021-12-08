import React from 'react';
import { Redirect } from "react-router-dom";
import Navbar from 'components/Navbar';
import Map from 'components/MapPlugin/Mapp';
import EditPostingView from 'components/Posting/EditPostingView';

import * as action from 'actions/EditPosting';

import "./index.scss";


class EditPostingPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            new: true,
            posting: {
                _id: undefined,
                title: "",
                journey: "",
                date: "",
                destination: "",
                latitude: -1,
                longitude: -1,
                body: "",
                public: false,
                images: [],
                author: this.props.currUser,
            }
        }
    }

    componentDidMount() {
        let pid = this.props.match.params.pid
        if (pid !== undefined) {
            // User is trying to edit the post.
            // Get posting data
            action.setPostingData(this, pid)
        }
    }

    render() {
        const { currUser } = this.props;

        if (!currUser) {
            return <Redirect to="/" />
        }

        if (!this.state.new && currUser && currUser._id !== this.state.posting.author._id) {
            // CurrUser accessing a post that does not belong to him.
            return (
                <div className="page edit-posting-page">
                    <div className="main-view edit-posting-main">
                        <h1>NO ACCESS PERMISSION</h1>

                        <Navbar currUser={currUser} />
                    </div>
                    <div className="map-view edit-posting-map">
                        <Map parent="EditPosting" allPostings={this.state.posting} />
                    </div>
                </div>
            )
        }

        return (
            <div className="page edit-posting-page">
                <div className="main-view edit-posting-main">
                            <EditPostingView
                                currUser={currUser}
                                posting={this.state.posting}
                                handleInputChange={(e) => action.handleInputChange(this, e)}
                                submitPosting={() => action.submitPosting(this)}
                                deletePosting={() => action.deletePosting(this, this.state.posting._id || undefined)}
                                handleImageUpload={(e) => action.handleImageUpload(this, e)}
                                handleDeleteImage={(idx) => action.handleDeleteImage(this, idx)}
                            />


                    <Navbar currUser={currUser} />
                </div>
                <div className="map-view edit-posting-map">
                    <Map parent="EditPosting" allPostings={this.state.posting} enableAddLocation={true} />
                </div>
            </div>
        )
    }
}

export default EditPostingPage;