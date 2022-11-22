import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import Link from 'next/link'

const Footer = ({footer, general}) => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-12 col-sm-12 d-flex justify-center">
                    <div className="footer-logo">
                        <Image width={200} height={75} objectFit={"contain"} src={general.logo} />
                        <ul className='footer-social'>
                            <li><i className='bx bxl-facebook-square' ></i></li>
                            <li><i className='bx bxl-instagram-alt' ></i></li>
                            <li><i className='bx bxl-twitter' ></i></li>
                            <li><i className='bx bxl-trip-advisor' ></i></li>
                        </ul>
                    </div>
                </div>
                {/* <div className="col-md-3 col-sm-6">
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
                </div> */}
                {/* <div className="col-md-3 col-sm-6">
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
                </div> */}
                {/* <div className="col-md-4 col-sm-12">
                    <p>SUBSCRIBE</p>
                    <ul className="footer-links">
                        <li>
                            Subscribe to our newsletter, so that you can be the first to know about new offers and promotions.
                        </li>
                    </ul>
                    <div className="row d-flex align-center">
                        <div className="col-12">
                            <div className="form-group footer-subscribe">
                                <label className="form-label">&nbsp;</label>
                                <input type="text"
                                placeholder='Enter Email Address'
                                className="form-control" />
                                <button className="form-button explore explore-footer">
                                    Send
                                    <i className='bx bxs-paper-plane' ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="row footer-copyright">
                © 2022 All Rights Reserved | Okay Done
            </div>
        </div>
    </footer>
  )
}

export default Footer