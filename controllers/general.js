import axios from "axios"

export const register = async (data) =>
    await axios.post(`https://stage.switchoff.in/api/register`, data)

export const login = async (data) => {
    let res = await axios.post(`https://stage.switchoff.in/api/login`, data)
    return res
}

export const socialLogin = async (data) => {
    let res = await axios.post(`https://stage.switchoff.in/api/login/social`, data)
    return res
}

export const getSettings = async () => {
    let settings = await axios.get(`${process.env.REACT_APP_API}/settings/all`).then((res) => {return res.data})
    let properties = await axios.get(`${process.env.REACT_APP_API}/properties`).then((res) => {return res.data})
    let banners = await axios.get(`${process.env.REACT_APP_API}/banners`).then((res) => {return res.data})
    return {settings, properties, banners}
}

export const getAllBlogs = async () => {
    let settings = await axios.get(`${process.env.REACT_APP_API}/settings/all`).then((res) => {return res.data})
    let blogs = await axios.get(`${process.env.REACT_APP_API}/blogs/published`).then((res) => {return res.data})
    return {settings, blogs}
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

export const getBlogsBySlug = async (slug) => {
    let properties = await axios.get(`${process.env.REACT_APP_API}/properties`).then((res) => {return res.data})
    let settings = await axios.get(`${process.env.REACT_APP_API}/settings/all`).then((res) => {return res.data})
    let blog = await axios.get(`https://stage.switchoff.in/api/blogs/slug/${slug}`).then((res) => {return res.data})
    return {settings, blog, properties}
}

export const registerVendor = async (data) => 
    await axios.post(`https://stage.switchoff.in/api/vendor/register`, data)

export const loginVendor = async (data) => 
    await axios.post(`https://stage.switchoff.in/api/vendor/login`, data)

export const favList = async (data, token) =>
    await axios.post(`https://stage.switchoff.in/api/properties/favourites`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })