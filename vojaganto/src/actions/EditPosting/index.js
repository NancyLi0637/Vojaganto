import * as api from "api/posting"
import { uploadPostingImage, deletePostingImage } from "api/image"
import { redirectToPage } from "actions";

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
 * Update component state to append new image, and upload the image to server.
 * @param {*} component 
 * @param {*} event 
 */
async function handleImageUpload(component, event) {
    const target = event.target;
    const files = target.files;

    // Get uploaded images from input
    // const newFiles = [];
    // for (let f of files) {
    //     newFiles.push(URL.createObjectURL(f))
    // }
    const imageFile = files[0]

    // Create file data
    const formData = new FormData();
    formData.append(
        "image",
        imageFile,
        imageFile.name
    );

    try {
        const uploadedImage = await uploadPostingImage(formData)

        if (uploadedImage) {
            console.log("Uploaded image")
            // A copy of the new state
            const newImages = [...component.state.posting.images, uploadedImage]

            // Set component state
            component.setState(prevState => ({
                ...prevState,
                posting: {
                    ...prevState.posting,
                    images: newImages
                }
            }))
        } else {
            console.error("Failed upload image", formData)
        }
    } catch (err) {
        console.error(err)
    }
}

/**
 * Delete a image from view and server.
 * @param {*} component 
 * @param {*} index 
 */
async function handleDeleteImage(component, index) {

    const delImage = component.state.posting.images[index]

    // Send server request to delete image.
    try {
        const result = await deletePostingImage({ image: delImage })
        if (result) {
            console.log("Deleted image", result)

            // Update view
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
        } else {
            console.error("Failed delete image", result)
        }
    } catch (err) {
        console.error(err)
    }


}


/**
 * Create a posting to the server.
 * @param {*} component 
 */
async function submitPosting(component) {
    // Collect inputs from state
    const data = component.state.posting
    // Input Validation
    if (data.title.length === 0) {
        alert("Your trip should have a title!")
        return
    }
    // Post to server
    try {
        if (data._id !== undefined) {
            // Update a posting
            if (typeof data.journey === "object") {
                data.journey = data.journey._id
            }

            console.log(`Submit edit posting ${data._id}`, data)
            const editedPosting = await api.updatePosting(data._id, data)
            if (editedPosting) {
                alert("Updated trip!")
                component.props.history.push(`/trip/${String(editedPosting._id)}`)
            } else {
                console.error("Update failed", editedPosting)
            }

        } else {
            // Create a new posting
            console.log(`Submit new posting`, data)
            const newPosting = await api.createPosting(data)
            if (newPosting) {
                alert("Created new trip!")
                component.props.history.push(`/trip/${String(newPosting._id)}`)
            } else {
                console.error("Creation failed", newPosting)
            }
        }
    } catch (err) {
        console.error(err)
    }
}


/**
 * Delete a posting to the server.
 * @param {*} component 
 */
async function deletePosting(component, pid) {
    if (pid !== undefined) {
        try {
            const response = await api.deletePosting(pid)
            if (response) {
                console.log(`DELETED Posting ${pid}`, response)
                alert("Deleted posting.")
                component.props.history.push(`/profile/${String(component.props.currUser._id)}`)
            }
        } catch (err) {
            console.error(String(err))
        }
    } else {
        // Empty draft
        if (window.confirm("Are you sure you want to delete the draft?")) {
            component.props.history.push(`/profile/${String(component.props.currUser._id)}`)
        }
    }
}

/**
 * Fill the component state with old posting by pid.
 * @param {React.Component} component 
 * @param {*} pid 
 * @param {*} journeyAsId Replace journey field with ID
 */
async function setPostingData(component, pid, journeyAsId = false) {
    try {
        const oldPosting = await api.getPosting(pid)
        if (journeyAsId) {
            oldPosting.journey = oldPosting.journey._id
        }
        if (oldPosting) {
            console.log(`Get Posting ${pid}`, oldPosting)
            component.setState({ new: false, posting: oldPosting })
        } else {
            alert("Trip not found or not permitted to access!")
            redirectToPage("/")
        }

    } catch (err) {
        // throw err
        console.error(String(err))
    }
}

/**
 * Fill the component state with old posting by pid.
 * @param {React.Component} component 
 * @param {*} pid 
 */
async function getUserJourneys(component, uid) {
    try {
        const userJourneys = await api.getUserJourneys(uid)
        if (userJourneys) {
            console.log(`Get user's journeys ${uid}`, userJourneys)
            component.setState({ userJourneys })
        }

    } catch (err) {
        // throw err
        console.error(String(err))
    }
}


export {
    handleInputChange,
    handleImageUpload,
    handleDeleteImage,
    submitPosting,
    deletePosting,
    setPostingData,
    getUserJourneys
}