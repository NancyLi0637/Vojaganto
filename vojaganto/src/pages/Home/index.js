import React from 'react';
import HomeView from "components/HomeView";
import Navbar from "components/Navbar";
import Map from "components/Map";


import pic1 from "./pictures/pic1.jpg";
import pic2 from "./pictures/pic2.jpeg";
import pic3 from "./pictures/pic3.jpg";
import pic4 from "./pictures/pic4.jpg";
import pic5 from "./pictures/pic5.jpg";
import pic6 from "./pictures/pic6.jpg";
import pic8 from "./pictures/pic8.jpg";


import "./style.scss";

const webTitle = "Vojaĝanto";
const postingCardColumns = [
    {
        postings: [
            {
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic1, 
            },
            {   
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic4,
            },
        ],
    },
    {
        postings: [
            {
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic3, 
            },
            {   
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic6,
            },
            {
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic8,
            }
        ],
    },
    {
        postings: [
            {
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic5, 
            },
            {   
                title: "Lorem ipsum",
                date: new Date().toUTCString().substring(0, 17),
                image: pic2,
            },
        ],
    },
];


class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            webTitle: webTitle,
            postingCardColumns: postingCardColumns,
        };
    }

    componentDidMount(){
        this.setState({
            webTitle: webTitle,
            postingCardColumns: postingCardColumns,
        });
    }

    render() {
        return (
            <div className="page home-page">
                <div className="main-view home-main">
                    <HomeView 
                        webTitle = {this.state.webTitle}
                        postingCardColumns = {this.state.postingCardColumns}
                    />
                   
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