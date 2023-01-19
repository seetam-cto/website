import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavigationRail from '../NavigationRail'
import { AnimatePresence } from 'framer-motion'
import { Col, Row, Dropdown, Button, Space, Tooltip, Modal } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { getFavourites } from '../../store/states'
import { useSession, signIn, signOut } from 'next-auth/react'

const Header = ({theme = "light",headerSettings}) => {
    const [navrail, setNavrail] = useState(false)
    const [favourites, setFavourites] = useState(false)
    const [favs] = useAtom(getFavourites)
    const router = useRouter()
    const {data: session} = useSession()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
    setIsModalOpen(false);
    };
    const handleCancel = () => {
    setIsModalOpen(false);
    };
    
    return (
        <header className={theme}>
            <div className="navbar-container">
                <div className={`navbar ${theme}`}>
                    <Row>
                        <Col xs={10} md={4}>
                            <Link href={"/"}>
                                <a className='navbar-logo-link'>
                                <Image
                                objectFit={"contain"}
                                quality={100}
                                width={1000}
                                height={300}
                                src={headerSettings.general.logo}
                                />
                                </a>
                            </Link>
                        </Col>
                        <Col xs={0} md={12} offset={2}>
                            <div className="navbar-menu">
                            {headerSettings && headerSettings.general.menu.map((item, i) => 
                                (
                                    <span key={i}>
                                    {item.submenu.length > 0 ? (
                                        <Dropdown
                                        key={i}
                                        menu={{
                                            items: item.submenu.map((sm, x) => {return {
                                                key: `${x}`,
                                                label: <Button onClick={() => router.push(sm.url)} type="link">{sm.title}</Button>
                                            }})
                                        }}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Button onClick={() => router.push(item.url)} type="link" size="large">{item.title}</Button>
                                                <DownOutlined />
                                            </Space>
                                            </a>
                                        </Dropdown>
                                    ) : (   
                                        <Button  onClick={() => router.push(item.url)} size='large' key={i} type="link">{item.title}</Button>
                                    )}
                                    </span>
                                )
                            )}
                            </div>
                        </Col>
                        <Col xs={0} md={6}>
                            <div className="navbar-user">
                            <Tooltip title="Favourites" placement='bottom'>
                                    <Button onMouseEnter={() => setFavourites(true)} onMouseLeave={() => setFavourites(false)}
                                    className='navbar-user-favourites'>
                                        {favs.length > 0 && 
                                        <span className='navbar-user-favourites-badge'>
                                            {favs.length}
                                        </span>}
                                        <i className={`fa-${favourites ? "solid" : "regular"} fa-heart`}></i>
                                    </Button>
                            </Tooltip>
                            {session ? <Space>
                                <span>Welcome, {session.user.email}</span>
                                <Button onClick={() => signOut()}>Sign Out</Button>
                            </Space>
                            : <Button onClick={showModal} size='large' type='primary' style={{borderRadius: 50}} icon={<UserOutlined />}>Login</Button>
                            }
                            </div>
                        </Col>
                        <Col xs={14} md={0}>
                            <div className="navbar-user">
                                <Button className='navbar-user-mobile'><i className="fa-solid fa-heart"></i></Button>
                                <Button onClick={() => setNavrail(true)} className='navbar-user-mobile'>
                                    <i className="fa-solid fa-layer-group"></i>
                                    {/* <i class="fa-solid fa-bars"></i> */}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <AnimatePresence>
                {navrail && <NavigationRail close={setNavrail} settings={headerSettings.general} />}
            </AnimatePresence>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Button type='primary' onClick={() => signIn()}>Sign In</Button>
            </Modal>
        </header>
    )
}

export default Header