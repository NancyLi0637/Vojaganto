import React from 'react';
import { Redirect } from "react-router-dom";
import AdminNav from 'components/Admin/AdminNav'
import AdminPostTable from 'components/Admin/AdminPostTable'

import './style.scss'

class AdminPostDash extends React.Component{
    render(){
        const { currUser } = this.props
        if (!currUser || currUser.role !== 1) {
            return <Redirect to="/admin/login" />
        }

        // This data will be pull from server
        const posts = [
            {
                id: 1,
                author: "user1",
                title: "This is a post",
                publish_time: Date.now()
            },
            {
                id: 2,
                author: "user2",
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam congue pretium quam sed accumsan. Aenean blandit vitae odio ac ultricies. Nullam tincidunt tincidunt diam. Nulla non nisl lobortis purus posuere volutpat vel pulvinar felis. Sed justo lectus, aliquet convallis laoreet non, posuere quis eros. Nulla neque risus, porta eget iaculis id, sollicitudin et arcu. Cras porttitor, mi at blandit volutpat, justo massa dapibus arcu, varius posuere lorem mi sit amet nulla. Fusce congue sit amet odio malesuada facilisis.",
                publish_time: Date.now()
            }
        ]
        return (
            <div className="page admin-post-page">
                <div className="admin-post-main">
                    <AdminNav/>
                    <AdminPostTable posts={posts}/>
                </div>
            </div>
        )
    }
}

export default AdminPostDash;