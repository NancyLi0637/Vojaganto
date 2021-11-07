import React from 'react';
import "./style.scss";

class PostingCard extends React.Component{
    render(){
        const postingCard = this.props.postingCard;

        return(
            <div className="posting-card">
                <img 
                    className="posting-cover"
                    src={postingCard}
                    alt="no image"
                />
            </div>
        );
    }
}

export default PostingCard;

