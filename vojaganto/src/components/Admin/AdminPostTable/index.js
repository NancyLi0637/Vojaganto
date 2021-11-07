import React from 'react';
import "./style.scss";

import {removePost} from 'actions/Admin/AdminTable/index';

class AdminPostTable extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            posts: props.posts
        }
    }

    render() {
        const { posts } = this.state

        const format_posts = posts.map(post => ({
            id: post.id,
            author: post.author,
            title: post.title,
            publish_time: new Date(post.publish_time)
        }))
        return (
            <div>
                <table className="AdminPostTable">
                    <tr className="AdminPostHeaderRow">
                        <th className="AdminPostHeader">
                            Post ID
                        </th>
                        <th className="AdminPostHeader">
                            Author
                        </th>
                        <th className="AdminPostHeader">
                            Title
                        </th>
                        <th className="AdminPostHeader">
                            Publish Time
                        </th>
                    </tr>
                    {format_posts.map(post => (
                        <tr className="AdminPostRow">
                            <td className="AdminPostData LeftCol">
                                {post.id}
                            </td>
                            <td className="AdminPostData">
                                {post.author}
                            </td>
                            <td className="AdminPostData">
                                {post.title}
                            </td>
                            <td className="AdminPostData">
                                {
                                    "Date: " + post.publish_time.getDate() +
                                    "/" + (post.publish_time.getMonth() + 1) +
                                    "/" + post.publish_time.getFullYear() +
                                    " " + post.publish_time.getHours() +
                                    ":" + post.publish_time.getMinutes() +
                                    ":" + post.publish_time.getSeconds()}
                            </td>
                            <td className="AdminPostData RightCol">
                                <button onClick={() => removePost(this, post)}>
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        )
    }
}

export default AdminPostTable;