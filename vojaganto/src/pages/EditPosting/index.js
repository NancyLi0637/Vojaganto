import React from 'react';
import Navbar from 'components/Navbar';

import EditPostingView from 'components/EditPostingView';

import "./index.scss";

class EditPostingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posting: {
                title: "",
                date: "",
                author: this.props.currUser,
                destination: "",
                journey: "",
                body: "",
                images: []
            }
        }
    }
    render() {
        const { currUser } = this.props;
        return (
            <div className="page edit-posting-page">
                <div className="main-view edit-posting-main">
                    <EditPostingView currUser={currUser} posting={this.state.posting} />

                    <Navbar />
                </div>
                <div className="map-view edit-posting-map">

                </div>
            </div>
        )
    }
}

export default EditPostingPage;