import React from 'react';
import map from "./map.png";
import LocationMarker from "components/MapPlugin/LocationMarker";

import "./style.scss";

//const addLocation = "hi";

class Map extends React.Component {
    render() {

        return (
            <div className='home-map'>
                {/*Get map from api later*/}
                <img src={map} alt="map" />

                <div className='location'>
                    <button className="location-button">Toronto, ON, CA</button>
                </div>

                {this.props.enableAddLocation ? <LocationMarker /> : <span />}

            </div>
        )

    }

}

export default Map;