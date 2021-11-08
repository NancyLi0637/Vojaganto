import React from "react";
import "./profileeditor.scss";

class ProfileEditorPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.profileInfo.name,
      description: this.props.profileInfo.body,
      avatar: this.props.profileInfo.avatar,
    };
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
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
            <div className="edit-profile-close-shape" />
          </div>
          <h2 className="edit-profile-instruction">Edit Profile</h2>

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
            <form className="edit-profile-input">

              <div className="edit-profile-item">
                <span className="edit-profile-title" id="edit-name-instruction">
                  Nickname
                </span>

                <input
                  type="text"
                  name="name"
                  className="edit-nick-name edit-input"
                  placeholder="nick-name-form"
                  onChange={this.handleInputChange}
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
                  onChange={this.handleInputChange}
                  value={this.state.description}
                />

              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="edit-profile-confirm"
                  id="edit-profile-cancel"
                  onClick={closePrompt}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="edit-profile-confirm"
                  id="edit-profile-apply"
                  onClick={() => {
                    applyEdition(
                      this.state.name,
                      this.state.description,
                      this.state.avatar
                    );
                    closePrompt();
                  }}
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
