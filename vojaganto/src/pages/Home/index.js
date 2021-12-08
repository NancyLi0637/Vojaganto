import React from 'react';
import HomeView from "components/Home/HomeView";
import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Mapp";
import * as action from "actions/Posting"
//import { setHomePostingColumns } from 'actions/Posting'

import "./style.scss";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postingCardColumns: [{ postings: [] }, { postings: [] }, { postings: [] }],
            
        };
    }

    componentDidMount() {
        // UpdatePostingCardColumns
        action.setHomePostingColumns(this, "")
    }

    render() {
        const { currUser, setCurrUser } = this.props
        return (
            <div className="page home-page">
                <div className="main-view home-main">
                
                    {this.state.postingCardColumns ?
                        <HomeView
                            postingCardColumns={this.state.postingCardColumns}
                            currUser={currUser}
                            setCurrUser={setCurrUser}
                            setSearch={(search, page) => { action.setHomePostingColumns(this, search, page) }}
                        />

                        : <div className="posting-placeholder">Loading Posting</div>
                    }

                    <Navbar currUser={currUser} />
                </div>

                <div className="map-view home-map">
                    {this.state.postingCardColumns ?
                        <Map parent="Home" allPostings={this.state.postingCardColumns}
                        />
                        : <div className="posting-placeholder">Loading Map</div>
                    }
                </div>
            </div>
        )
    }
}

export default HomePage;