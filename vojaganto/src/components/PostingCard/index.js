import React from 'react';
import {Link} from 'react-router-dom';
import "./style.scss";

class PostingCard extends React.Component{
    render(){
        const postingCard = this.props.postingCard

        return(
            <Link to={"/trip/" + postingCard.pid}>
                <div className="posting-card">
                    <div className='posting-info-container'>
                        <ul className="posting-info">
                            <li className="posting-title">{postingCard.title}</li>
                            <li className="posting-date">{postingCard.date}</li>
                        </ul>
                    </div>

                    <img 
                        className="posting-cover"
                        src={postingCard.image}
                        alt="no image"
                    />
                </div>
            </Link>
           
        );
    }
}

export default PostingCard;

