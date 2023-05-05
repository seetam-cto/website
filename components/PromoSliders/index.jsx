import { Button, Col, Row, Tooltip } from 'antd';
import Image from 'next/image';
import React, {useState, useEffect} from 'react'
import { A11y, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EnvironmentOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import {favourites, getFavourites } from '../../store/states';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'
import { loginPopupState } from '../Header';

const PropertyCard = ({data}) => {
    const calcRating = (ratings) => {
        if(ratings.length > 0){
            return {count: ratings.length, rating: ratings.map((r) => r.rate).reduce((x,y) => x+y, 0)/ratings.length}
        }else{
            return {count: 0, rating: 0}
        }
    }
    const {data: session, status} = useSession()
    const [favs, setFavs] = useAtom(favourites)
    const [isFav, setIsFav] = useState(favs.includes(data._id))
    const router = useRouter()
    const [isOpen, setIsOpen] = useAtom(loginPopupState)
    useEffect(() => {
        if(isFav){
          if(!favs.includes(data._id)){
            let newFav = [...favs, data._id]
            setFavs(newFav)
          }
        }else{
          setFavs(favs.filter((prop) => prop != data._id))
        }
      },[isFav])
    
      const handleFav = () => {
        if(status === "authenticated"){
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
                onSwiper={(swiper) => console.log(swiper)}
                >
                    {data.gallery?.photos?.map((g, i) => (
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
                        {data.nameLocation.name.slice(0, 25)}{data.nameLocation.name.length > 25 && "..."}
                    </Tooltip>
                </div>
                <div className="promo-slider-card-location">
                    <EnvironmentOutlined /> {data.nameLocation.address.locality}, {data.nameLocation.address.state}
                </div>
                <div className="promo-slider-card-price">
                <span>from</span> &nbsp; ₹{data.pricingCalendar.pricePerNight.toLocaleString('en-IN')}<span>/night</span>
                </div>
                <div className="promo-slider-card-rating">
                    <StarFilled /> <text>{4.5} ({"25"})</text>
                </div>
                <div onClick={() => handleFav()} className="locations-property-favourite">
                    <i style={{color: isFav ? '#ee5151' : 'white'}} className={`fa-${isFav ? 'solid active' : 'regular'} fa-bookmark`}></i>
                </div>
                <Button onClick={() => router.push(`/property/${data._id}`)} shape='round' type='primary'>Book Now</Button>
            </div>
        </div>
    )
}

const PromoSlider = ({data}) => {
  return (
    <section className="promo-slider">
        <div className="container">
            <Row>
                <Col span={24}>
                    <h2 className="promo-slider-title">{data.title}</h2>
                    <p className='promo-slider-subtitle'>{data.subTitle}</p>
                    <div className="promo-slider-slides">
                        <Swiper
                        modules={[A11y, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        speed={1000}
                        navigation={{clickable: true}}
                        onSwiper={(swiper) => console.log(swiper)}
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