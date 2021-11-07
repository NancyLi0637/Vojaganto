import React from 'react';
import AdminLoginForm from 'components/Admin/AdminLoginForm';
import './style.scss'

class AdminLogin extends React.Component{

    render(){
        const { currUser, setCurrUser } = this.props
        return (
            <div className="admin-login">
                <div className="bg-img"></div>
                <AdminLoginForm currUser={currUser} setCurrUser={setCurrUser}/>
            </div>
        )
    }
}

export default AdminLogin;