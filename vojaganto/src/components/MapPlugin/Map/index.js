import React from 'react';
import map from "./map.png";
import LocationMarker from "components/MapPlugin/LocationMarker";

import "./style.scss";

//const addLocation = "hi";

class Map extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            addLocation: this.props.addLocation,
            //addLocation: addLocation,
        };
    }

    render(){

        return (
            <div className='home-map'>
                 {/*Get map from api later*/}
                <img src={map} alt="map"/>

                <div className='location'>
                    <button className="location-button">Toronto, ON, CA</button>
                </div>
                
                {this.state.addLocation ? <LocationMarker /> : <span/>}
                
            </div>
        )

    }

}

export default Map;