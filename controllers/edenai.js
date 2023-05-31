import axios from "axios"

export const edenAiSearch = async (data, token) =>
    await axios.post(`https://api.edenai.run/v2/text/search`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })