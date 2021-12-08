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
            postingCardColumns: [],
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
                            setSearch={(search) => { action.setHomePostingColumns(this, search) }}
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