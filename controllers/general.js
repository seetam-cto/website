import axios from "axios"

export const getSettings = async () => {
    let settings = await axios.get(`${process.env.REACT_APP_API}/settings`).then((res) => {return res.data})
    let properties = await axios.get(`${process.env.REACT_APP_API}/properties`).then((res) => {return res.data})
    return {settings, properties}
}

// await axios.get(`${process.env.REACT_APP_API}/settings`).then((res) => {return res.data})

export const getProperties = async () => {
    await axios.get(`${process.env.REACT_APP_API}/properties`).then((res) => {return res.data})
}

export const getPropertyDetails = async (id) => {
    let property = await axios.get(`${process.env.REACT_APP_API}/property/${id}`).then((res) => {return res.data})
    let rooms = await axios.get(`${process.env.REACT_APP_API}/properties/${id}/rooms`).then((res) => {return res.data})
    return {property, rooms}
}

export const getRooms = async (id) => {
    await axios.get(`${process.env.REACT_APP_API}/properties/${id}/rooms`).then((res) => {return res.data})
}