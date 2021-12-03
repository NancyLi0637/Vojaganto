import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon } from "leaflet";
//import map from "./map.png";
//import LocationMarker from "components/MapPlugin/LocationMarker";

import "./style.scss";

export const icons = [
    new Icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/800px-Map_pin_icon_green.svg.png",
    iconSize: [25, 25]
  }),
    new Icon({
    iconUrl: "https://www.clipartmax.com/png/full/86-869339_yellow-map-marker-png.png",
    iconSize: [25, 25]
  }),
    new Icon({
    iconUrl: "http://www.clker.com/cliparts/1/K/0/V/P/H/map-pin-pink.svg.hi.png",
    iconSize: [25, 25]
  }),
];


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

                {/* <div classname='location'>
                    <button classname='location-button'>Toronto, ON,</button>
                </div> */}

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
                        // don't know how to loop index
                        // icon={icons[0]}
                    />
                    ))
                ))}

                {/* Marker for Journey Page */}
                {parent === "JourneyPosting" && allPostings.map(allPosting => (
                    <Marker
                    key={allPosting._id}
                    position={[
                        allPosting.latitude,
                        allPosting.longitude
                    ]}
                    onClick={() => {
                        this.setCurrLoc(allPosting);
                    }}
                    />
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