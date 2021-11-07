import React from 'react';
import { verifyUser } from 'actions/UserLogin';
import {Link} from 'react-router-dom';
import "./style.scss";

class UserLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: this.props.userName,
            userPassword: this.props.userPassword,
            handleCloseModal: this.props.handleCloseModal,
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


    render(){
        return(
        
            <div className="user-login-form">
                <h1>User Login</h1>
                <div className="user-login-input">
                    <span>Username</span>
                    <input value={ this.state.userName }
                           onChange={this.handleInputChange}
                           type="text"
                           name="userName"
                           placeholder="userName"
                    />
                </div>
                <div className="user-login-input">
                    <span>Password</span>
                    <input value={ this.state.userPassword }
                           onChange={this.handleInputChange}
                           type="text"
                           name="userPassword"
                           placeholder="userPassword"
                    />
                </div>

               
                <button className='link' onClick={this.state.handleCloseModal} disabled={!verifyUser(this.state)}>
                    Login
                </button> 
                
              
            </div>
        
        );
    }
}

export default UserLogin