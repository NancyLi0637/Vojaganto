import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.scss";

import CreateIcon from '@material-ui/icons/Create';

class Navbar extends React.Component {

    render() {
        const { current_userid } = this.props
        return (
            <div className="navbar">
                <div className="navbar-main">
                    <Link className="nav-item" to="/">
                        HOME
                    </Link>
                    <Link className="nav-item" to={`/profile/${current_userid}`}>
                        PROFILE
                    </Link>
                </div>
                <div className="navbar-edit">
                    <Link className="nav-item to-edit" to={`/new-posting`}>
                        <CreateIcon/>
                    </Link>
                </div>
            </div>

        )
    }
}

export default Navbar;