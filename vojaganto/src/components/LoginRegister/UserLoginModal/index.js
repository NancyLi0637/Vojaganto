import React from 'react';
import UserRegisterModal from '../UserRegisterModal';
import { verifyLogin } from 'actions/UserAuthen';
import "./style.scss";

const mockUser = {
    _id: 0,
    username: 'user',
    password: 'user',
    name: 'User Doe',
    role: 0
}


class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInput: "",
            passwordInput: "",
            warningMessage: undefined,
            registerModalDisplay: false,
        }
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    setWarningMessage = warningMessage => {
        this.setState({ warningMessage })
    }

    submitLogin = () => {
        const { setCurrUser, handleCloseModal } = this.props

        const username = this.state.usernameInput
        const password = this.state.passwordInput

        if (verifyLogin(username, password)) {
            // Correct credential, login user
            setCurrUser(mockUser)
            handleCloseModal()
        } else {
            this.setWarningMessage("Invalid credential!")
        }
    }

    handleOpenRegisterModal = () => {
        this.setState({registerModalDisplay: true});
    }

    handleCloseRegisterModal = () => {
        this.setState({registerModalDisplay: false});
    }

    render() {
        if (!this.props.loginModalDisplay) {
            return null
        }

        return (
            <div className="user-login-modal">
                <form className="user-login-form">
                    <h2 className="login-title">Login</h2>
                    <div className="user-login-input">
                        <span>Username</span>
                        <input
                            value={this.state.usernameInput}
                            onChange={this.handleInputChange}
                            type="text"
                            name="usernameInput"
                            placeholder="Username"
                        />
                    </div>
                    <div className="user-login-input">
                        <span>Password</span>
                        <input
                            value={this.state.passwordInput}
                            onChange={this.handleInputChange}
                            type="password"
                            name="passwordInput"
                            placeholder="Password"
                        />
                    </div>
                    <div className="register-message">
                        <u className="message" onClick={this.handleOpenRegisterModal}>Click here to register</u>

                        <UserRegisterModal
                            registerModalDisplay={this.state.registerModalDisplay}
                            handleCloseModal={this.props.handleCloseModal}
                            handleCloseRegisterModal={this.handleCloseRegisterModal}
                        />
                    </div>

                    {
                        this.state.warningMessage ?
                            <div className="user-login-warning">
                                { this.state.warningMessage }
                            </div> :
                            null
                    }


                    <div>
                        <button type="button" className='login-submit-button' onClick={this.props.handleCloseModal}>
                            Cancel
                        </button>

                        <button type="button" className='login-submit-button' onClick={this.submitLogin}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserLogin