import React from 'react';

import UserLoginModal from 'components/LoginRegister/UserLoginModal';
import * as action from "actions/Auth"

import './style.scss';

class UserLoginWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginModalDisplay: false,
        };
    }

    handleOpenModal = () => {
        this.setState({ loginModalDisplay: true });
    }

    handleCloseModal = () => {
        this.setState({ loginModalDisplay: false });
    }

    logoutUser = () => {
        this.props.setCurrUser(null)
        action.logoutUser()
    }

    render() {
        const { currUser, setCurrUser } = this.props
        if (currUser) {
            // If already login as a user
            return (
                <div className="login">
                    <button type="button" className="login-button" onClick={this.logoutUser}>LOGOUT</button>
                </div>
            )
        }
        
        // if not logged in
        return (
            <div className="login">
                <button className='login-button' onClick={this.handleOpenModal}>
                    LOGIN | REGISTER
                </button>


                <UserLoginModal
                    loginModalDisplay={this.state.loginModalDisplay}
                    handleCloseModal={this.handleCloseModal}

                    currUser={currUser}
                    setCurrUser={setCurrUser}
                />
            </div>
        );
    }
}

export default UserLoginWindow;