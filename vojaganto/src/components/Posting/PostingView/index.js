import React from 'react';
import { Link } from 'react-router-dom';

import "./PostingView.scss"
import { getAvatarUrl, formatDate } from "actions"

class PostingView extends React.Component {

    render() {
        const { currUser, posting } = this.props

        return (
            <div className="posting-view">
                <div className="posting-metadata-container">
                    <h1 className="posting-title">{posting.title}</h1>

                    {
                        // Display Edit Button when the logged-in user is the author of the article.
                        (currUser && String(currUser._id) == String(posting.author._id)) ?
                            <div className="edit-container">
                                <Link to={`/edit/${posting._id}`}>
                                    <button className="edit-btn">Edit</button>
                                </Link>
                            </div>
                            :
                            null
                    }

                    <div className="posting-info-container">
                        <ul className="posting-info">

                            <li className="info-item">
                                <Link className="nav-item" to={"/journey/" + String(posting.journey._id)}>
                                    {posting.journey.title}
                                </Link>
                            </li>
                            <li className="info-item">{formatDate(posting.date)}</li>
                            <li className="info-item">{posting.destination}</li>
                        </ul>
                    </div>

                    <div className="posting-author-container">
                        <div className="posting-author-avatar">
                            <img src={getAvatarUrl(posting.author.avatar)} alt={posting.author.name} />
                        </div>
                        <Link to={`/profile/${String(posting.author._id)}`}><div className="posting-author-name">{posting.author.name}</div></Link>
                    </div>
                </div>


                <div className="posting-image-container">
                    <div className="posting-images">
                        {posting.images.map((img, idx) => {
                            return (
                                <div key={idx} className="posting-image">
                                    <img src={img.url} alt={"image"} />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="posting-body-container">
                    {posting.body.split('\n').map((paragraph, idx) => {
                        return (
                            <p key={idx}>{paragraph} <br /></p>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default PostingView;
