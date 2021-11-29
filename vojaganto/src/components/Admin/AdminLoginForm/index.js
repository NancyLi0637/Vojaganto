import React from 'react';
import { Redirect } from "react-router-dom";
import "./style.scss";

import { handleInputChange } from 'actions';

const mockAdmin = {
    _id: 1,
    username: 'admin',
    password: "admin",
    name: 'Admin doe',
    role: 1
}

class AdminLoginForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username_input: "",
            password_input: "",
            warning: "",
            redirect: null
        }
    }

    login = () => {
        const { setCurrUser, history } = this.props
        console.log("logging in...")

        if (this.state.username_input === mockAdmin.username && this.state.password_input === mockAdmin.password) {
            console.log("Login successfully")
            setCurrUser(mockAdmin)
            // Navigate to Admin home
            this.setState({redirect: "/admin/home"})
        } else {
            this.setState({
                warning: "Invalid credential!"
            })
        }
    }

    render() {
        const { currUser } = this.props

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <div className="admin-login-form">
                    <h1>Admin Login</h1>
                    <div className="admin-login-input">
                        <span>Username</span>
                        <input value={this.state.username_input}
                            onChange={e => handleInputChange(this, e)}
                            type="text"
                            name="username_input"
                            placeholder="Username"
                        />
                    </div>
                    <div className="admin-login-input">
                        <span>Password</span>
                        <input value={this.state.password_input}
                            onChange={e => handleInputChange(this, e)}
                            type="password"
                            name="password_input"
                            placeholder="Password"
                        />
                    </div>
                    <span className="warn">{this.state.warning}</span>
                    <button type="submit" className="submit" onClick={this.login}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}

export default AdminLoginForm;