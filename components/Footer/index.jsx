import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import Link from 'next/link'

const Footer = ({footer, general}) => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div className="footer-logo">
                        <Image width={200} height={75} src={footer.logo} />
                        <ul className='footer-social'>
                            <li><i class='bx bxl-facebook-square' ></i></li>
                            <li><i class='bx bxl-instagram-alt' ></i></li>
                            <li><i class='bx bxl-twitter' ></i></li>
                            <li><i class='bx bxl-trip-advisor' ></i></li>
                        </ul>
                    </div>
                </div>
                <div className="col-3">
                    <p>QUICK LINKS</p>
                    <ul className='footer-links'>
                        {footer.quickLinks.map((l, i) => (
                            <li key={i}>
                                <Link href={l.link}>
                                    <a>{l.text}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-3">
                    <p>POLICY</p>
                    <ul className='footer-links'>
                        {footer.quickLinks.map((l, i) => (
                            <li key={i}>
                                <Link href={l.link}>
                                    <a>{l.text}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-3">
                    <p>SUBSCRIBE</p>
                    <ul className="footer-links">
                        <li>
                            Subscribe to our newsletter, so that you can be the first to know about new offers and promotions.
                        </li>
                    </ul>
                    <div className="row d-flex align-center">
                        <div className="col-12">&nbsp;</div>
                        <div className="col-10">
                            <div className="form-group">
                                <input type="text"
                                placeholder='Enter Email Address'
                                className="form-control" />
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <button className="form-button explore explore-footer">
                                    Send
                                    <i class='bx bxs-paper-plane' ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row footer-copyright">
                © 2022 All Rights Reserved | Okay Done
            </div>
        </div>
    </footer>
  )
}

export default Footer