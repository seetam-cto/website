import {atom} from "jotai"
import { atomWithStorage } from 'jotai/utils'

export const favourites = atomWithStorage("favourites", [])
export const getFavourites = atom((get) => get(favourites))