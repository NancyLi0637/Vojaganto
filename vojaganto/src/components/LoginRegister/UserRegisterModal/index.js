import React from 'react';
import { verifyRegister } from "actions/UserAuthen";
import "./style.scss";

import { handleInputChange } from "actions"

class UserRegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInput: "",
            passwordInput: "",
            confirmInput: "",
            warningMessage: undefined,
        }
    }

    setWarningMessage = warningMessage => {
        this.setState({ warningMessage })
    }

    submitRegister = () => {
        const { handleCloseModal, handleCloseRegisterModal } = this.props

        const username = this.state.usernameInput
        const password = this.state.passwordInput
        const confirm = this.state.confirmInput

        if (confirm !== password) {
            this.setWarningMessage("Password does not match!")
            return
        }

        if (!verifyRegister(username)) {
            this.setWarningMessage("User already exists!")
        }
        else if (username && password) {
            // Correct credential, register user
            console.log("Registered!")
            handleCloseModal()
            handleCloseRegisterModal()
        }
        else {
            this.setWarningMessage("Fields cannot be empty!")
        }
    }

    render() {
        if (!this.props.registerModalDisplay) {
            return null
        }

        return (
            <div className="user-register-modal">
                <form className="user-register-form">
                    <h2 className="register-title">Register</h2>
                    <div className="user-register-input">
                        <span>Username</span>
                        <input
                            value={this.state.usernameInput}
                            onChange={(e) => handleInputChange(this, e)}
                            type="text"
                            name="usernameInput"
                            placeholder="Username"
                        />
                    </div>
                    <div className="user-register-input">
                        <span>Password</span>
                        <input
                            value={this.state.passwordInput}
                            onChange={(e) => handleInputChange(this, e)}
                            type="password"
                            name="passwordInput"
                            placeholder="Password"
                        />
                    </div>
                    <div className="user-register-input">
                        <span>Confirm password</span>
                        <input
                            value={this.state.confirmInput}
                            onChange={(e) => handleInputChange(this, e)}
                            type="password"
                            name="confirmInput"
                            placeholder="Confirm Password"
                        />
                    </div>

                    {
                        this.state.warningMessage ?
                            <div className="user-register-warning">
                                {this.state.warningMessage}
                            </div> :
                            null
                    }


                    <div>
                        <button type="button" className='register-submit-button' onClick={this.props.handleCloseRegisterModal}>
                            Cancel
                        </button>

                        <button type="button" className='register-submit-button' onClick={this.submitRegister}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserRegisterModal