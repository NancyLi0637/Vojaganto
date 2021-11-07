import React from 'react';
import LocationIcon from '@material-ui/icons/AddLocation';

import "./style.scss";

class LocationMarker extends React.Component{

    render(){

        return(
            <div className="marker">
                <div className="add-location">
                    <LocationIcon/>
                </div>
            </div>
        );

    }

}

export default LocationMarker;