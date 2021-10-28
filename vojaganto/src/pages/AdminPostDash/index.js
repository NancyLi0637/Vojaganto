import React from 'react';

import AdminNav from 'components/AdminNav'

class AdminPostDash extends React.Component{
    render(){
        return (
            <div class="page admin-post-page">
                <div className="admin-post-main">
                    <AdminNav/>
                    <h1>AdminPostDash PAGE</h1>
                </div>
            </div>
        )
    }
}

export default AdminPostDash;