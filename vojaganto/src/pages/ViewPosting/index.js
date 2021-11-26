import React from 'react';

import Navbar from 'components/Navbar';
import PostingView from 'components/Posting/PostingView';
import Map from 'components/MapPlugin/Map';

import * as action from "actions/EditPosting"

import "./index.scss"

class ViewPostingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pid: this.props.match.params.pid,       // Posting ID
            posting: null                   // Actual posting
        }
    }

    componentDidMount() {
        // Fetch method.
        action.setPostingData(this, this.state.pid)
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