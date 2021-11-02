import React from 'react';
import { Button } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import LocationIcon from '@material-ui/icons/AddLocation';

import "./style.scss";

class LocationMarker extends React.Component{

    render(){

        return(
            <div className="marker">
                <Button style={{position: "fixed"}} startIcon={<Avatar style={{backgroundColor: '#333333'}}>
                    <LocationIcon/>
                </Avatar>} className="location-marker"/>
            </div>
        )

    }

}

export default LocationMarker;