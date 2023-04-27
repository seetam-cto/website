import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { atom, useAtom } from 'jotai'

export const loginModalOpen = atom(true)

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(loginModalOpen)
    const {data: session} = useSession()
    return (
      <div>Login</div>
    )
}

export default Login