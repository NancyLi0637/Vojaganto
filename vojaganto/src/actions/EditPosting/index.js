
/**
 * Handle setState when an input event occurs. 
 * @param {React.Component} component 
 * @param {Event} event 
 */
function handleInputChange(component, event) {
    // From course demo
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // Handle the checkbox
    if (name === "public") {
        component.setState(prevState => ({
            ...prevState,
            posting: {
                ...prevState.posting,
                public: !prevState.posting.public

            }
        }));
    } else {
        component.setState(prevState => ({
            ...prevState,
            posting: {
                ...prevState.posting,
                [name]: value

            }
        }));
    }
}

/**
 * Update component state to append new image url.
 * @param {*} component 
 * @param {*} event 
 */
function handleImageUpload(component, event) {
    const target = event.target;
    const files = target.files;
    
    // Get uploaded images from input
    const newFiles = [];
    for (let f of files) {
        newFiles.push(URL.createObjectURL(f))
    }   
    // console.log(files)

    // A copy of the new state
    const newImages = [...component.state.posting.images, ...newFiles]

    // Set component state
    component.setState(prevState => ({
        ...prevState,
        posting: {
            ...prevState.posting,
            images: newImages
        }
    }))
}

/**
 * Create a posting to the server.
 * @param {*} component 
 */
function submitPosting(component) {
    console.log("submit")
    console.log(component.state)
    // Collect inputs from state

    // Post to server

    // Redirect to Profile
}

export { handleInputChange, handleImageUpload, submitPosting }