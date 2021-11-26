import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss";

class PostingCard extends React.Component {
    render() {
        const posting = this.props.posting

        return (
            <Link to={"/trip/" + posting._id}>
                <div className="posting-card">
                    <div className='posting-info-container'>
                        <h3 className="posting-info posting-title">{posting.title}</h3>
                        <div className="posting-info posting-date">{posting.date}</div>
                    </div>

                    <img
                        className="posting-cover"
                        src={posting.images[0]}
                        alt=""
                    />
                </div>
            </Link>

        );
    }
}

export default PostingCard;

