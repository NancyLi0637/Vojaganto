import React from 'react';
import { Redirect } from "react-router-dom";
import Navbar from 'components/Navbar';
import Map from 'components/MapPlugin/Map';
import EditPostingView from 'components/Posting/EditPostingView';

import * as action from 'actions/EditPosting';

import "./index.scss";

import avatar from 'assets/images/66385278_p8.jpg';
import img1 from 'assets/images/home/pic1.jpg';
import img2 from 'assets/images/home/pic3.jpg';


const emptyPosting = {
    title: "",
    journey: "",
    date: "",
    destination: "",
    body: "",
    public: false,
    images: []
}


class EditPostingPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            new: true,
            posting: {
                ...emptyPosting,
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
            
            // this.setState({
            //     new: false,
            //     posting: {
            //         ...mockPosting,
            //     }
            // })
        } else {
            // User is trying to create a new post
            this.setState({
                new: true,
                posting: {
                    ...emptyPosting,
                    author: this.props.currUser,
                }
            })
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
                        <Map />
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
                    <Map enableAddLocation={true} />
                </div>
            </div>
        )
    }
}

export default EditPostingPage;