import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.scss";

class Navbar extends React.Component {
    
    render() {
        const { current_userid } = this.props
        return (
            <div className="navbar">
            <Link className="nav-item" to="/">
                HOME
            </Link>
            <Link className="nav-item" to={`/profile/${current_userid}`}>
                PROFILE
            </Link>
            </div>
        )
    }
}

export default Navbar;