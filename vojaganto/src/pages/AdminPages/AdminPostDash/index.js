import React from 'react';
import { Redirect } from "react-router-dom";
import AdminNav from 'components/Admin/AdminNav'
import AdminPostTable from 'components/Admin/AdminPostTable'

import './style.scss'

import { handleInputChange } from "actions"
import { deletePost, getPostings } from 'actions/Admin/AdminTable/index';

class AdminPostDash extends React.Component {
    state = {
        postings: [],
        search: ""
    }

    componentDidMount() {
        getPostings(this, { search: this.state.search })
    }

    render() {
        const { currUser } = this.props
        if (!currUser || currUser.role !== "admin") {
            return <Redirect to="/admin/login" />
        }

        return (
            <div className="page admin-post-page">
                <AdminNav />
                <div className="admin-post-main">
                    <div className="table-search">
                        <input type="text" className="table-search-input" name="search" placeholder="Search by ID, Title, Content, Author" onChange={(e) => handleInputChange(this, e)} />
                        <button className="table-search-btn" onClick={() => getPostings(this, { search: this.state.search })}>Search</button>
                    </div>
                    <AdminPostTable postings={this.state.postings} deletePost={(post) => deletePost(this, post)} />
                </div>
            </div>
        )
    }
}

export default AdminPostDash;