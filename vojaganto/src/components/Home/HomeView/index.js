import React from 'react';

import PostingCardColumn from "components/Home/PostingCardColumn";

import UserLoginWindow from 'components/LoginRegister/UserLoginWindow';

import "./style.scss";

import { handleInputChange } from 'actions';
import { setHomePostingColumns } from 'actions/Posting'

class HomeView extends React.Component {
    // state = {
    //     postingCardColumns: this.props.postingCardColumns,
    //     //search: ""
    // }

    // componentDidMount() {
    //     // TODO: UpdatePostingCardColumns
    //     setHomePostingColumns(this, this.state.search)
    // }

    render() {
        const { currUser, setCurrUser, postingCardColumns } = this.props
        return (
            <div className="home-view">
                <div className="web-header">
                    <h1 className="web-title">
                        Vojaĝanto
                    </h1>

                    <div className="home-search">
                        <input type="text" className="home-search-input" name="search" placeholder="Search for trips!" onChange={(e) => handleInputChange(this, e)} />
                        {/* <button className="home-search-btn" onClick={() => setHomePostingColumns(this, this.state.search)}>Search</button> */}
                        
                    </div>

                    <UserLoginWindow
                        currUser={currUser}
                        setCurrUser={setCurrUser}
                    />
                </div>

                <div className="posting-card-columns">
                    {postingCardColumns.map((postingCardColumn, idx) => (
                        <PostingCardColumn key={idx} postingCardColumn={postingCardColumn} />
                    ))}
                </div>
            </div>

        );
    }
}

export default HomeView;