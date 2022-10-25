import React, {useState, useEffect, useRef} from 'react'
import {motion} from "framer-motion"

const LocationProps = ({locations}) => {
  return (
    <motion.div className="locations">
        <div className="locations-container">
            <div className="locations-title">
                {locations.title}
            </div>
            <div className="locations-subtitle">
                {locations.subTitle}
            </div>
        </div>
    </motion.div>
  )
}

export default LocationProps