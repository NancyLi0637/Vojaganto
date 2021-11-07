import React from 'react';

import PostingCardColumn from "components/PostingCardColumn";

import UserLoginWindow from 'components/LoginRegister/UserLoginWindow';

import "./style.scss";

class HomeView extends React.Component {
    render() {
        const { currUser, setCurrUser } = this.props
        return (
            <div className="home-view">
                <div className="web-header">
                    <h1 className="web-title">
                        Vojaĝanto
                    </h1>

                    <UserLoginWindow
                        currUser={currUser}
                        setCurrUser={setCurrUser}
                    />
                </div>

                <div className="posting-card-columns">
                    {this.props.postingCardColumns.map((postingCardColumn) => (
                        <PostingCardColumn postingCardColumn={postingCardColumn} />
                    ))}
                </div>
            </div>

        );
    }
}

export default HomeView;