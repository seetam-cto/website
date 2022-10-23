import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = ({headerSettings}) => {
    return (
        <header>
            <div className="navbar">
                <div className="row">
                    <div className="col-3">
                        <div className="navbar-logo">
                            <Image
                            objectFit={"contain"}
                            width={180}
                            height={80}
                                src={headerSettings.general.logo}
                            />
                        </div>
                    </div>
                    <div className="col-7">
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
                    <div className="col-2">
                        <div className="navbar-user">
                            <div className="navbar-user-greet">
                                Hey Guest! <i className='bx bx-user-circle' ></i>
                            </div>
                            <div className="navbar-user-currency">
                                INR
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header