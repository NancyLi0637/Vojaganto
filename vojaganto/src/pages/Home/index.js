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
                _id: 1,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic1],
            },
            {
                _id: 2,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic4],
            },
        ],
    },
    {
        postings: [
            {
                _id: 3,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic3],
            },
            {
                _id: 4,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic6],
            },
            {
                _id: 5,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic8],
            }
        ],
    },
    {
        postings: [
            {
                _id: 6,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic5],
            },
            {
                _id: 7,
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                images: [pic2],
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