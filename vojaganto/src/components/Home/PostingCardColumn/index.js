import React from 'react';
import PostingCard from 'components/Home/PostingCard';

class PostingCardColumn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            postingCardColumn: this.props.postingCardColumn,
        };
    }
    render(){
        return(
            <div className="posting-card-column-page">
                {this.state.postingCardColumn.postings.map((posting, idx) => (
                    <PostingCard key={idx} posting={posting}/>
                ))}
            </div>
        );
    }
}

export default PostingCardColumn;