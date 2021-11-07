import React from 'react';

import Navbar from 'components/Navbar';
import PostingView from 'components/Posting/PostingView';

import Map from 'components/MapPlugin/Map';

import "./index.scss"

// TODO: a mock data
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

class ViewPostingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pid: this.props.match.params.pid,       // Posting ID
            posting: null                   // Actual posting
        }
    }

    componentDidMount() {
        // TODO: fetch method.
        this.setState({ posting: mockPosting })
    }

    render() {
        const { currUser } = this.props

        return (
            <div className="page view-posting-page">
                <div className="main-view view-posting-main">
                    {this.state.posting ?
                        <PostingView posting={this.state.posting} currUser={currUser} />
                        : <div className="posting-placeholder">Loading Posting</div>
                    }

                    <Navbar currUser={currUser} />
                </div>
                <div className="map-view view-posting-map">
                    <Map />
                </div>
            </div>
        )
    }
}

export default ViewPostingPage;