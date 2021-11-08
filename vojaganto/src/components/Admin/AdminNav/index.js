import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss";

// All images in Admin Navbar come from https://icons8.com/
import UserIcon from "assets/icons/user.png";
import HomeIcon from "assets/icons/home.png";
import JournalIcon from "assets/icons/journal.png";

class AdminNav extends React.Component {

    render() {
        // const { currUser } = this.props
        return (
            <div>
                <div className="admin-nav">
                    <Link className="admin-nav-item" to={`/admin/home`}>
                        <img src={HomeIcon} alt="" />
                        <span>Home</span>
                    </Link>
                    <br />
                    <Link className="admin-nav-item" to={`/admin/users`}>
                        <img src={UserIcon} alt="" />
                        <span>Manage User</span>
                    </Link>
                    <br />
                    <Link className="admin-nav-item" to={`/admin/postings`}>
                        <img src={JournalIcon} alt="" />
                        Manage Post
                    </Link>
                </div>
                <div className="admin-nav-blocker"></div>
            </div>
        )
    }
}

export default AdminNav;