import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { atom, useAtom } from 'jotai'
import { Modal } from 'antd'

export const loginModalOpen = atom(true)

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(loginModalOpen)
    const {data: session} = useSession()
    return (
      <Modal
      open={isModalOpen}
      onCancel={setIsModalOpen(false)}
      >
        Hi
      </Modal>
    )
}

export default Login