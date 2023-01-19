import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const Login = () => {
    const {data: session} = useSession()
  return (
    <div>Login</div>
  )
}

export default Login