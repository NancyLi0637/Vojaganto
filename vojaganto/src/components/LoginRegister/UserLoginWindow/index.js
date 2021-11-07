import React from 'react';

import UserLoginModal from 'components/LoginRegister/UserLoginModal';

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

    render() {
        const { currUser, setCurrUser } = this.props
        if (currUser !== undefined) {
            return (
                <div className="login">
                    <button type="button" className="login-button" onClick={() => setCurrUser(undefined)}>LOGOUT</button>
                </div>
            )
        }
        
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