import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from "framer-motion"
import Link from 'next/link'
import { Row, Col, Button } from 'antd'
import cookie from "../../assets/images/cookies.png"
import { atomWithStorage } from 'jotai/utils'
import { useAtom } from 'jotai'

const cookieConcent = atomWithStorage('cookieConcent', false)

const Footer = ({footer, general}) => {
    const [ckc, setCkc] = useAtom(cookieConcent)
  return (
    <AnimatePresence>
   {!ckc &&  <motion.div
   key={'cookie-box'}
   initial={{opacity: 0, y: 300}}
   animate={{opacity: 1, y: 0}}
   exit={{opacity: 0, y: 300, transition: {delay: 0}}}
   transition={{delay: 3, duration: 1}}
   className="footer-cookies">
        <div className="container" style={{display: 'flex', justifyContent: 'center'}}>
            <div className="footer-cookies-box">
                <div className="footer-cookies-title">
                    <Image src={cookie.src} width={40} height={40} />
                    <h2>Cookie Consent</h2>
                </div>
                <h3>You agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and improve marketing.</h3>
                <div className="footer-cookies-buttons">
                    <Button onClick={() => setCkc(true)} shape='round' size='large' type='primary'>I Understand</Button>
                    <Button size='large' type='link'>Learn More</Button>
                </div>
            </div>
        </div>
    </motion.div>}
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
                        {/* <a href={`tel:${general.contact.phone}`} className="footer-cta-call">
                            <i className="fa-solid fa-phone-volume"></i>
                            <span>{general.contact.phone}</span>
                        </a> */}
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
    </AnimatePresence>
  )
}

export default Footer