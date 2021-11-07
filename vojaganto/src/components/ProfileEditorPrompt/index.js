import React from "react";
import "./profileeditor.scss";

class ProfileEditorPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: this.props.profileInfo.name,
      description: this.props.profileInfo.body,
      avatar: this.props.profileInfo.avatar,
    };
  }

  handleNickNameChange = (event) => {
    this.setState({
      nickName: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handleAvatarChange = (event) => {
    const newFile = event.target.files[0];
    this.setState({
      avatar: URL.createObjectURL(newFile),
    });
  };

  render() {
    const openModal = this.props.openModal;
    const closePrompt = this.props.toggleEditProfile;
    const applyEdition = this.props.applyEdition;
    if (!openModal) {
      return null;
    } else {
      return (
        <div className="edit-profile-modal">
          <div className="edit-profile-close-container">
            <div className="edit-profile-close-shape"></div>
          </div>
          <h1 className="edit-profile-instruction">Edit Profile</h1>

          <h3 className="edit-profile-title" id="user-avatar-form">
            User Avatar
          </h3>

          <div className="edit-profile-content">
            <div className="edit-profile-input" id="edit-avatar-container">
              <div className="edit-avatar-presentation">
                <img
                  className="profile-avatar"
                  src={this.state.avatar}
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

            <h3 className="edit-profile-title" id="edit-nickname-instruction">
              User Nick Name
            </h3>
            <form className="edit-profile-input" id="nick-name-form">
              <input
                type="text"
                name="nick-name"
                className="edit-nick-name edit-input"
                placeholder="nick-name-form"
                onChange={this.handleNickNameChange}
                value={this.state.nickName}
              />
            </form>
            <h3
              className="edit-profile-title"
              id="edit-description-instruction"
            >
              User Description
            </h3>

            <form className="edit-profile-input" id="user-description-form">
              <textarea
                type="text"
                name="description"
                row="6"
                col="60"
                className="edit-user-description edit-input"
                placeholder="user-description-form"
                onChange={this.handleDescriptionChange}
                value={this.state.description}
              />
            </form>

            <button
              className="edit-profile-confirm"
              id="edit-profile-apply"
              onClick={() => {
                applyEdition(
                  this.state.nickName,
                  this.state.description,
                  this.state.avatar
                );
                closePrompt();
              }}
            >
              Apply
            </button>
            <button
              className="edit-profile-confirm"
              id="edit-profile-cancel"
              onClick={closePrompt}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }
  }
}
export default ProfileEditorPrompt;
