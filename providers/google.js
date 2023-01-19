import GoogleProvider from "next-auth/providers/google"

GoogleProvider({
    clientId: process.env.REACT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.REACT_GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  })