import React from "react";

import Navbar from "components/Navbar";
import { Redirect } from "react-router";
import Map from "components/MapPlugin/Map";

import Profile from "components/Profile";
import avatar from "assets/images/66385278_p8.jpg";
import pic1 from "assets/images/home/pic1.jpg";
import pic2 from "assets/images/home/pic2.jpeg";
import pic3 from "assets/images/home/pic3.jpg";
import pic5 from "assets/images/home/pic5.jpg";
import pic6 from "assets/images/home/pic6.jpg";



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
        image: [pic1]
      },
      {
        pid: 101,
        date: new Date().toUTCString(),
        title: "Hello",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [pic2],
      },
      {
        pid: 102,
        date: new Date().toUTCString(),
        title: "Demo",
        body: "Travelling and happy",
        image: [pic3],
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
        image: [pic5],
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
        image: [pic6],
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
  username: "user",
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

  applyEdition = (nickName, description, avatar) => {
    console.log("Applied Profile Change");
    const originalUserName = this.state.profileInfo.username;
    this.setState({
      profileInfo: {
        uid: 0,
        avatar: avatar,
        name: nickName,
        username: originalUserName,
        body: description,
      },
    });
  };

  render() {
    const { currUser, setCurrUser } = this.props;
    return (
      <div className="page profile-page">
        <div className="main-view profile-page-main">
          <Profile
            currUser={currUser}
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

export default ProfilePage;
