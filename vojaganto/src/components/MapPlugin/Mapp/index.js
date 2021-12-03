import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
//import map from "./map.png";
//import LocationMarker from "components/MapPlugin/LocationMarker";

import "./style.scss";

class Mapp extends React.Component {
    state = {
        currLoc: null,
        enableAddLocation: false,
        newPosting: null,
        editing: false
    }

    setCurrLoc = (location) => {
        console.log(location)
        this.setState({currLoc: location});
        // console.log("after")
    }

    addMarker = (event, enableAddLocation, allPostings) => {
        if(enableAddLocation){
            console.log("enabled")
            allPostings.latitude = event.latlng.lat
            allPostings.longitude = event.latlng.lng
            this.setState({newPosting: allPostings, editing: true})
        }
    }

    render() {
        const { parent, allPostings, enableAddLocation } = this.props
        const { newPosting } = this.state
        
        return (
            <Map center={[43.662891, -79.395653]} zoom={12} 
            onClick={(e) => {this.addMarker(e, enableAddLocation, allPostings);}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marker for Home page */}
                {parent === "Home" && allPostings.map(allPosting => (
                    allPosting.postings.map(posting => (
                        <Marker
                        key={posting._id}
                        position={[posting.latitude, posting.longitude]}
                        onClick={() => {
                            this.setCurrLoc(posting)
                        }}
                    />
                    ))
                ))}

                {/* Marker for ViewPosting page or EditingPosting if posting exists*/}
                {(parent === "ViewPosting" || (parent === "EditPosting" && !this.state.editing)) && (
                    <Marker
                    key={allPostings._id}
                    position={[
                        allPostings.latitude,
                        allPostings.longitude
                    ]}
                    onClick={() => {
                        this.setCurrLoc(allPostings);
                    }}
                    />
                )}

                {/* Marker for Profile page */}
                {parent === "Profile" && Object.keys(allPostings).map((journey) => (
                    allPostings[journey].journeyPostings.map(posting => (
                        <Marker
                        key={posting._id}
                        position={[posting.latitude, posting.longitude]}
                        onClick={() => {
                            this.setCurrLoc(posting)
                        }}
                    />
                    ))
                ))}

                {/* Add Markfer for new location during editing */}
                {this.state.newPosting && (
                    <Marker
                    key={newPosting._id}
                    position={[
                        newPosting.latitude,
                        newPosting.longitude
                    ]}
                    onClick={() => {
                        this.setCurrLoc(newPosting)
                    }}
                    />
                )}

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