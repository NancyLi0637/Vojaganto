import * as api from "api/posting"
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

    // TODO: upload image

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




function handleDeleteImage(component, index) {
    const newImages = [...component.state.posting.images];
    newImages.splice(index, 1);

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
async function submitPosting(component) {
    // Collect inputs from state
    const data = component.state.posting
    // Post to server
    try {
        if ("_id" in data) {
            // Update a posting
            console.log(`Updating posting #${data._id}`, data)
            const response = await api.updatePosting(data)
            return response
        } else {
            // Create a new posting
            console.log(`Creating new posting`, data)
            const response = await api.createPosting(data)
            return response
        }

    } catch (err) {
        throw err
    }

    // Redirect to Profile
}

async function deletePosting(component, pid) {
    if (pid !== undefined) {
        try {
            const response = await api.deletePosting(pid)
            console.log(`DELETED Posting ${pid}`, response)
            return response
        } catch (err) {
            throw err
        }
    } else {
        // Empty draft
        console.log("DELETED new posting")
        return null
    }
}

/**
 * Fill the component state with old posting by pid.
 * @param {React.Component} component 
 * @param {*} pid 
 */
async function setPostingData(component, pid) {
    try {
        const oldPosting = await api.getPosting(pid)
        console.log(`Get oldPosting ${pid}`, oldPosting)
        component.setState({ new: false, posting: oldPosting })
    } catch (err) {
        throw err
    }
}



export {
    handleInputChange,
    handleImageUpload,
    handleDeleteImage, 
    submitPosting, 
    deletePosting,
    setPostingData
}