import {atom} from "jotai"
import { atomWithStorage } from 'jotai/utils'

export const favourites = atomWithStorage("favourites", [])
export const getFavourites = atom((get) => get(favourites))

export const auth = atomWithStorage('auth', {
    token: '',
    user: {
        _id: '',
        name: '',
        email: '',
        phone_number: '',
        profile_image: '',
        user_type: '',
    }
})
export const getAuth = atom((get) => get(auth))