import React from 'react';

import "./Editor.scss";

class Editor extends React.Component{
    render(){
        return (
            <div className="editor">
                <textarea name="body" id="postingBodyInput" placeholder="Write down your trip!"></textarea>
            </div>
        )
    }
}

export default Editor;