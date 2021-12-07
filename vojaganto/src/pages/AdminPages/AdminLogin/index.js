import React from 'react';
import AdminLoginForm from 'components/Admin/AdminLoginForm';
import './style.scss'

class AdminLogin extends React.Component{
    state={
        redirect: null
    }

    componentWillReceiveProps(props) {
        if (props.currUser !== this.props.currUser) {
            if (props.currUser && props.currUser.role === "admin") {
                // this.setState({redirect: })
            }
        }
    }

    render(){
        // FIXME: When the page reload, the currUser is not yet resumed. Thus the redirection is triggered.
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