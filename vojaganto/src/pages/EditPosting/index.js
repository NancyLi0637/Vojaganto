import React from 'react';
import { Redirect } from "react-router-dom";
import Navbar from 'components/Navbar';
import Map from 'components/Map';
import EditPostingView from 'components/EditPostingView';

import { handleInputChange, submitPosting } from 'actions/EditPosting';

import "./index.scss";


const mockPosting = {
    pid: 5,
    title: "Trip to Toronto Trip  Toronto",
    journey: "Journey to Canada",
    date: (new Date()).toLocaleDateString("en-CA"),
    destination: "Toronto, ON, Canada",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
        "https://images.dailyhive.com/20191023094158/DqJwDvUWwAICGuS-1.jpeg",
        "https://www-cdn.icef.com/wp-content/uploads/2021/02/icef-toronto-2022.png?x48335",
    ],
    public: true,
    author: {
        uid: 0,
        username: "user",
        name: "User Doe"
    }
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

    render() {
        const { currUser } = this.props;

        if (!currUser){
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
                    />

                    <Navbar currUser={currUser} />
                </div>
                <div className="map-view edit-posting-map">
                    <Map />
                </div>
            </div>
        )
    }
}

export default EditPostingPage;