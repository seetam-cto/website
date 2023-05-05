import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { useAtom } from "jotai"
import { credsData, userData } from "../../../components/Header"
import { login } from "../../../controllers/general"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.REACT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.REACT_GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
              const [uCreds, setUCreds] = useAtom(credsData)
              const [user, setUser] = useAtom(userData)
              try{
                const res = await login({email: uCreds.email, password: uCreds.password})
                const {data} = res
                setUser(data)
              }catch(err){
                console.log(err)
              }
              // If no error and we have user data, return it
              if (user.init && user.token) {
                return user
              }
              // Return null if user data could not be retrieved
              return null
            }
          })
    ],
    secret: process.env.JWT_SECRET,
})