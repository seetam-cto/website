import Image from 'next/image'
import React, {useState, useEffect, useRef} from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { Navigation, A11y, EffectFlip, EffectCreative, EffectCards, EffectCoverflow, Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Row, Col, Typography, Space, Button } from 'antd';
import { RightCircleOutlined, FireOutlined} from '@ant-design/icons';
import { BannerSearch } from '../SearchBar';
import Experiences from '../Experiences';
import Lottie from 'react-lottie';
import * as mousedown from "../../assets/images/scroll-down.json"
const {Title, Paragraph} = Typography
import SwiperCore, { Autoplay } from 'swiper';

const mouseDownOptions = {
    loop: true,
    autoplay: true, 
    animationData: mousedown,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

const Banner = ({banner, properties, homepage}) => {
    const [currentSlide, setCurrentSlide] = useState(banner[0])
    SwiperCore.use([Autoplay]);
    return (
        <div className="banner">
            <AnimatePresence>
            <div className="banner-background">
                <div className='banner-background-image' style={{backgroundImage: `url(${currentSlide.background})`}} width={1920} height={1080} />
                <div className="banner-background-overlay" />
            </div>
            <div className="banner-content">
                <div className="container">
                    <Row>
                        <Col span={10}>
                            <div className='banner-content-container'>
                                <h1 className='banner-content-header'>Spend vacations with<br />serene experiences</h1>
                                <BannerSearch properties={properties} />
                                <Experiences experiences={homepage.experiences} />
                            </div>
                        </Col>
                        <Col span={7} offset={5}>
                            <Swiper
                            modules={[Pagination, EffectCards, A11y ]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop
                            autoplay={true}
                            speed={1000}
                            effect='cards'
                            onSwiper={(swiper) => console.log(swiper)}
                            className="banner-slider"
                            onSlideChange={(swiper) => setCurrentSlide(banner[swiper.realIndex])}
                            >
                                {banner && banner.map((slide, i) => (
                                    <SwiperSlide key={i}>
                                        <div KEY={`${i + Math.random()}`} className="banner-slider-slide">
                                            <img src={slide.card} className="banner-slider-slide-image" />
                                            <div className="banner-slider-slide-content">
                                                <h3>Trip to {(slide.location && slide.location.name) ? slide.location.name : slide.title}</h3>
                                                <Paragraph
                                                ellipsis={{
                                                    rows: 3,
                                                    expandable: true,
                                                    onEllipsis: (ellipsis) => {
                                                      console.log('Ellipsis changed:', ellipsis);
                                                    },
                                                  }}
                                                  title={`${slide.subTitle}`}
                                                >{slide.subTitle}</Paragraph>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {banner&& banner.map((sl, i) => <img key={`${i}-bannerfakeload`} src={sl.background} style={{display: 'none'}} />)}
                        </Col>
                        <Col span={24}>
                            <div className="banner-scrolldown">
                            <Lottie options={mouseDownOptions}
                            height={50}
                            isClickToPauseDisabled={true}
                            width={50}/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            </AnimatePresence>
        </div>
    )
}

export default Banner