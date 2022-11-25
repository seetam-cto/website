import React, {useState, useEffect, useRef} from 'react'
import {motion, AnimatePresence} from "framer-motion"
import Slider from 'react-slick'
import longArrow from "../../assets/images/arrow-right.svg"
import Image from 'next/image'
import { useRouter } from 'next/router'

const PropertySlide = ({property}) => {
    return (
        <div className="deals-slider-slide">
            {JSON.stringify(property)}
        </div>
    )
}

const NextArrow = (props) => {
    const {onClick, reload} = props
    const [progress, setProgress] = useState(reload)
    useEffect(() => {
        setProgress(reload)
    },[reload])
    return (
        <div onClick={onClick} className="deals-slider-arrow next">
            <Image src={longArrow} layout="fill" />
            {progress && <div className='progress'>&nbsp;</div>}
        </div>
    )
}

const PrevArrow = (props) => {
    const {onClick} = props
    return (
        <div onClick={onClick} className="deals-slider-arrow prev">
            <Image src={longArrow} layout="fill" />
        </div>
    )
}

const Deals = ({deals}) => {
    const [reload, setReload] = useState(456)
    const [currentSlide, setCurrentSlide] = useState(0)
    const router = useRouter()
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        // className: "banner-slick",
        slidesToShow: 3,
        arrows: true,
        focusOnSelect: true,
        pauseOnHover: false,
        beforeChange: (current, next) => {
            setReload(false)
            setCurrentSlide(next)
        },
        afterChange: (index) => {
            setReload(true)
            // setCurrentSlide(index)
        },
        nextArrow: <NextArrow reload={reload} />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    }
  return (
    <motion.div className="deals">
        <div className="deals-title">
            {deals.title}
        </div>
        <div className="deals-subtitle">
            {deals.subTitle}
        </div>
        <div className="deals-slider">
            <Slider {...settings}>
                {deals.list && deals.list.map((p,i) => (
                    <AnimatePresence key={i}>
                        <div key={`another-${i}`} className="deals-slider-slide">
                        <div className="deals-slider-slide-background">
                            <Image layout='fill' objectFit='cover' src={p.gallery.photos[0]} alt="" className="banner-slider-slide-background-image" />
                            <div className="deals-slider-slide-background-overlay"></div>
                        </div>
                        <div className="deals-slider-slide-content">
                            <div className="row">
                                <div className="col-10 adjuster">
                                    {currentSlide === i ? (
                                        <motion.h3
                                        key={"deal-title"}
                                        initial={{opacity: 0, x: 100}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={{opacity: 0, x: 100}}
                                        transition={{bounce: 2, delay: 0.2, duration: 0.5}}
                                        className="title current">
                                            {deals.dealTitle[i]}
                                        </motion.h3>
                                    ): (
                                        <h3 className="title other">
                                            <i className='bx bx-map' ></i> {p.nameLocation.address.state}
                                        </h3>
                                    )}
                                    {currentSlide === i ? (
                                        <>
                                            <motion.p
                                            key={"deal-subtitle"}
                                            initial={{opacity: 0, x: 100}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{bounce: 2, delay: 0.4, duration: 0.5}}
                                            className='subtitle'>
                                                {p.nameLocation.about.substring(0,100)}
                                            </motion.p>
                                            <motion.h4
                                            key={"deal-name"}
                                            initial={{y: 50, opacity: 0}}
                                            animate={{y: 0, opacity: 1}}
                                            transition={{duration: 0.3, delay: 0.6}}
                                            className="name">
                                                <i className='bx bx-building-house' ></i>
                                                <i className='bx bxs-check-circle verified' ></i>
                                               <span>{`${p.nameLocation.name}, ${p.nameLocation.address.state}`}</span>
                                            </motion.h4>
                                            <motion.div
                                            key={"deal-bottombox"}
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            transition={{duration: 0.3, delay: 0.8}}
                                            className="bottom-box">
                                                <p>Deals starting at</p>
                                                <span className='bottom-box-price'>
                                                    ₹ 35,000
                                                </span>
                                                <button
                                                onClick={() => router.push(`/property/${p._id}`)}
                                                className="form-button explore progress-loader">
                                                    {reload && <div className='progress'>&nbsp;</div>}
                                                    <div className='front'>
                                                    Explore Deal
                                                    <i className='bx bxs-chevron-right' ></i>
                                                    </div>
                                                </button>
                                            </motion.div>
                                        </>
                                    ) : (
                                        <div>
                                        <div className="rating">
                                            <i className='bx bxs-star' ></i> 4.3
                                        </div>
                                        <h4
                                        className="name">
                                            <i className='bx bx-building-house' ></i>
                                            <i className='bx bxs-check-circle verified' ></i>
                                            {`${p.nameLocation.name}, ${p.nameLocation.address.state}`}
                                        </h4>
                                        </div>
                                    )}
                                    
                                </div>
                                <div className="col-2 d-flex flex-col justify-between align-bottom deals-slider-slide-content-side">
                                    <i className={`bx bxs-hot ${currentSlide === i && 'active'}`}></i>
                                    {currentSlide === i && (
                                        <div className="rating">
                                            <i className='bx bxs-star' ></i> 4.3
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    </AnimatePresence>
                ))}
            </Slider>
        </div>
    </motion.div>
  )
}

export default Deals