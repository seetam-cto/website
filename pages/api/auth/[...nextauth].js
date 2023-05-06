import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    site: "https://switchoff.in/api/auth/callback/google",
    providers: [
        GoogleProvider({
            clientId: process.env.REACT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.REACT_GOOGLE_CLIENT_SECRET
        })
    ],
    secret: process.env.JWT_SECRET,
})