import React from 'react';
import PostingCard from 'components/PostingCard';

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
                {this.state.postingCardColumn.postings.map((posting) => (
                    <PostingCard posting={posting}/>
                ))}
            </div>
        );
    }
}

export default PostingCardColumn;