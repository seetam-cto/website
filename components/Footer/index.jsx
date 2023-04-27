import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import Link from 'next/link'
import { Row, Col } from 'antd'

const Footer = ({footer, general}) => {
  return (
    <footer className="footer">
        {/* <div className="footer-bg">
            <div className="footer-bg-overlay" />
        </div> */}
        <div className="footer-content">
        <div className="footer-top">
            <div className="container">
                <Row>
                    <Col md={10}>
                        <Image className='footer-logo' src={footer.logo} width={250} height={60} />
                        <p className='footer-copyright'>Copyright © 2022 . All Rights reserved.</p>
                        <a href={`tel:${general.contact.phone}`} className="footer-cta-call">
                            <i className="fa-solid fa-phone-volume"></i>
                            <span>{general.contact.phone}</span>
                        </a>
                        <div className="footer-socials">
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#"><i className="fa-brands fa-facebook"></i></a>
                            <a href="#"><i className="fa-brands fa-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-youtube"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                        </div>
                    </Col>
                    <Col md={4}>
                        <h3 className='footer-link-title'>{footer.link1.title}</h3>
                        <ul className='footer-link'>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h3 className='footer-link-title'>{footer.link2.title}</h3>
                        <ul className='footer-link'>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h3 className='footer-link-title'>{footer.link3.title}</h3>
                        <ul className='footer-link'>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                            <li><Link href="#"><a>Sub-Link</a></Link></li>
                        </ul>                        
                    </Col>
                    <Col md={2}>

                    </Col>
                </Row>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">
                <div className="footer-bottom-box">
                <p>© SwitchOff 2023</p>
                <p>All Rights Reserved</p>
                </div>
            </div>
        </div>
        </div>
    </footer>
  )
}

export default Footer