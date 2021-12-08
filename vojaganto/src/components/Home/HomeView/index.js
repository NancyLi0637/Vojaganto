import React from 'react';

import PostingCardColumn from "components/Home/PostingCardColumn";

import UserLoginWindow from 'components/LoginRegister/UserLoginWindow';

import "./style.scss";

import { handleInputChange } from 'actions';

class HomeView extends React.Component {
    state = {
        search: "",
        page: 1
    }

    setPage(incr = 1) {
        const nextPage = this.state.page + incr
        this.setState({ page: nextPage })
        this.props.setSearch(this.state.search, nextPage)

    }

    render() {
        const { currUser, setCurrUser, postingCardColumns, setSearch } = this.props
        return (
            <div className="home-view">
                <div className="web-header">
                    <h1 className="web-title">
                        Vojaĝanto
                    </h1>

                    <div className="home-search">
                        <input type="text" className="home-search-input" name="search" placeholder="Search for trips!" onChange={(e) => handleInputChange(this, e)} />
                        <button className="home-search-btn" onClick={() => setSearch(this.state.search, this.state.page)}>Search</button>

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


                <div className="pagination-container">
                    {
                        this.state.page > 1 &&
                        <button className="home-page-btn"
                            onClick={() => this.setPage(-1)}
                        >
                            Previous Page
                        </button>
                    }
                    {
                        postingCardColumns[2].postings.length > 0 &&
                        <button className="home-page-btn"
                            onClick={() => this.setPage(1)}
                        >
                            Next Page
                        </button>
                    }
                </div>

            </div>

        );
    }
}

export default HomeView;