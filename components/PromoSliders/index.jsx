'use client';

import { Button, Col, Row, Tooltip, message } from 'antd';
import Image from 'next/image';
import React, {useState, useEffect} from 'react'
import { A11y, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EnvironmentOutlined, StarFilled, StarOutlined, CheckCircleFilled} from '@ant-design/icons';
import { useAtom } from 'jotai';
import {favourites, getFavourites } from '../../store/states';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'
import { getUserToken, loginPopupState, userData } from '../Header';
import { favList } from '../../controllers/general';
import { getDistance } from 'geolib';
import {motion} from "framer-motion"

export const PropertyCard = ({data}) => {
    const calcRating = (ratings) => {
        if(ratings.length > 0){
            return <>{(ratings.map((r) => r.rate).reduce((x,y) => x+y, 0)/ratings.length).toString()} ({(ratings.length).toString()})</>
        }else{
            return <>0.0 (0)</>
        }
    }
    const {data: session, status} = useSession()
    const [userToken, setUserToken] = useAtom(userData)
    const [isFav, setIsFav] = useState(userToken.user.favourites.includes(data._id))
    const router = useRouter()
    const [isOpen, setIsOpen] = useAtom(loginPopupState)

    const userUpdate = async (list) => {
        try{
            let res = await favList({list}, userToken.token)
            let {data} = res
            setUserToken({...userToken, user: {...userToken.user, favourites: data}})
        }catch(err){
            console.log(err)
            message.error("Cant Add to Favs!")
        }
    }

    useEffect(() => {
        if(userToken?.token){
            if(isFav){
                if(!userToken.user.favourites.includes(data._id)){
                  let newFav = [...userToken.user.favourites, data._id]
                  setUserToken({...userToken, user: {...userToken.user, favourites: newFav}})
                  userUpdate(newFav)
                }
            }else{
                setUserToken({...userToken, user: {...userToken.user, favourites: userToken.user.favourites.filter((prop) => prop != data._id)}})
                userUpdate(userToken.user.favourites.filter((prop) => prop != data._id))
            }
        }
      },[isFav])
    
    const handleFav = () => {
    if(userToken.token){
        setIsFav(!isFav)
    }else{
        setIsOpen(true)
    }
    }
    return (
        <div className="promo-slider-card">
           <div className="promo-slider-card-images">
                <Swiper
                modules={[A11y, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                speed={1000}
                navigation={{clickable: true}}
                >
                    {data.gallery?.photos?.filter((ph) => ph !== null).map((g, i) => (
                        <SwiperSlide key={i} style={{display: 'block'}}>
                            <img src={g} alt='' />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="promo-slider-card-images-overlay" />
            </div>
            <div className="promo-slider-card-content">
                <div className="promo-slider-card-title">
                    <Tooltip title={data.nameLocation.name}>
                        {data.nameLocation.name.slice(0, 22)}{data.nameLocation.name.length > 22 && "..."}
                    </Tooltip>
                </div>
                <div className="promo-slider-card-location">
                    <EnvironmentOutlined /> {data.nameLocation.address.locality}, {data.nameLocation.address.state}
                </div>
                <div className="promo-slider-card-price">
                <span>from</span> &nbsp; ₹{data.pricingCalendar.pricePerNight.toLocaleString('en-IN')}<span>/night</span>
                </div>
                {/* <div className="promo-slider-card-rating">
                    <StarFilled /> <text>{calcRating(data.rating)}</text>
                </div> */}
                <div onClick={() => handleFav()} className="locations-property-favourite">
                    <i style={{color: isFav ? '#ee5151' : 'white'}} className={`fa-${isFav ? 'solid active' : 'regular'} fa-heart`}></i>
                </div>
                <Button size='large' type={"primary"} onClick={() => router.push(`/property/${data._id}`)} shape='round'>Book Now</Button>
            </div>
        </div>
    )
}

export const SearchPropertyCard = ({setLoc, active, data}) => {
    const calcRating = (ratings) => {
        if(ratings.length > 0){
            return <>{(ratings.map((r) => r.rate).reduce((x,y) => x+y, 0)/ratings.length).toString()} ({(ratings.length).toString()})</>
        }else{
            return <>0.0 (0)</>
        }
    }

    const [userLocation, setUserLocation] = useState({
        latitude: 12.4244,
        longitude: 75.7382,
    }) 

    useEffect(() => {
        if(navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
        }
    },[])

    const {data: session, status} = useSession()
    const [userToken, setUserToken] = useAtom(userData)
    const [isFav, setIsFav] = useState(userToken.user.favourites.includes(data._id))
    const router = useRouter()
    const [isOpen, setIsOpen] = useAtom(loginPopupState)

    const userUpdate = async (list) => {
        try{
            let res = await favList({list}, userToken.token)
            let {data} = res
            setUserToken({...userToken, user: {...userToken.user, favourites: data}})
        }catch(err){
            console.log(err)
            message.error("Cant Add to Favs!")
        }
    }

    useEffect(() => {
        if(userToken?.token){
            if(isFav){
                if(!userToken.user.favourites.includes(data._id)){
                  let newFav = [...userToken.user.favourites, data._id]
                  setUserToken({...userToken, user: {...userToken.user, favourites: newFav}})
                  userUpdate(newFav)
                }
            }else{
                setUserToken({...userToken, user: {...userToken.user, favourites: userToken.user.favourites.filter((prop) => prop != data._id)}})
                userUpdate(userToken.user.favourites.filter((prop) => prop != data._id))
            }
        }
      },[isFav])
    
    const handleFav = () => {
    if(userToken.token){
        setIsFav(!isFav)
    }else{
        setIsOpen(true)
    }
    }
    return (
        <motion.div
        initial={{opacity: 0, x: -100}}
        whileInView={{opacity: 1, x: 0}}
        className={`promo-slider-card-wide-container ${active ? 'active' : ''}`}>
            <div onMouseEnter={() => setLoc(data._id)} onMouseLeave={() => setLoc('')} className={`promo-slider-card-wide ${active ? 'active' : ''}`}>
            <div className="promo-slider-card-wide-images ">
                    <Swiper
                    modules={[A11y, Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={1000}
                    navigation={{clickable: true}}
                    >
                        {data.gallery?.photos?.filter((p) => p !== null).map((g, i) => (
                            <SwiperSlide key={i} style={{display: 'block'}}>
                                <img src={g} alt='' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="promo-slider-card-wide-images-overlay" />
                </div>
                <div className="promo-slider-card-wide-content">
                    <div onClick={() => router.push(`/property/${data._id}`)} className="promo-slider-card-wide-content-click" />
                    <div className="promo-slider-card-wide-content-inner">
                        <div className="promo-slider-card-wide-title">
                            <Tooltip title={data.nameLocation.name}>
                                {data.nameLocation.name}
                            </Tooltip>
                        </div>
                        <div className="promo-slider-card-wide-location">
                            <EnvironmentOutlined /> {data.nameLocation.address.locality}, {data.nameLocation.address.state}
                        </div>
                        <div className="promo-slider-card-wide-price">
                        <span>from</span> &nbsp; ₹{data.pricingCalendar.pricePerNight.toLocaleString('en-IN')}<span>/night</span>
                        </div>
                        <p className="promo-slider-card-wide-distance">Around <span>{(getDistance(userLocation, {latitude: data.nameLocation.address.map.lat, longitude: data.nameLocation.address.map.lng})/1000).toFixed(0)}km</span> away from you.</p>
                        {/* <div className="promo-slider-card-wide-rating">
                            <StarFilled /> <text>{calcRating(data.rating)}</text>
                        </div> */}
                    </div>
                    <div onClick={() => handleFav()} className="locations-property-favourite bottom">
                        <i style={{color: isFav ? '#ee5151' : 'white'}} className={`fa-${isFav ? 'solid active' : 'regular'} fa-heart`}></i>
                    </div>
                </div>
            </div>
            <Tooltip title={<>SwitchOff Verified <CheckCircleFilled /></>}>
                <div className={`promo-slider-card-wide-verified`}><CheckCircleFilled className='promo-slider-card-wide-verified-icon'/></div>
            </Tooltip>
            <div className={`promo-slider-card-wide-verified-back`} />
        </motion.div>
    )
}

const PromoSlider = ({data}) => {
  return (
    <section className="promo-slider">
        <div className="container">
            <Row>
                <Col span={24} style={{padding: 0}}>
                    <h2 className="promo-slider-title">{data.title}</h2>
                    <p className='promo-slider-subtitle'>{data.subTitle}</p>
                    <div className="promo-slider-slides">
                        <Swiper
                        modules={[A11y, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        speed={1000}
                        navigation={{clickable: true}}
                        breakpoints={{
                            360: {
                                slidesPerView: 1,
                                slidesPerGroup: 1
                            },
                            768: {
                                spaceBetween: 20,
                                slidesPerView: 2,
                                slidesPerGroup: 2
                            },
                            1024: {
                                spaceBetween: 20,
                                slidesPerView: 4,
                                slidesPerGroup: 1
                            }
                        }}
                        >
                            {data.list?.map((property, i) => (
                                <SwiperSlide key={i}>
                                    <PropertyCard data={property} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Col>
            </Row>
        </div>
    </section>
  )
}

export default PromoSlider