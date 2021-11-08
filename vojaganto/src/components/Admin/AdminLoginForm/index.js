import React from 'react';
import { Redirect } from "react-router-dom";
import "./style.scss";

const mockAdmin = {
    uid: 1,
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
            warning: ""
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

    login = () => {
        const { setCurrUser } = this.props
        console.log("logging in...")

        if (this.state.username_input === mockAdmin.username && this.state.password_input === mockAdmin.password) {
            console.log("logging in succeful")
            setCurrUser(mockAdmin)
        } else {
            this.setState({
                warning: "Invalid credential!"
            })
        }

    }

    render() {
        const{currUser} = this.props

        if (currUser === undefined || currUser.role === 0) {
            return (
                <div>
                    <div className="admin-login-form">
                        <h1>Admin Login</h1>
                        <div className="admin-login-input">
                            <span>Username</span>
                            <input value={this.state.username_input}
                                onChange={this.handleInputChange}
                                type="text"
                                name="username_input"
                                placeholder="Username"
                            />
                        </div>
                        <div className="admin-login-input">
                            <span>Password</span>
                            <input value={this.state.password_input}
                                onChange={this.handleInputChange}
                                type="password"
                                name="password_input"
                                placeholder="Password"
                            />
                        </div>
                        <span className="warn">{this.state.warning}</span>
                        <button className="submit" onClick={() => this.login()}>
                            Submit
                        </button>
                    </div>
                </div>
            )
        } else {
            return <Redirect to="/admin/home" />
        }
    }
}

export default AdminLoginForm;