import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { Row, Space, Dropdown, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const NavigationRail = ({settings, close}) => {
    const router = useRouter()
    return (
        <div className="navigationrail">
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            key={"navrail-overlay"}
            className="navigationrail-overlay" />
            <motion.div
            key={"navrail-content"}
            initial={{x: '100%', opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: '100%', opacity: 0}}
            transition={{duration: 0.5, bounce: 0.4, type: "spring"}}
            className="navigationrail-content">
                <div className="row">
                    <div className="col-sm-8">
                        <img className='navigationrail-logo' src={settings.logo} alt="" />
                    </div>
                    <div className="col-sm-4">
                        <div className="d-flex justify-end">
                            <button onClick={() => close(false)} className="navbar-mobile-btn">
                                <i className='bx bx-x'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <Space style={{width: '100%', marginTop: 20}} direction='vertical'>
                    {settings && settings.menu.map((item, i) => 
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
                                        <Button type="link" size="large">{item.title}</Button>
                                        <DownOutlined />
                                    </Space>
                                    </a>
                                </Dropdown>
                            ) : (   
                                <Button block
                                className={`navbar-menu-mobile-item ${router.pathname === item.url && 'active'}` }
                                style={{textAlign: 'left'}} onClick={() => router.push(item.url)} size='large' key={i} >{item.title}</Button>
                            )}
                            </span>
                        )
                    )}
                </Space>
            </motion.div>
        </div>
    )
}

export default NavigationRail