import React from 'react';
import "./style.scss";

const mockUser = {
    uid: 0,
    username: 'user',
    password: 'user',
    name: 'User Doe',
    role: 0
}

class UserRegisterModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInput: "",
            passwordInput: "",
            warningMessage: undefined,
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

    submitRegister = () => {
        const { handleCloseModal, handleCloseRegisterModal } = this.props

        const username = this.state.usernameInput
        const password = this.state.passwordInput

        if(username === 'user' && password === 'user'){
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
                            onChange={this.handleInputChange}
                            type="text"
                            name="usernameInput"
                            placeholder="Username"
                        />
                    </div>
                    <div className="user-register-input">
                        <span>Password</span>
                        <input
                            value={this.state.passwordInput}
                            onChange={this.handleInputChange}
                            type="password"
                            name="passwordInput"
                            placeholder="Password"
                        />
                    </div>

                    {
                        this.state.warningMessage ?
                            <div className="user-register-warning">
                                { this.state.warningMessage }
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