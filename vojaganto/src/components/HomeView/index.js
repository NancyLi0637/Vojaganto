import React from 'react';

import PostingCardColumn from "components/PostingCardColumn";

import UserLoginWindow from 'components/UserLoginWindow';

import "./style.scss";

class HomeView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            webTitle: this.props.webTitle,
            postingCardColumns: this.props.postingCardColumns,
        };
    }

    render(){
        return(
            <div className="home-view">
                <div className="web-header">
                    <h1 className="web-title">
                        {this.state.webTitle}
                    </h1>

                    <UserLoginWindow />
                </div>

                <div className="posting-card-columns">
                    {this.state.postingCardColumns.map((postingCardColumn) => (
                        <PostingCardColumn postingCardColumn={postingCardColumn}/>
                    ))}
                </div>
            </div>
           
        );
    }
}

export default HomeView;