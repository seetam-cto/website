import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavigationRail from '../NavigationRail'
import { AnimatePresence } from 'framer-motion'

const Header = ({theme = "light",headerSettings}) => {
    const [navrail, setNavrail] = useState(false)
    return (
        <header className={theme}>
            <div className={`navbar ${theme}`}>
                <div className="row">
                    <div className="col-2 col-md-3 col-sm-6">
                        <div className="navbar-logo">
                            <Link href={"/"}>
                                <a>
                                <Image
                                objectFit={"cover"}
                                quality={100}
                                width={1000}
                                height={200}
                                    src={headerSettings.general.logo}
                                />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="col-9 col-md-9 d-m-none">
                        <div className="navbar-menu">
                            {headerSettings && headerSettings.general.menu.map((item, i) => (
                                <div key={i} className="navbar-menu-item">
                                    {item.submenu.length > 0 ? (
                                            <div className='dropdown'>
                                                <Link href={item.url}>
                                                    <a className="dropdown-title">{item.title}</a>
                                                </Link>
                                                <ul className="dropdown-list">
                                                    {item.submenu.map((sub, ix) => (
                                                        <li key={ix}>
                                                            <Link href={sub.url}>
                                                                <a>{sub.title}</a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <Link href={item.url}>
                                                <a>{item.title}</a>
                                            </Link>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-1 d-m-none"></div>
                    <div className="col-sm-6 d-flex justify-end align-center">
                        <button onClick={() => setNavrail(true)} className="navbar-mobile-btn">
                        <i className='bx bx-menu'></i>
                        </button>
                    </div>
                    {/* <div className="col-2 col-m-6">
                        <div className="navbar-user">
                            <div className="navbar-user-greet">
                                <span>Hey Guest!</span> <i className='bx bx-user-circle' ></i>
                            </div>
                            <div className="navbar-user-currency">
                                INR
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <AnimatePresence>
                {navrail && <NavigationRail close={setNavrail} settings={headerSettings.general} />}
            </AnimatePresence>
        </header>
    )
}

export default Header