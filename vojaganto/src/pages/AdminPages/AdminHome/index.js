import React from 'react';
import { Redirect } from "react-router-dom";
import AdminNav from 'components/Admin/AdminNav'

import './style.scss'

class AdminHome extends React.Component {
    render() {
        const { currUser } = this.props

        if (!currUser || currUser.role !== "admin") {
            return <Redirect to="/admin/login" />
        }

        return (
            <div className="page admin-home-page">
                <AdminNav />
                
                <div className="admin-home-main">
                    <h1>Welcome, {`${currUser.name}`}</h1>
                </div>
            </div>
        )
    }
}

export default AdminHome;