import {atom} from "jotai"
import { atomWithStorage } from 'jotai/utils'

export const auth = atomWithStorage('auth', {
    token: '',
    user: {
        _id: '',
        name: '',
        email: '',
        phone_number: '',
        profile_image: '',
        user_type: '',
        favourites: []
    }
})
export const getAuth = atom((get) => get(auth))