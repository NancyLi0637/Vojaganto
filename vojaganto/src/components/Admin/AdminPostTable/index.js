import React from 'react';
import "./style.scss";

import { redirectToPage } from 'actions';

class AdminPostTable extends React.Component {
    checkDetailContent(posting) {
        // TODO: Implement
        redirectToPage(`/trip/${String(posting._id)}`, true)
    }

    render() {
        const { postings } = this.props
        return (
            <div>
                <table className="admin-post-table admin-table">
                    <thead className="admin-table-headerRow">
                        <tr>
                            <th className="admin-table-header">
                                Post ID
                            </th>
                            <th className="admin-table-header">
                                Author
                            </th>
                            <th className="admin-table-header">
                                Title
                            </th>
                            <th className="admin-table-header">
                                Journey
                            </th>
                            <th className="admin-table-header">
                                Publish Time
                            </th>
                            <th className="admin-table-header">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {postings.map(posting => (
                            <tr key={posting._id}  className="admin-data-row">
                                <td>
                                    {posting._id}
                                </td>
                                <td>
                                    {posting.author}
                                </td>
                                <td>
                                    {posting.title}
                                </td>
                                <td>
                                    {posting.journey.title}
                                </td>
                                <td>
                                    {posting.publishTime}
                                </td>
                                <td className="actions">
                                    <button onClick={() => this.props.deletePosting(posting)}>
                                        Delete
                                    </button>
                                    <button onClick={() => this.checkDetailContent(posting)}>
                                        View Content
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AdminPostTable;