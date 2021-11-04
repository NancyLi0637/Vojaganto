import React from 'react';

import "./Editor.scss";

class Editor extends React.Component {
    render() {
        const { body, handleChange } = this.props
        return (
            <div className="editor">
                <textarea
                    name="body"
                    id="postingBodyInput"
                    placeholder="Write down your trip!"
                    onChange={handleChange}
                    value={body}
                ></textarea>
            </div>
        )
    }
}

export default Editor;