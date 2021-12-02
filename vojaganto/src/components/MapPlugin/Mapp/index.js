import { Popup } from 'leaflet';
import React from 'react';
import {Map, TileLayer, Marker} from 'react-leaflet';
//import map from "./map.png";
//import LocationMarker from "components/MapPlugin/LocationMarker";

import "./style.scss";

class Mapp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currLoc: null,
        }
    }

    setCurrLoc = (location) => {
        console.log(location)
        this.setState({currLoc: location});
        // console.log("after")
    }

    render() {
        const { parent, allPostings } = this.props
        
        return (
            <Map center={[43.662891, -79.395653]} zoom={12}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {parent === "ViewPosting" && (
                    <Marker
                    key={allPostings._id}
                    position={[
                        allPostings.latitude,
                        allPostings.longitude
                    ]}
                    onClick={() => {
                        this.setCurrLoc(allPostings)
                    }}
                    />
                )}

                {parent === "Home" && allPostings.map(allPosting => (
                    allPosting.postings.map(posting => (
                        <Marker
                        key={posting._id}
                        position={[posting.latitude, posting.longitude]}
                        // onClick={() => {
                        //     this.setCurrLoc(posting)
                        // }}
                    />
                    ))
                ))}

                {parent === "Profile" && Object.keys(allPostings).map((journey) => (
                    allPostings[journey].journeyPostings.map(posting => (
                        <Marker
                        key={posting._id}
                        position={[posting.latitude, posting.longitude]}
                        // onClick={() => {
                        //     this.setCurrLoc(posting)
                        // }}
                    />
                    ))
                ))}

                {this.state.currLoc && (
                    <Popup
                        position={[
                            this.state.currLoc.latitude,
                            this.state.currLoc.longitude
                        ]}
                        onClose={() => {
                            this.setCurrLoc(null);
                        }}
                    >
                        <div>
                            <h2>{this.state.currLoc.title}</h2>
                            <p>{this.state.currLoc.date}</p>
                        </div>

                    </Popup>
                )}

            </Map>
        )

    }

}

export default Mapp;