import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavigationRail from '../NavigationRail'
import { AnimatePresence } from 'framer-motion'
import { Col, Row, Dropdown, Button, Space } from 'antd'
import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'

const Header = ({theme = "light",headerSettings}) => {
    const [navrail, setNavrail] = useState(false)
    const router = useRouter()
    return (
        <header className={theme}>
            <div className="navbar-container">
            <div className={`navbar ${theme}`}>
                <Row>
                    <Col span={4}>
                        <Link href={"/"}>
                            <a>
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
                    <Col span={12} offset={2}>
                        <div className="navbar-menu">
                        {headerSettings && headerSettings.general.menu.map((item, i) => 
                            (
                                <>
                                {item.submenu.length > 0 ? (
                                    <Dropdown
                                    key={i}
                                    menu={{
                                        items: item.submenu.map((sm, x) => {return {
                                            key: `${x}`,
                                            label: <Button  onClick={() => router.push(sm.url)} type="link">{sm.title}</Button>
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
                                </>
                            )
                        )}
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="navbar-user">
                        <Button size='large' type='primary' style={{borderRadius: 50}} icon={<UserOutlined />}>Login</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            </div>
            <AnimatePresence>
                {navrail && <NavigationRail close={setNavrail} settings={headerSettings.general} />}
            </AnimatePresence>
        </header>
    )
}

export default Header