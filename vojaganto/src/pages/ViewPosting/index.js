import React from 'react';

import Navbar from 'components/Navbar';
import PostingView from 'components/ViewPosting/PostingView';

import "./index.scss"
// TODO: a mock data
const mockPosting = {
    pid: 5,
    title: "Trip to Toronto",
    author: {
        uid: 10,
        username: "rainyuxuan",
        name: "Liu Yuxuan"
    },
    journey: {
        jid: 1,
        title: "Journey to Canada"
    },
    date: (new Date()).toLocaleDateString("en-CA"),
    destination: "Toronto, ON, Canada",
    body: "This is my trip to Toronto!",
    images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
        "https://images.dailyhive.com/20191023094158/DqJwDvUWwAICGuS-1.jpeg",
        "https://www-cdn.icef.com/wp-content/uploads/2021/02/icef-toronto-2022.png?x48335",
    ]
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
        // const { currUser } = this.props

        return (
            <div className="page view-posting-page">
                <div className="main-view view-posting-main">
                    {this.state.posting ?
                        <PostingView posting={this.state.posting} />
                        : <div className="posting-placeholder">Loading Posting</div>
                    }

                    <Navbar />
                </div>
                <div className="map-view view-posting-map">
                    {/* TODO: */}
                </div>
            </div>
        )
    }
}

export default ViewPostingPage;