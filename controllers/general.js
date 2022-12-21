import axios from "axios"

export const getSettings = async () => {
    let settings = await axios.get(`${process.env.REACT_APP_API}/settings/all`).then((res) => {return res.data})
    let properties = await axios.get(`${process.env.REACT_APP_API}/properties`).then((res) => {return res.data})
    let banners = await axios.get(`${process.env.REACT_APP_API}/banners`).then((res) => {return res.data})
    return {settings, properties, banners}
}

// await axios.get(`${process.env.REACT_APP_API}/settings`).then((res) => {return res.data})

export const getProperties = async () => {
    await axios.get(`${process.env.REACT_APP_API}/properties`).then((res) => {return res.data})
}

export const client = axios.create({
    auth: {
        username: process.env.REACT_WP_USER,
        password: process.env.REACT_WP_PASS
    }
  });

export const getPropertyDetails = async (id) => {
    let property = await axios.get(`${process.env.REACT_APP_API}/property/${id}`).then((res) => {return res.data})
    let rooms = await axios.get(`${process.env.REACT_APP_API}/properties/${id}/rooms`).then((res) => {return res.data})
    let settings = await axios.get(`${process.env.REACT_APP_API}/settings/all`).then((res) => {return res.data})
    // let banners = await axios.get(`${process.env.REACT_APP_API}/settings/banners`).then((res) => {return res.data})
    let amenities1 = await client.get(`${process.env.REACT_WP_API}/accommodation_types/amenities?per_page=100&page=1`).then((res) => {return res.data})
    let amenities2 = await client.get(`${process.env.REACT_WP_API}/accommodation_types/amenities?per_page=100&page=2`).then((res) => {return res.data})
    let amenities = [...amenities1, ...amenities2]
    return {property, rooms, settings, amenities}
}

export const getRooms = async (id) => {
    let rooms = await axios.get(`https://stage.switchoff.in/api/properties/${id}/rooms`).then((res) => {return res.data})
    return rooms
}