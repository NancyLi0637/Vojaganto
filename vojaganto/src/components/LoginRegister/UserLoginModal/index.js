import React from 'react';
import { verifyUser } from 'actions/UserLogin';
import { Redirect } from 'react-router-dom';
import "./style.scss";

const mockUser = {
    uid: 0,
    username: 'user',
    password: 'user',
    name: 'User Doe',
    role: 0
}

const mockAdmin = {
    uid: 1,
    username: 'admin',
    password: "admin",
    name: 'Admin doe',
    role: 1
}

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInput: "",
            passwordInput: "",
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

    submitLogin = () => {
        const { setCurrUser, handleCloseModal } = this.props

        const username = this.state.usernameInput
        const password = this.state.passwordInput

        if (username === mockUser.username && password === mockUser.password) {
            // Correct credential, login user
            console.log("Correct credential, login user")
            setCurrUser(mockUser)
            handleCloseModal()
        } else {
            console.log("Invalid credential")
        }
    }

    render() {
        if (!this.props.loginModalDisplay){
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