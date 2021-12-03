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
            enableAddLocation: this.props.enableAddLocation,
            allPostings: this.props.allPostings
        }
    }

    setCurrLoc = (location) => {
        console.log(location)
        this.setState({currLoc: location});
        // console.log("after")
    }

    addMarker = (e) => {
        if(this.state.enableAddLocation){
            const latlong = e.latlng

        }
        
    }

    render() {
        const { parent, allPostings } = this.props
        
        return (
            <Map center={[43.662891, -79.395653]} zoom={12} onClick={this.addMarker}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marker for Home page */}
                {/* {parent === "Home" && this.state.allPostings.map(allPosting => (
                    console.log(this.state.allPostings)
                    // allPosting.postings.map(posting => (
                    //     <Marker
                    //     key={posting._id}
                    //     position={[posting.latitude, posting.longitude]}
                    //     // onClick={() => {
                    //     //     this.setCurrLoc(posting)
                    //     // }}
                    // />
                    // ))
                ))} */}
                {parent === "ViewPosting" && console.log(this.state.allPostings)}

                {/* Marker for ViewPosting page or EditingPosting if posting exists*/}
                {(parent === "ViewPosting" || (parent === "EditPosting" && !this.state.enableAddLocation)) && (
                    <Marker
                    key={this.state.allPostings._id}
                    position={[
                        this.state.allPostings.latitude,
                        this.state.allPostings.longitude
                    ]}
                    onClick={() => {
                        this.setCurrLoc(allPostings)
                    }}
                    />
                )}

                {/* Marker for Profile page */}
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

                {/* {this.state.currLoc && (
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
                )} */}

            </Map>
        )

    }

}

export default Mapp;