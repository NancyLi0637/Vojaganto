import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
//import map from "./map.png";
//import LocationMarker from "components/MapPlugin/LocationMarker";
import { formatDate } from 'actions';

import marker1 from "assets/MapMarkers/marker-black.png"
import marker2 from "assets/MapMarkers/marker-blue.png"
import marker3 from "assets/MapMarkers/marker-green.png"
import marker4 from "assets/MapMarkers/marker-purple.png"
import marker5 from "assets/MapMarkers/marker-red.png"
import marker6 from "assets/MapMarkers/marker-yellow.png"

import "./style.scss";

export const icons = [marker1, marker2, marker3, marker4, marker5, marker6].map((marker) => new Icon({ iconUrl: marker, iconSize: [40, 40] }))


class Mapp extends React.Component {
    state = {
        currLoc: null,
        enableAddLocation: false,
        newPosting: null,
        editing: false
    }

    setCurrLoc = (location) => {
        console.log(location)
        this.setState({ currLoc: location });
        // console.log("after")
    }

    addMarker = (event, enableAddLocation, allPostings) => {
        if (enableAddLocation) {
            console.log("enabled")
            allPostings.latitude = event.latlng.lat
            allPostings.longitude = event.latlng.lng
            this.setState({ newPosting: allPostings, editing: true })
        }
    }

    render() {
        const { parent, allPostings, enableAddLocation } = this.props
        const { newPosting } = this.state

        return (
            <Map center={[43.662891, -79.395653]} zoom={12}
                onClick={(e) => { this.addMarker(e, enableAddLocation, allPostings); }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* <div classname='location'>
                    <button classname='location-button'>Toronto, ON,</button>
                </div> */}

                {/* Marker for Home page */}
                {parent === "Home" && allPostings.map((allPosting, i) => (
                    allPosting.postings.map((posting, j) => (
                        <Marker
                            key={posting._id}
                            position={[posting.latitude, posting.longitude]}
                            onClick={() => {
                                this.setCurrLoc(posting)
                            }}
                            icon={icons[(i + j) % icons.length]}
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
                        icon={icons[0]}
                    />
                )}

                {/* Marker for Profile page */}
                {parent === "Profile" && Object.keys(allPostings).map((journey, i) => (
                    allPostings[journey].journeyPostings.map(posting => (
                        <Marker
                            key={posting._id}
                            position={[posting.latitude, posting.longitude]}
                            onClick={() => {
                                this.setCurrLoc(posting)
                            }}
                            icon={icons[i % icons.length]}
                        />
                    ))
                ))}

                {/* Marker for Journey Page */}
                {parent === "JourneyPosting" && allPostings.map((posting, i) => (
                    <Marker
                        key={posting._id}
                        position={[
                            posting.latitude,
                            posting.longitude
                        ]}
                        onClick={() => {
                            this.setCurrLoc(posting);
                        }}
                        icon={icons[i % icons.length]}
                    />
                ))}

                {/* Add Marker for new location during editing */}
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
                        icon={icons[0]}
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
                            <p>{formatDate(this.state.currLoc.date)}</p>
                        </div>

                    </Popup>
                )}

            </Map>
        )

    }

}

export default Mapp;