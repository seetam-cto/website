import React, {useState, useEffect, useRef} from 'react'
import {motion} from "framer-motion"
import Image from 'next/image'

const PropertyBox = ({prop, i}) => {
  return (
    <div key={i} className="col-3 col-m-12 gap-s">
      <div className="locations-properties-box">
        <div className="locations-properties-box-cover">
          <div className="background">
            <Image src={prop.gallery.cover_image} width={500} height={375} objectFit={"cover"} />
            <div className="overlay"></div>
          </div>
          <div className="top">
            <div className="d-flex align-center">
              <i className='bx bx-map'></i>
              {prop.basic_info.address.state}
            </div>
            <i className='bx bxs-hot'></i>
          </div>
          <div className="bottom">
            <i className='bx bxs-star'></i> {4.2}
          </div>
        </div>
        <div className="locations-properties-box-content">
          <div className="title">
            <i className='bx bx-buildings' ></i>
            <h4>{`${prop.nameLocation.name.substring(0,20)} ${prop.NameLocation.name.length > 20 ? '...' : ''}`}</h4>
          </div>
          <div className="price">
            <span className="mrp">₹30,000</span>
            <span className="sale">₹27,000</span>
            <span>•</span>
            <span>Night</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const LocationProps = ({locations, properties}) => {
  return (
    <motion.div className="locations">
        <div className="locations-container">
            <div className="locations-title">
                {locations.title}
            </div>
            <div className="locations-subtitle">
                {locations.subTitle}
            </div>
            <div className="locations-properties">
              <div className="container">
              <div className="row">
                {properties.slice(0,8).map((prop,i) => (
                  <PropertyBox prop={prop} key={i} i={i} />
                ))}
              </div>
              </div>
            </div>
        </div>
    </motion.div>
  )
}

export default LocationProps