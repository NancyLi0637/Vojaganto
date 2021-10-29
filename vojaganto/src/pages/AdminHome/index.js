import React from 'react';

import AdminNav from 'components/AdminNav'

import './style.scss'

class AdminHome extends React.Component{
    render(){
        const { current_adminid } = this.props

        return (
            <div class="page admin-home-page">
                <div className="admin-home-main">
                    <AdminNav current_userid={current_adminid}/>
                    <h1>Welcome Administor {`${current_adminid}`}</h1>
                </div>
            </div>
        )
    }
}

export default AdminHome;