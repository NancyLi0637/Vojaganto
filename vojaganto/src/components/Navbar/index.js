import React from 'react';
import { Link } from 'react-router-dom';
import "./nav.scss";

import CreateIcon from '@material-ui/icons/Create';

class Navbar extends React.Component {

    render() {
        const { currUser } = this.props
        
        return (
            <div className="navbar">
                <div className="navbar-main">
                    <Link className="nav-item" to="/">
                        HOME
                    </Link>
                    {
                        currUser ?
                            <Link className="nav-item" to={`/profile/${currUser._id}`}>
                                PROFILE
                            </Link>
                            : null
                    }

                </div>
                {
                    currUser ?
                        <div className="navbar-edit">
                            <Link className="nav-item to-edit" to="/new-posting">
                                <CreateIcon />
                            </Link>
                        </div>
                        : null
                }

            </div>

        )
    }
}

export default Navbar;