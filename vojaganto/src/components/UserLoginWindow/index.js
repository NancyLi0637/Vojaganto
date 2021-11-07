import React from 'react';

import LoginIcon from '@material-ui/icons/AccountCircle';

import Modal from 'react-modal';
import UserLogin from 'components/UserLogin';

import './style.scss';

const userName = " ";
const userPassword = " ";

class UserLoginWindow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            modalOpened: false,

            userName: userName,
            userPassword: userPassword,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ modalOpened: true });
    }
      
    handleCloseModal () {
        this.setState({ modalOpened: false });
    }

    render(){
       return(
            <div className="login">
                <button className='login-button' onClick={this.handleOpenModal}>
                    <LoginIcon />
                    <div className='login-register-text'> LOGIN/REGISTER </div>
                </button>

                <Modal 
                    isOpen={this.state.modalOpened}
                    onRequestClose={this.handleCloseModal}
        
                >

                    <UserLogin 
                        userName={this.state.userName}
                        userPassword={this.state.userPassword}
                        modalOpened={this.modalOpened}
                        handleCloseModal={this.handleCloseModal}/>
                
                </Modal>
            </div>
        );
    }
}

export default UserLoginWindow;