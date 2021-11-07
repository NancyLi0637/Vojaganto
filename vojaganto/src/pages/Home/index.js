import React from 'react';
import HomeView from "components/HomeView";
import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Map";

import pic1 from "assets/images/home/pic1.jpg";
import pic2 from "assets/images/home/pic2.jpeg";
import pic3 from "assets/images/home/pic3.jpg";
import pic4 from "assets/images/home/pic4.jpg";
import pic5 from "assets/images/home/pic5.jpg";
import pic6 from "assets/images/home/pic6.jpg";
import pic8 from "assets/images/home/pic8.jpg";


import "./style.scss";

const postingCardColumns = [
    {
        postings: [
            {
                pid: 1,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic1,
            },
            {
                pid: 2,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic4,
            },
        ],
    },
    {
        postings: [
            {
                pid: 3,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic3,
            },
            {
                pid: 4,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic6,
            },
            {
                pid: 5,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic8,
            }
        ],
    },
    {
        postings: [
            {
                pid: 6,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic5,
            },
            {
                pid: 7,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic2,
            },
        ],
    },
];


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postingCardColumns: postingCardColumns,
        };
    }

    render() {
        const { currUser, setCurrUser } = this.props
        return (
            <div className="page home-page">
                <div className="main-view home-main">
                    <HomeView
                        postingCardColumns={this.state.postingCardColumns}
                        currUser={currUser}
                        setCurrUser={setCurrUser}
                    />

                    <Navbar currUser={currUser} />
                </div>

                <div className="map-view home-map">
                    <Map />
                </div>
            </div>
        )
    }
}

export default HomePage;