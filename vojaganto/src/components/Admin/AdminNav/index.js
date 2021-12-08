import React from 'react';
import { Link } from 'react-router-dom';
import "./style.scss";

// All images in Admin Navbar come from https://icons8.com/
import UserIcon from "assets/icons/user.png";
import HomeIcon from "assets/icons/home.png";
import JournalIcon from "assets/icons/journal.png";
import LogoutIcon from "assets/icons/logout.png";

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
                    
                    <Link className="admin-nav-item" to={`/admin/users`}>
                        <img src={UserIcon} alt="" />
                        <span>Users</span>
                    </Link>
                    
                    <Link className="admin-nav-item" to={`/admin/postings`}>
                        <img src={JournalIcon} alt="" />
                        Postings
                    </Link>

                    <Link className="admin-nav-item" to={`/admin/login`}>
                        <img src={LogoutIcon} alt="" />
                        Logout
                    </Link>
                </div>
                {/* <div className="admin-nav-blocker"></div> */}
            </div>
        )
    }
}

export default AdminNav;