import React from 'react';
import { Redirect } from "react-router-dom";
import "./style.scss";

import { handleInputChange } from 'actions';
import { loginAdmin } from 'actions/Auth';


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

    login = async () => {
        const { setCurrUser } = this.props
        console.log("logging in...")

        const username = this.state.username_input
        const password = this.state.password_input

        if (username.length < 1 || password.length < 1) {
            alert("Please enter username and password")
            return
        }

        const admin = await loginAdmin(username, password)
        if (admin) {
            console.log("Login successfully")
            setCurrUser(admin)
            // Navigate to Admin home
            this.setState({ redirect: "/admin/home" })
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