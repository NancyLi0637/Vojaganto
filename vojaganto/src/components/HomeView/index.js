import React from 'react';

import LoginIcon from '@material-ui/icons/AccountCircle';

import PostingCardColumn from "components/PostingCardColumn";

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
                    
                   
                    <div className="login">
                        <button className='login-button'>
                            <LoginIcon />
                            <div className='login-register-text'> LOGIN/REGISTER </div>
                        </button>
                     </div>
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