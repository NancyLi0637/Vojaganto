import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss";

// All images in Admin Navbar come from https://icons8.com/

class AdminNav extends React.Component {

    render() {
        const { current_userid } = this.props
        return (
            <div>
                <div className="admin-nav">
                    <Link className="admin-nav-item" to={`/admin-home/${current_userid}`}>
                        <img src="https://img.icons8.com/material-outlined/24/ffffff/home--v2.png"/>
                        <span>Home</span>
                    </Link>
                    <br />
                    <Link className="admin-nav-item" to={`/admin-user-dash/${current_userid}`}>
                        <img src="https://img.icons8.com/material-outlined/24/ffffff/user--v1.png"/>
                        <span>Manage User</span>
                    </Link>
                    <br />
                    <Link className="admin-nav-item" to={`/admin-post-dash/${current_userid}`}>
                        <img src="https://img.icons8.com/ios/50/ffffff/journal.png"/>
                        Manage Post
                    </Link>
                </div>
                <div className="admin-nav-blocker"></div>
            </div>
        )
    }
}

export default AdminNav;