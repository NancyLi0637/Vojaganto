import React from "react";

import Navbar from "components/Navbar";

import Journey from "components/Journey";
import "./index.scss";

const postingList = [
  {
    date: new Date().toUTCString(),
    title: "Title",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
    image: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
    ],
  },
  {
    date: new Date().toUTCString(),
    title: "Hello",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
    image: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
    ],
  },
  {
    date: new Date().toUTCString(),
    title: "Demo",
    body: "Travelling and happy",
    image: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
    ],
  },
];
const tripType = "Trip to the North";

const tripCategory = "Trip Category One";

class JourneyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journeyId: this.props.match.params.jid,
      tripCategory: null,
      tripType: null,
      postingList: postingList,
      //TODO: Turn this into a default value
    };
    console.log(this.state.postingList);
  }
  componentDidMount() {
    this.setState({
      tripCategory: tripCategory,
      tripType: tripType,
      postingList: postingList,
    });
  }

  render() {
    const {currUser} = this.props;
    return (
      <div className="page journey">
        <div className="main-view journey-main-view">
          <Journey
            tripCategory={this.state.tripCategory}
            tripType={this.state.tripType}
            postingList={this.state.postingList}
          />
          <Navbar currUser={currUser} />
        </div>
        <div className="map-view journey-map">{/* TODO: */}</div>
      </div>
    );
  }
}

export default JourneyPage;
