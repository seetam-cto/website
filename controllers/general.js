import axios from "axios"

export const getSettings = async () => 
    await axios.get(`${process.env.REACT_APP_API}/settings`)