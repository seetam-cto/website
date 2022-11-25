import React, {useState, useEffect} from 'react'
import { motion } from 'framer-motion'

const NavigationRail = ({settings, close}) => {
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
        </motion.div>
    </div>
  )
}

export default NavigationRail