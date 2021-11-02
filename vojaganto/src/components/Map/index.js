import React from 'react';
import map from "./map.png";
import LocationMarker from "components/LocationMarker";
import LoginIcon from "@material-ui/icons/AccountCircle";
import {Button} from "@material-ui/core";

class Map extends React.Component{

    render(){

        return (
            <div>

                    <Button style={{backgroundColor: '#333333', color: '#FFFFFF', borderRadius: "50px",
                        float: "right"}} variant="contained">
                        Toronto, ON, CA
                    </Button>

                {/*Get map from api later*/}
                <img src={map} alt="map" style={{maxWidth: "100%", height: "780px", marginTop: "-40px"}}/>
                <LocationMarker/>
            </div>
        )

    }

}

export default Map;