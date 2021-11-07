import React from 'react';
import { Redirect } from "react-router-dom";
import Navbar from 'components/Navbar';
import Map from 'components/MapPlugin/Map';
import EditPostingView from 'components/Posting/EditPostingView';

import { handleInputChange, handleImageUpload, handleDeleteImage, submitPosting, deletePosting } from 'actions/EditPosting';

import "./index.scss";

import avatar from 'assets/images/66385278_p8.jpg';
import img1 from 'assets/images/home/pic1.jpg';
import img2 from 'assets/images/home/pic3.jpg';
const mockPosting = {
    pid: 5,
    title: "Trip to Toronto",
    author: {
        uid: 0,
        username: "user",
        name: "User Doe",
        avatar: avatar
    },
    journey: {
        _id: 1,
        title: "Journey to Canada"
    },
    date: (new Date()).toLocaleDateString("en-CA"),
    destination: "Toronto, ON, Canada",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    images: [img1, img2]
}

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
            this.setState({
                new: false,
                posting: {
                    ...mockPosting,
                }
            })
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

    deletePosting() {
        console.log("DELETED POSTING id=",  "new posting")
    }

    render() {
        const { currUser } = this.props;

        if (!currUser) {
            return <Redirect to="/" />
        }

        if (!this.state.new && currUser && currUser.uid !== this.state.posting.author.uid) {
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
                        handleInputChange={(e) => handleInputChange(this, e)}
                        submitPosting={() => submitPosting(this)}
                        deletePosting={() => deletePosting(this, this.state.posting.pid || undefined)}
                        handleImageUpload={(e) => handleImageUpload(this, e)}
                        handleDeleteImage={(idx) => handleDeleteImage(this, idx)}
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