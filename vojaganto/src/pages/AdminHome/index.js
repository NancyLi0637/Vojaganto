import React from 'react';

import AdminNav from 'components/AdminNav'

import './style.scss'

class AdminHome extends React.Component{
    render(){
        const { currUser } = this.props

        return (
            <div className="page admin-home-page">
                <div className="admin-home-main">
                    <AdminNav/>
                    <h1>Welcome Administor {`${currUser}`}</h1>
                </div>
            </div>
        )
    }
}

export default AdminHome;