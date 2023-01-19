import React, {useState, useEffect, useRef} from 'react'
import {motion} from "framer-motion"
import Image from 'next/image'
import { Col, Row, Tabs, Button } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper';
import { useAtom } from 'jotai';
import {favourites, getFavourites } from '../../store/states';

export const PropertyCard = ({property}) => {
  const [favs, setFavs] = useAtom(favourites)
  const [isFav, setIsFav] = useState(favs.includes(property._id))

  useEffect(() => {
    if(isFav){
      if(!favs.includes(property._id)){
        let newFav = [...favs, property._id]
        setFavs(newFav)
      }
    }else{
      setFavs(favs.filter((prop) => prop != property._id))
    }
  },[isFav])

  const handleFav = () => {
    setIsFav(!isFav)
  }
  return (
    <div className="locations-property">
      <img
      src={property.gallery.photos[0]}
      alt=""
      className="locations-property-background" />
      <div className="locations-property-background-overlay"/>
      <div onClick={() => handleFav()} className="locations-property-favourite">
        <i style={{color: isFav ? '#ee5151' : 'white'}} className={`fa-${isFav ? 'solid' : 'regular'} fa-heart`}></i>
      </div>
      <div className="locations-property-content">
        <div>
        <h2>{property.nameLocation.name}</h2>
        <div className="locations-property-content-price">
          From <span>₹{property.pricingCalendar.pricePerNight}</span> / per night
        </div>
        </div>
        <div className="locations-property-content-footer">
          <Button icon={<i className="fa-solid fa-location-dot"></i>}>{property.nameLocation.address.locality}</Button>
          <Button icon={<i className="fa-solid fa-star"></i>}>4.7</Button>
        </div>
      </div>
    </div>
  )
}

const PropertyGrid = ({properties}) => {
  return (
    <Swiper
    modules={[ A11y, Navigation ]}
    spaceBetween={20}
    slidesPerView={1}
    speed={1000}
    navigation={{ clickable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    breakpoints={{
      360: {
        slidesPerView: 1
      },
      768: {
        spaceBetween: 20,
        slidesPerView: 2
      },
      1024: {
        spaceBetween: 20,
        slidesPerView: 4
      }
    }}
    >
      {properties.map((property, i) => (
        <SwiperSlide key={i}>
          <PropertyCard property={property} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

const LocationProps = ({locations, properties}) => {
  const [tabs, setTabs] = useState([])
  const createPropTabs = () => {
    let newLocation = locations.list.map((loc) => {
      return {
        key: loc.name,
        value: properties.filter((prop) => prop.nameLocation.address.locality === loc.name || prop.nameLocation.address.state === loc.name).length
      }
    })
    let sortedList = newLocation.sort((a,b) => b.value - a.value)
    let newlist = sortedList.map((loc, i) => {
      return {
        label: loc.key,
        key: i,
        children: <PropertyGrid properties={properties.filter((prop) => 
                    prop.nameLocation.address.locality === loc.key || 
                    prop.nameLocation.address.state === loc.key
                  )} />
      }
    })
    setTabs(newlist)
  }
  useEffect(() => {
    createPropTabs()
  },[])
  return (
    <div className="locations">
      <div className="container">
        <Row>
          <Col span={24}>
            <h2 className='locations-title'>{locations.title}</h2>
            <p className='locations-subtitle'>{locations.subTitle}</p>
          </Col>
          <Col span={24}>
            <Tabs
            defaultActiveKey='0'
            items={tabs}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LocationProps