import React from "react";
import "./index.scss";

import { handleInputChange, getAvatarUrl } from "actions";
import { updateProfileInfo } from "actions/Profile";

class ProfileEditorPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      avatar: null,
      description: "",
      _id: null,
      avatarUrl: ""
    };
  }


  componentWillReceiveProps(props) {
    this.setState({
      ...props.profileInfo
    })
  }

  handleAvatarChange = (event) => {
    const newFile = event.target.files[0];
    // const newFileURL = URL.createObjectURL(newFile)
    // console.log("input new file", newFileURL)
    this.setState({
      avatar: newFile,
      avatarUrl: URL.createObjectURL(newFile)
    });
  };

  /**
   * Submit profile updates to server.
   */
  submitProfile() {
    const body = {
      // _id: this.state._id,
      name: this.state.name,
      avatar: this.state.avatar,
      description: this.state.description
    }

    console.log("Almost submit profile", body)

    updateProfileInfo(this, this.state._id, body)
  }



  render() {
    const { display, toggleEditProfile } = this.props

    if (!display) {
      // Hide the modal
      return <></>
    } else {
      return (
        <div className="edit-profile-modal">
          <h2 className="edit-profile-instruction">Edit Profile</h2>

          <div className="edit-profile-content">
            <div className="edit-profile-input" id="edit-avatar-container">
              <div className="edit-avatar-presentation">
                <img
                  className="profile-avatar"
                  src={this.state.avatarUrl.length > 0 ? this.state.avatarUrl : getAvatarUrl(this.state.avatar)}
                  alt="profile avatar"
                />
              </div>

              <input
                type="file"
                name="image"
                className="edit-input edit-avatar-upload-btn"
                onChange={this.handleAvatarChange}
              />
            </div>
            <form className="edit-profile-input">

              <div className="edit-profile-item">
                <span className="edit-profile-title" id="edit-name-instruction">
                  Nickname
                </span>

                <input
                  type="text"
                  name="name"
                  className="edit-nickname edit-input"
                  placeholder="nick-name-form"
                  onChange={e => handleInputChange(this, e)}
                  value={this.state.name}
                />
              </div>

              <div className="edit-profile-item">
                <span
                  className="edit-profile-title"
                  id="edit-description-instruction"
                >
                  Self Description
                </span>

                <textarea
                  type="text"
                  name="description"
                  className="edit-user-description edit-input"
                  placeholder="user-description-form"
                  onChange={e => handleInputChange(this, e)}
                  value={this.state.description}
                />

              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="edit-profile-btn"
                  onClick={toggleEditProfile}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="edit-profile-btn"
                  id="edit-profile-apply"
                  onClick={this.submitProfile.bind(this)}
                >
                  Apply
                </button>

              </div>

            </form>

          </div>
        </div>
      );
    }
  }
}
export default ProfileEditorPrompt;
