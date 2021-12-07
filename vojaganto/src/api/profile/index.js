import * as http from "utils/http"


export async function fetchProfile(uid) {
    try {
        const { response, body } = await http.get(`/api/user/${uid}`)
        if (response.status === 200) {
            return body
        } else {
            return null
        }
    } catch (err) {
        throw err
    }
}


export async function updateProfile(uid, formData) {
    const origin = process.env.REACT_APP_ORIGIN || window.location.protocol + "//" + window.location.host
    const url = new URL(origin + `/api/user/${String(uid)}`)

    try {
        const response = await fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: formData
        })
        if (response.status === 200) {
            return await response.json()
        } else {
            throw "Request upload failed"
        }
    } catch (err) {
        throw err
    }
}
