import React from 'react';
import HomeView from "components/Home/HomeView";
import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Map";

import "./style.scss";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postingCardColumns: [],
        };
    }

    render() {
        const { currUser, setCurrUser } = this.props
        return (
            <div className="page home-page">
                <div className="main-view home-main">
                    <HomeView
                        // postingCardColumns={this.state.postingCardColumns}
                        currUser={currUser}
                        setCurrUser={setCurrUser}
                    />

                    <Navbar currUser={currUser} />
                </div>

                <div className="map-view home-map">
                    <Map />
                </div>
            </div>
        )
    }
}

export default HomePage;