import React from "react";

import Navbar from "components/Navbar";

import Profile from "components/Profile";
import "./index.scss";

const postingList = {
  "Travel to Canada": [
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
        "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190517174512-15-summer-travel-tahiti.jpg",
      ],
    },
    {
      date: new Date().toUTCString(),
      title: "Demo",
      body: "Travelling and happy",
      image: ["https://www.industrialempathy.com/img/remote/ZiClJf-640w.webp"],
    },
  ],
  "Travel to North": [
    {
      date: new Date().toUTCString(),
      title: "Title",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
      image: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
      ],
    },
  ],
  Traveling: [
    {
      date: new Date().toUTCString(),
      title: "Title",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
      image: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
      ],
    },
  ],
};

const profileInfo = {
  image:
    "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
  nickName: "AAA",
  userName: "aaa",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
  //body: "Travelling and happy"
};

const tripType = ["Travel to Canada", "Travel to North", "Traveling"];

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.match.params.uid,
      tripType: tripType,
      postingList: postingList,
      profileInfo: profileInfo,
      // TODO: find a default value for postingList
    };
  }
  componentDidMount() {
    this.setState({
      tripType: tripType,
      postingList: postingList,
      profileInfo: profileInfo,
    });
  }
  render() {
    return (
      <div className="page profile-page">
        <div className="main-view profile-page-main">
          <Profile
            tripType={this.state.tripType}
            postingList={this.state.postingList}
            profileInfo={this.state.profileInfo}
          />
        </div>
        <Navbar />
        <div className="map-view journey-map">{/* TODO: */}</div>
      </div>
    );
  }
}

export default ProfilePage;
