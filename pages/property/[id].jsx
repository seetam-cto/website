import { useRouter } from 'next/router'
import React, {useState, useRef, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { getPropertyDetails } from '../../controllers/general'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { AnimatePresence } from 'framer-motion'
// import Image from 'next/image'
import { Image, Row, Col, Button, Divider } from 'antd'
import * as loadAnim from "../../assets/images/loading.json"
import star from "../../assets/images/star.png"
import Lottie from 'react-lottie';
import {SendOutlined, AppstoreAddOutlined} from '@ant-design/icons'
import { getDistance } from 'geolib'
import {MdOutlineFreeBreakfast, MdPets} from "react-icons/md"
import {CiParking1} from "react-icons/ci"
import {BsSignNoParking, BsPeopleFill} from "react-icons/bs"
import {FaSmoking, FaSmokingBan} from "react-icons/fa"
import {BiBed} from "react-icons/bi"
import Slider from 'react-slick'
import { A11y, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

const loaderOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const RoomCard = ({room}) => {
    const [visible, setVisible] = useState(false)
    const getBed = (bd) => {
        let newAdd = bd.single + bd.double + bd.queen + bd.king + bd.bunk
        return newAdd.toString()
    }
    return (
        <div className="property-rooms-card">
            <Row>
                <Col style={{padding: 0, position: 'relative'}} md={10}>
                    <Slider>
                        {room?.images.filter((p) => p !== null).map((img, i) =>
                        <Image preview={false} onClick={() => setVisible(true)} key={i} src={img} />
                        )}
                    </Slider>
                    <h3 className='property-rooms-card-type'>{room.roomType} Room</h3>
                    <div style={{display: 'none'}}>
                        <Image.PreviewGroup preview={{visible, onVisibleChange: (vis) => setVisible(vis)}}>
                            {room.images.map((im, i) => (
                                <Image src={im} alt="" key={i} />
                            ))}
                        </Image.PreviewGroup>
                    </div>
                </Col>
                <Col style={{padding: 0}} md={14}>
                    <div className="property-rooms-card-content">
                        <h2>{room.name}</h2>
                        <ul>
                            <li><BiBed /> {getBed(room.beds)}</li>
                            <li><BsPeopleFill /> {room.capacity}</li>
                        </ul>
                        <Button type='primary' shape='round'>Book Now</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

const PropertyDetails = ({property}) => {
    const [userLocation, setUserLocation] = useState({
        latitude: 12.4244,
        longitude: 75.7382,
    })
    const [locationAllowed, setLocationAllowed] = useState(true)
    const [prevGallery, setPrevGallery] = useState(false)
    let sets = useSelector((state) => state.settings)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        if(!sets.loaded){
          dispatch({
            type: "FETCH_API",
            payload: {
              ...property.settings,
              loaded: true
            }
          })
          router.push(`/property/${property.main._id}`)
        }
      },[sets])
    useEffect(() => {
        console.log(navigator)
        if(navigator){
            setLocationAllowed(true)
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
        }else{
            setLocationAllowed(false)
        }
    },[])
    return (
        <div className="property">
            <Head>
                <title>{property?.main?.nameLocation?.name} | SwitchOff</title>
                <meta name="description" content={property?.main?.nameLocation?.about} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id={'globalLoader'}>
                <Lottie options={loaderOptions}
                height={200}
                isClickToPauseDisabled={true}
                width={200}/>
            </div>
            <AnimatePresence>
                <Header key="header" theme={"light other"} headerSettings={property.settings}/>
                <section className="property-main">
                    <div className="container">
                        <Row gutter={[60,10]}>
                            <Col md={10}>
                                <h1 className='property-title'>{property?.main?.nameLocation.name}</h1>
                                <h2 className='property-address'>{property?.main?.nameLocation?.address?.locality}, {property?.main?.nameLocation?.address?.state} - {property?.main?.nameLocation?.address?.pincode}</h2>
                                {locationAllowed && <p className="promo-slider-card-wide-distance">Around <span>{(getDistance(userLocation, {latitude: property?.main?.nameLocation?.address?.map?.lat, longitude: property?.main?.nameLocation?.address?.map?.lng})/1000).toFixed(0)}km</span> away from you.</p>}
                                <div className="property-price">
                                    <span>₹{property?.main?.pricingCalendar?.pricePerNight.toLocaleString('en-IN') }&nbsp;</span>
                                    / night
                                </div>
                                <div className="property-book">
                                    <Button style={{minWidth: 250, height: 'fit-content', paddingBlock: 15}} shape='round' size='large' type={'primary'}>Visit Property <SendOutlined /></Button>
                                </div>
                                <ul className="property-amenities">
                                    {property?.main?.propertySetup?.rules.breakfast && <li>
                                        <MdOutlineFreeBreakfast />
                                        Breakfast
                                    </li>}
                                    {property?.main?.propertySetup?.rules.pets.allowed && <li>
                                        <MdPets />
                                        Pets Allowed
                                    </li>}
                                    {property?.main?.propertySetup?.rules.parking.allowed ? <li>
                                        <CiParking1 />
                                        <span>{property?.main?.propertySetup?.rules.parking.free ? 'Free' : 'Paid'} {property?.main?.propertySetup?.rules.parking.private && 'Private'} <br />Parking</span>
                                    </li>: <li>
                                        <BsSignNoParking />
                                        No Parking
                                        </li>}
                                    {property?.main?.propertySetup?.rules.smoking ? <li>
                                        <FaSmoking />
                                        Smoking Allowed
                                    </li>: <li>
                                        <FaSmokingBan />
                                        No Smoking
                                    </li>}
                                </ul>
                                <div className="property-xfactor">
                                    <Row align={'center'}>
                                        <Col style={{padding: 0}} md={3}>
                                            <img src={star.src} alt="" />
                                        </Col>
                                        <Col md={21}>
                                            <h2>{property?.main?.nameLocation?.xFactor}</h2>
                                        </Col>
                                    </Row>
                                </div>
                                <p className="property-description">
                                    {property?.main?.nameLocation?.about}
                                </p>
                            </Col>
                            <Col md={14}>
                               <div className="property-gallery-container">
                                <div className="property-gallery">
                                    {property?.main?.gallery?.photos?.slice(0,2).filter((p) => p !== null).map((im,i) => (
                                        <div key={i} className="property-gallery-image">
                                            <Image  src={im} key={i} />
                                        </div>
                                    ))}
                                    <div onClick={() => setPrevGallery(true)} className="property-gallery-image">
                                        <Image preview={false} src={property?.main?.gallery?.photos[2]} />
                                        <div className="property-gallery-image-more">
                                            <AppstoreAddOutlined />
                                            View More
                                        </div>
                                    </div>
                                    <div style={{display: 'none'}}>
                                        <Image.PreviewGroup preview={{visible: prevGallery, onVisibleChange: (vis) => setPrevGallery(vis)}}>
                                        {property?.main?.gallery?.photos?.slice(0,50).filter((p) => p !== null).map((im,i) => (
                                            <Image  src={im} key={i} />
                                        ))}
                                        </Image.PreviewGroup>
                                    </div>
                                </div>
                               </div>
                            </Col>
                        </Row>
                        <Divider>Rooms</Divider>
                        <div className="property-rooms">
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
                                    slidesPerView: 2,
                                    slidesPerGroup: 1
                                }
                            }}
                            >
                                {property?.rooms.map((r) => 
                                <SwiperSlide key={r._id}>
                                    <RoomCard room={r} />
                                </SwiperSlide>)}
                            </Swiper>
                        </div>
                    </div>
                </section>
                <Footer key="footer" footer={property.settings.footer} general={property.settings.general}/>
            </AnimatePresence>
        </div>
    )
}

export async function getServerSideProps({params}) {
    let res;
    try{
        res = await getPropertyDetails(params.id)
    }catch(err){
        console.log(err)
    }
    // let rooms = await getRooms(params.id)
    return {
      props: {
        property: {
            main: res.property,
            rooms: res.rooms,
            settings: res.settings,
            amenities: res.amenities
        }
      }
    }
}


export default PropertyDetails