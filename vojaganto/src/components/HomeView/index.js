import React from 'react';

import { Button, Grid} from '@material-ui/core';
import LoginIcon from '@material-ui/icons/AccountCircle';

import PostingCardColumn from "components/PostingCardColumn";

import "./style.scss";

class HomeView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            webTitle: this.props.webTitle,
            postingCardColumns: this.props.postingCardColumns,
        };
    }

    render(){
        return(
            <div className="home-view">
                <Grid justify="space-between" container spacing={24}>
                    <Grid item>
                        <h1 style={{marginLeft: '20px'}}>{this.state.webTitle}</h1>
                    </Grid>
                    <Grid item>
                        <div style={{marginTop: "30px"}}>
                            <Button startIcon={<LoginIcon />}style={{backgroundColor: '#333333', color: '#FFFFFF', borderRadius: "50px", marginRight: "20px"}} variant="contained">
                                LOGIN/REGISTER
                            </Button>
                        </div>
                    </Grid>
                </Grid>

                <div className="posting-card-columns">
                    {this.state.postingCardColumns.map((postingCardColumn) => (
                        <PostingCardColumn postingCardColumn={postingCardColumn}/>
                    ))}
                </div>
            </div>
           
        );
    }
}

export default HomeView;