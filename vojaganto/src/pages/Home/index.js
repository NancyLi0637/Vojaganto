import React from 'react';
import { Button, Grid} from '@material-ui/core';
import LoginIcon from '@material-ui/icons/AccountCircle';

import pic1 from "./pictures/pic1.jpg";
import pic2 from "./pictures/pic2.jpeg";
import pic3 from "./pictures/pic3.jpg";
import pic4 from "./pictures/pic4.jpg";
import pic5 from "./pictures/pic5.jpg";
import pic6 from "./pictures/pic6.jpg";
import pic8 from "./pictures/pic8.jpg";

import Navbar from "components/Navbar";
import Map from "components/Map";

import "./style.scss";

class HomePage extends React.Component {
    render() {
        return (
            <div className="page home-page">
                <div className="main-view home-main">
                    <Grid justify="space-between" container spacing={24}>
                        <Grid item>
                            <h1 style={{marginLeft: '20px'}}>Voja‎ĝanto</h1>
                        </Grid>
                        <Grid item>
                            <div style={{marginTop: "30px"}}>
                                <Button startIcon={<LoginIcon />}style={{backgroundColor: '#333333', color: '#FFFFFF', borderRadius: "50px", marginRight: "20px"}} variant="contained">
                                    LOGIN/REGISTER
                                </Button>
                            </div>
                        </Grid>
                    </Grid>

                    <div className="image-block">
                       
                        <Grid container direction="row">
                            <Grid item container direction="column" xs={4} md={4} lg={4} xl={4}>
                                <Grid item>
                                    <img src={pic1} alt="pic1" />
                                </Grid>
                                <Grid item>
                                    <img src={pic4} alt="pic4" />
                                </Grid>
                            </Grid>
                            <Grid item container direction="column" xs={4} md={4} lg={4} xl={4}>
                                <Grid item>
                                    <img src={pic3} alt="pic3"/>
                                </Grid>
                                <Grid item>
                                    <img src={pic6} alt="pic6"/>
                                </Grid>
                                <Grid item>
                                    <img src={pic8} alt="pic8"/>
                                </Grid>
                            </Grid>
                            <Grid item container direction="column" xs={4} md={4} lg={4} xl={4}>
                                <Grid item>
                                    <img src={pic5} alt="pic5"/>
                                </Grid>
                                <Grid item>
                                    <img src={pic2} alt="pic2"/>
                                </Grid>
                            </Grid>
                        </Grid>

                    </div>
                        
                    <Navbar/>

                </div>

                <div className="map-view home-map">
                    <Map/>
                </div>

            </div>
        )
    }
}

export default HomePage;