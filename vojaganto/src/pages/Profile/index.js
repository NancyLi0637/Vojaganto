import React from "react";

import Navbar from "components/Navbar";
import Map from "components/MapPlugin/Map";

import Profile from "components/Profile";

import pic1 from "assets/images/home/pic1.jpg";
import pic2 from "assets/images/home/pic2.jpeg";
import pic3 from "assets/images/home/pic3.jpg";
import pic5 from "assets/images/home/pic5.jpg";
import pic6 from "assets/images/home/pic6.jpg";



import "./index.scss";

const postingList = {
  "Travel to Canada": {
    _id: 0,
    journeyPosting: [
      {
        _id: 100,
        date: new Date().toUTCString(),
        title: "Title",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [pic1]
      },
      {
        _id: 101,
        date: new Date().toUTCString(),
        title: "Hello",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [pic2],
      },
      {
        _id: 102,
        date: new Date().toUTCString(),
        title: "Demo",
        body: "Travelling and happy",
        image: [pic3],
      },
    ],
  },
  "Travel to North": {
    _id: 1,
    journeyPosting: [
      {
        _id: 103,
        date: new Date().toUTCString(),
        title: "Title",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [pic5],
      },
    ],
  },
  Traveling: {
    _id: 2,
    journeyPosting: [
      {
        _id: 105,
        date: new Date().toUTCString(),
        title: "Title",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
        image: [pic6],
      },
    ],
  },
};



const tripType = ["Travel to Canada", "Travel to North", "Traveling"];

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // profileId: this.props.match.params.uid,
      tripType: tripType,
      postingList: postingList,
      // profileInfo: profileInfo,
      // Currently, we are using mock data for tripType, postingList and profileInfo and hardcoded this part.
      // In the future, we should use a fetch to get those information from server using the uid.
      // Hardcoded this part for demonstration
    };
  }

  applyEdition = (nickName, description, avatar) => {
    // This console.log will be replaced with a post request to the server in the future. For now, it prints a log to the console to show that the change can be updated.
    console.log("Applied Profile Change");
    // const originalUserName = this.state.profileInfo.username;
    // this.setState({
    //   profileInfo: {
    //     _id: 0,
    //     avatar: avatar,
    //     name: nickName,
    //     username: originalUserName,
    //     body: description,
    //   },
    // });
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
            // profileInfo={this.state.profileInfo}
            // applyEdition={this.applyEdition}
            setCurrUser={setCurrUser}
            profileId={this.props.match.params.uid}
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
