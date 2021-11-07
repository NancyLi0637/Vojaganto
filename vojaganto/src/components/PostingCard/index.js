import React from 'react';
import "./style.scss";

class PostingCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postingTitle: this.props.postingCard.title,
            postingDate: this.props.postingCard.date,
            postingCover: this.props.postingCard.image,
        };
    }

    render(){
        return(
            <div className="posting-card">
                <div className='posting-info-container'>
                    <ul className="posting-info">
                        <li className="posting-title">{this.state.postingTitle}</li>
                        <li className="posting-date">{this.state.postingDate}</li>
                    </ul>
                </div>

                <img 
                    className="posting-cover"
                    src={this.state.postingCover}
                    alt="no image"
                />
            </div>
        );
    }
}

export default PostingCard;

