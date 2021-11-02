import React from 'react';
import "./style.scss";
import { Link } from 'react-router-dom'; 

class AdminLoginForm extends React.Component {

    handleInputChange = e => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    };

    login = () => {
        console.log("logging in...")
    
        // TODO: change following line in phase 2
        
        this.setState({
            current_adminid: "1"
        })
    }

    render() {
        const { admin_username, admin_password, current_adminid} = this.props
        if (current_adminid == undefined){
            return (
                <div>
                    <div className="admin-login-form">
                        <h1>Admin Login</h1>
                        <div className="admin-login-input">
                            <span>Username</span>
                            <input value={ admin_username }
                                   onChange={this.handleInputChange}
                                   type="text"
                                   name="admin_username"
                                   placeholder="Username"
                            />
                        </div>
                        <div className="admin-login-input">
                            <span>Password</span>
                            <input value={ admin_password }
                                   onChange={this.handleInputChange}
                                   type="text"
                                   name="admin_password"
                                   placeholder="Password"
                            />
                        </div>
                        <Link className="link" to={`/admin-home/${current_adminid}`}>
                            Submit
                        </Link>
                    </div>
                </div>
            )
        } else{
            return (
                <div>
                    <div className="admin-login">
                        <Link to={`/admin-home/${current_adminid}`}>
                            Welcome to Admin Dashboard
                        </Link>
                    </div>
                </div>
            )
        }
        
    }
}

export default AdminLoginForm;