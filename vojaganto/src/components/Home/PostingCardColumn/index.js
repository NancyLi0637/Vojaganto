import React from 'react';
import PostingCard from 'components/Home/PostingCard';

import "./index.scss"

class PostingCardColumn extends React.Component{
    render(){
        return(
            <div className="posting-card-column">
                {this.props.postingCardColumn.postings.map((posting, idx) => (
                    <PostingCard key={idx} posting={posting}/>
                ))}
            </div>
        );
    }
}

export default PostingCardColumn;