import Image from 'next/image'
import React, {useState, useEffect, useRef} from 'react'
import Slider from "react-slick";
import longArrow from "../../assets/images/arrow-right.svg"
import { motion } from "framer-motion"

const NextArrow = (props) => {
    const {onClick, reload} = props
    const [progress, setProgress] = useState(reload)
    useEffect(() => {
        setProgress(reload)
    },[reload])
    return (
        <div onClick={onClick} className="banner-slider-arrow next">
            <Image src={longArrow} layout="fill" />
            {progress && <div className='progress'>&nbsp;</div>}
        </div>
    )
}

const PrevArrow = (props) => {
    const {onClick} = props
    return (
        <div onClick={onClick} className="banner-slider-arrow prev">
            <Image src={longArrow} layout="fill" />
        </div>
    )
}

const Banner = ({banner, counts}) => {
    const [background, setBackground] = useState("https://switchoff-assets.fra1.digitaloceanspaces.com/09367f86-5431-46e0-a4fa-70e521ca43d6.jpg")
    const [currentSlide, setCurrentSlide] = useState(banner[0])
    const [curDot, setCurDot] = useState(0)
    const slider = useRef(null)
    const [reload, setReload] = useState(456)
    const [readMore, setReadMore] = useState(false)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 7000,
        className: "banner-slick",
        slidesToShow: (banner.length - 1) > 3 ? 3 : banner.length - 1,
        arrows: true,
        ref: slider,
        focusOnSelect: true,
        pauseOnHover: false,
        // useTransforms: true,
        beforeChange: () => setReload(false),
        afterChange: (index) => {
            setReload(true)
            setCurDot(index)
            setCurrentSlide(banner[index])
        },
        nextArrow: <NextArrow reload={reload} />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="banner">
            <div className="banner-background">
                <div className="banner-background-overlay"></div>
                <div style={{backgroundImage: `url(${currentSlide.cover_image.src})`}} className="banner-background-image"></div>
                {/* <Image layout={"fill"} objectFit='cover' src={currentSlide.cover_image}/> */}
            </div>
            <div className="row">
                <div className="col-6 banner-left-container col-m-12">
                    <div className="row banner-left">
                        <div className="col-2 d-flex align-end d-m-none">
                            <ul className="banner-slider-dots">
                                {banner.map((c,i) => 
                                    <li key={i} onClick={() => {slider.current.slickGoTo(i); setCurDot(i)}} className={curDot === i ? 'active' : ''}></li>)}
                            </ul>
                        </div>
                        <div className="col-10 d-flex flex-col justify-between col-m-12">
                            <div className="banner-left-text">
                                {currentSlide.name && <h2>
                                    <motion.span  
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 1}}
                                    >
                                    {currentSlide.name}
                                    </motion.span>
                                    </h2>}
                                <p>{currentSlide.about.length > 300 
                                ? readMore 
                                    ? <>{currentSlide.about}<span onClick={() => setReadMore(false)}>&nbsp;&nbsp;- <strong>Read Less</strong></span></> 
                                    : <>{currentSlide.about.substring(0,295)}... <span onClick={() => setReadMore(true)}><strong>Read More</strong></span></>
                                : currentSlide.about}</p>
                            </div>
                            <div className="banner-left-cta">
                                <p>Exciting Deals</p>
                                <motion.button
                                onClick={() => console.log(currentSlide.name)}
                                initial={{x: -100, opacity: 0}}
                                animate={{x: 0, opacity: 1}}
                                whileHover={{scale: 1.05}}
                                transition={{ delay: 0, bounce: 1}}
                                className="form-button explore">
                                    Explore <i className='bx bxs-chevron-right' ></i>
                                </motion.button>
                            </div>
                            <div className="banner-mobile-loader">
                                {reload && <div className="progress"></div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 banner-slider-container col-m-12">
                    <div className="banner-slider">
                        <Slider {...settings}>
                            {banner && banner.map((b,i) => (
                                <div key={i} className="banner-slider-slide">
                                    <Image src={b.cover_image} layout={"fill"}  objectFit="cover" className="banner-slider-slide-background" />
                                    <div className="banner-slider-slide-overlay"></div>
                                    <div className="banner-slider-slide-content">
                                        <h3>{b.name}</h3>
                                        <h4>{b.counts} Properties</h4>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner