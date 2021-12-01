import * as http from "utils/http"

import avatar from "assets/images/66385278_p8.jpg";
const profileInfo = {
    _id: "userid",
    avatar: avatar,
    username: "user",
    name: "User Doe",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate exercitationem facilis molestias sunt similique, quae doloremque commodi quisquam, aperiam nisi fugit, atque quo itaque? Fugiat consequatur quia beatae ipsum sit.",
};

export async function fetchProfile(uid) {
    try {
        // const response = await http.get(`/api/profile/${uid}`)

        const response = profileInfo

        return response
    } catch (err) {
        throw err
    }
}


export async function updateProfile(uid, body) {
    try {
        // const response = await http.put(`/api/profile/${String(uid)}`, body)
        const response = body
        return response
    } catch(err){
        throw err
    }
}
