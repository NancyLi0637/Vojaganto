import React from "react";

import Navbar from "components/Navbar";
import { Redirect } from "react-router";
import Map from "components/Map";

import Profile from "components/Profile";
import avatar from "assets/images/66385278_p8.jpg";

import "./index.scss";

const postingList = {
  "Travel to Canada": {
    journeyId: 0,
    journeyPosting: [
      {
        pid: 100,
        date: new Date().toUTCString(),
        title: "Title",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
        ],
      },
      {
        pid: 101,
        date: new Date().toUTCString(),
        title: "Hello",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [
          "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_634,c_fill,g_auto,h_357,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190517174512-15-summer-travel-tahiti.jpg",
        ],
      },
      {
        pid: 102,
        date: new Date().toUTCString(),
        title: "Demo",
        body: "Travelling and happy",
        image: [
          "https://www.industrialempathy.com/img/remote/ZiClJf-640w.webp",
        ],
      },
    ],
  },
  "Travel to North": {
    journeyId: 1,
    journeyPosting: [
      {
        pid: 103,
        date: new Date().toUTCString(),
        title: "Title",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
        ],
      },
    ],
  },
  Traveling: {
    journeyId: 2,
    journeyPosting: [
      {
        pid: 105,
        date: new Date().toUTCString(),
        title: "Title",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [
          "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/10/2f/e4/toronto.jpg?w=1200&h=-1&s=1",
        ],
      },
    ],
  },
};

const profileInfo = {
  /*
  avatar:
    "https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg",
  name: "AAA",
  */
  uid: 0,
  avatar: avatar,
  username: "User",
  name: "User Doe",
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

  applyEdition = (nickName, description, avatar) => {
    console.log("Applied Profile Change");
    const originalUserName = this.state.profileInfo.username;
    this.setState({
      profileInfo: {
        avatar: avatar,
        name: nickName,
        username: originalUserName,
        body: description,
      },
    });
  };

  render() {
    const { currUser, setCurrUser } = this.props;
    if (!currUser) {
      return <Redirect to="/" />;
    }

    if (currUser && currUser.uid.toString() !== this.state.uid) {
      // CurrUser accessing a post that does not belong to him.
      return (
        <div className="page edit-posting-page">
          <div className="main-view edit-posting-main">
            <h1>NO ACCESS PERMISSION</h1>

            <Navbar currUser={currUser} />
          </div>
          <div className="map-view edit-posting-map">
            <Map />
          </div>
        </div>
      );
    } else {
      return (
        <div className="page profile-page">
          <div className="main-view profile-page-main">
            <Profile
              tripType={this.state.tripType}
              postingList={this.state.postingList}
              profileInfo={this.state.profileInfo}
              applyEdition={this.applyEdition}
              setCurrUser={setCurrUser}
            />
          </div>
          <Navbar currUser={currUser} />
          <div className="map-view edit-posting-map">
            <Map />
          </div>
        </div>
      );
    }
  }
}

export default ProfilePage;
