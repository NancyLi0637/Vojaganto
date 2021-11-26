import React from "react";

import Navbar from "components/Navbar";

import Map from "components/MapPlugin/Map";

import Journey from "components/Journey";
import "./index.scss";
import pic1 from "assets/images/home/pic1.jpg";
import pic2 from "assets/images/home/pic2.jpeg";
import pic3 from "assets/images/home/pic3.jpg";

const postingList = [
  {
    _id: 0,
    date: new Date().toUTCString(),
    title: "Title",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
    image: [pic1],
  },
  {
    _id: 1,
    date: new Date().toUTCString(),
    title: "Hello",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
    image: [pic2],
  },
  {
    _id: 2,
    date: new Date().toUTCString(),
    title: "Demo",
    body: "Travelling and happy",
    image: [pic3],
  },
];
const tripType = "Trip to the North";

class JourneyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.match.params.jid,

      tripType: null,
      postingList: postingList,
    };
  }
  componentDidMount() {
    // Currently, we are using mock postinglist data and hardcoded this part 
    // In the future, we should change this to a fetch to the server to get the correct trip type 
    // and posting list according to the journeyId state
    this.setState({
      tripType: tripType,
      postingList: postingList,
    });
  }

  render() {
    const { currUser } = this.props;
    return (
      <div className="page journey">
        <div className="main-view journey-main-view">
          <Journey
            tripType={this.state.tripType}
            postingList={this.state.postingList}
          />
          <Navbar currUser={currUser} />
        </div>
        <div className="map-view edit-posting-map">
          <Map />
        </div>
      </div>
    );
  }
}

export default JourneyPage;
