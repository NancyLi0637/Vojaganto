import * as http from "utils/http"
import { redirectToPage } from "actions"

/**
 * Upload posting image.
 * @param {*} data Form data.
 * @returns image object
 */
export async function uploadPostingImage(formData) {
    const origin = process.env.REACT_APP_ORIGIN || window.location.protocol + "//" + window.location.host
    const url = new URL(origin + "/api/posting/image")

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: formData
        })
        if (response.status === 200) {
            return await response.json()
        } else if (response.status === 401) {
            alert("Session expired, please login again!")
            redirectToPage('/')
            return null
        } else {
            throw "Request upload failed"
        }
    } catch (err) {
        throw err
    }
}

/**
 * Delete a posting image.
 * @param {*} data Form data.
 * @returns image object
 */
export async function deletePostingImage(data) {
    try {
        const { response, body } = await http.del(`/api/posting/image`, data)
        if (response.status === 200) {
            return body
        } else if (response.status === 401) {
            alert("Session expired, please login again!")
            redirectToPage('/')
            return null
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}