import { useAtom } from "jotai";
import { getAuth } from "../store/states";
import { useEffect } from "react";

export const useCheckLogin = async () => {
    const [userAuth, setUserAuth] = useAtom(getAuth)
    useEffect(() => {
        setUserAuth(getAuth)
    },[])
    if(userAuth.token){
        return {status: true, auth: userAuth}
    }else{
        return {status: false, auth: userAuth}
    }
}