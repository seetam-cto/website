import { useRouter } from 'next/router'
import React, {useState, useRef, useEffect} from 'react'
import Head from 'next/head'
import { getProperties, getPropertyDetails, getRooms } from '../../controllers/general'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Slider from 'react-slick'
import sliderArrow from "../../assets/images/long-arrow.svg"
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import Modal from 'react-modal'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import sampleIcon from "../../assets/images/sample-icon.svg"

const Gallery = ({imageList}) => {
    const settings = {
        for1: {
            dots: false,
            arrows: false,
            className: "property-gallery-slider-container",
            fade: true,
        },
        for2: {
            infinite: true,
            slidesToShow: 4,
            speed: 500,
            arrows: true,
            focusOnSelect: true,
            className: "property-gallery-slider-thumbs-container",
            nextArrow: <div className="arrow-next"><img src={sliderArrow} alt="" /></div>,
            prevArrow: <div className="arrow-prev"><img src={sliderArrow} alt="" /></div>
        }
    };
      const [navs, setNavs] = useState({
        nav1: null,
        nav2: null
      })
      let slider2 = useRef(null)
      let slider1 = useRef(null)
      useEffect(() => {
        setNavs({
            nav1: slider1,
            nav2: slider2
        })
      },[])
    return (
        <div className="property-gallery-slider">
            <div className="row">
                <div className="col-4 property-gallery-slider-slides">
                <Slider asNavFor={navs.nav2} 
                ref={slider => (slider1 = slider)}
                {...settings.for1}>
                    {imageList && imageList.map((image,i) => (
                        <div key={i} className="property-gallery-slider-slide">
                            <img src={image} key={i} at="" />
                        </div>
                    ))}
                </Slider>
                </div>
                <div className="col-8 property-gallery-slider-thumbs">
                <Slider asNavFor={navs.nav1} 
                ref={slider => (slider2 = slider)} {...settings.for2}>
                    {imageList && imageList.map((image,i) => (
                        <div key={i} className="property-gallery-slider-slide-small">
                            <img src={image} key={i} at="" />
                        </div>
                    ))}
                </Slider>
                <div className="property-gallery-link">View Gallery</div>
                </div>
            </div>
        </div>
    )
}

const GalleryMobile = ({imageList}) => {
    const settings = {
        for2: {
            infinite: true,
            slidesToShow: 2,
            speed: 500,
            arrows: true,
            focusOnSelect: true,
            className: "property-mobile-gallery-slider",
            nextArrow: <div className="arrow-next"><img src={sliderArrow} alt="" /></div>,
            prevArrow: <div className="arrow-prev"><img src={sliderArrow} alt="" /></div>
        }
    };
    return (
        <Slider {...settings.for2}>
            {imageList && imageList.map((image,i) => (
                <div key={i} className="property-mobile-gallery-slider-slide">
                    <img src={image} key={i} at="" />
                </div>
            ))}
        </Slider>
    )
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '15px'
    },
  };

const EnquireForm = ({open, setOpen, data, clean}) => {
    function closeModal() {
        setOpen(false);
        clean()
      }

    const [state, setState] = useState({
        name: '',
        email: '',
        phone: '',
        guests: data.guests,
        startDate: data.startDate,
        endDate: data.endDate
    })

    const handleEnquiry = () => {
        if(state.name && state.phone && state.email && state.guests){
            toast.success("Your Enquiry has been submitted. We will get back to you shortly.")
            clean()
        }
    }
    return (
        <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Enquiry Form"
        >
            <div className="property-enquire">
                <i onClick={() => closeModal()} className='property-enquire-close bx bx-x' ></i>
                <h2>Enquire Now</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label className="form-label">
                            Your Name
                        </label>
                        <input type="text"
                            value={state.name}
                            onChange={(e) => setState({...state, name: e.target.value})}
                            required
                            placeholder='Enter your full name'
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Your Email
                        </label>
                        <input type="email"
                            value={state.email}
                            onChange={(e) => setState({...state, email: e.target.value})}
                            required
                            placeholder='Enter your email'
                            className="form-control" />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="form-label">
                                    Phone Number
                                </label>
                                <input type="text"
                                value={state.phone}
                                onChange={(e) => setState({...state, phone: e.target.value})}
                                    placeholder='Enter your phone'
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="form-label">
                                    Total Guests
                                </label>
                                <input type="number"
                                    value={state.guests}
                                onChange={(e) => setState({...state, guests: e.target.value})}
                                    placeholder='Enter your full name'
                                    className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Selected Dates
                        </label>
                        <input type="text"
                        required
                        readOnly
                        value={`${moment(state.startDate).format("DD MMM YYYY")} - ${moment(state.endDate).format("DD MMM YYYY")}`}
                            placeholder='These are the selected dates'
                            className="form-control" />
                    </div>
                    <button
                    onClick={() => handleEnquiry()}
                    style={{justifyContent: 'space-between'}} className="form-button full explore">
                        Submit your enquiry<i className='bx bxs-paper-plane' ></i>
                    </button>
                </form>
            </div>
        </Modal>
    )
}

const PropertyDetails = ({property}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(), 1));
    const [guests, setGuests] = useState(3)
    const [eqState, setEqState] = useState(false)
    const cleanData = () => {
        setStartDate(new Date())
        setEndDate(addDays(new Date(), 1))
        setGuests(0)
        setEqState(false)
    }
    return (
        <div className="property">
            <Head>
                <title>{property.main.nameLocation.name} | SwitchOff</title>
                <meta name="description" content={property.main.nameLocation.about} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AnimatePresence>
                <Header key="header" theme={"light other"} headerSettings={property.settings}/>
                <div className="property-desktop property-banner">
                    <div className="property-banner-background">
                        <Image className='image' src={property.main.gallery.photos[0]} width={1600} height={900} />
                        <div className="overlay" />
                    </div>
                    <div className="property-top"/>
                    <div className="container">
                        <div className="row">
                            <div className="col-6  d-flex flex-col justify-center" style={{gap: 50}}>
                                <h1>{property.main.nameLocation.name}</h1>
                                <p>{property.main.nameLocation.about}</p>
                            </div>
                            <div className="col-6 property-banner-image">
                                <Image src={property.main.gallery.photos[1]} width={1600} height={900}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="property-desktop container">
                    <div className="row">
                        <div className="col-8">
                            <Gallery imageList={property.main.gallery.photos} />
                        </div>
                        <div className="col-4">
                            <div className="booking-form">
                                <div className='d-flex justify-between' style={{gap: 20}}>
                                    <div style={{width: '70%'}}>
                                        <div className="booking-form-calendar">
                                            <DatePicker minDate={new Date()} className="booking-form-calendar-date" selected={startDate} onChange={(date) => setStartDate(date)} />
                                            <i className='bx bx-calendar-edit'></i>
                                            <DatePicker minDate={addDays(new Date(), 1)} className="booking-form-calendar-date" selected={endDate} onChange={(date) => setEndDate(date)} />
                                        </div>
                                    </div>
                                    <div className='booking-form-guests' style={{width: '30%'}}>
                                        <input
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                        type="text" />
                                        Guests
                                    </div>
                                </div>
                                <div className="booking-form-price">
                                Prices Starting from 
                                <span>
                                    <span className='highlight'>
                                    ₹{ property.rooms.sort((a,b) => {
                                        let keyA = a.basePrice.mrp;
                                        let keyB = b.basePrice.mrp;
                                        // Compare the 2 dates
                                        if (keyA < keyB) return -1;
                                        if (keyA > keyB) return 1;
                                        return 0;
                                    })[0].basePrice.mrp.toLocaleString('en-IN') }</span>
                                    /Night
                                </span>
                                </div>
                                <button style={{justifyContent: 'space-between'}} onClick={() => setEqState(true)} className="form-button full explore">
                                    Enquire Now <i className='bx bxs-chevron-right' ></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="property-amenities">
                                <h2>In the property</h2>
                                <div className="amenities">
                                    {property.main.propertySetup.amenities.slice(0,12).map((amn, i) => (
                                        <span key={i} style={{marginRight: 20}}>
                                            <img src={sampleIcon.src} alt="" />
                                            {property.amenities.filter((am) => am.id === amn )[0].name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>&nbsp;</p>
                    <div className="row">
                        <div className="col-12">
                            <h2>Rooms & Packages</h2>
                            <div className="property-rooms">
                                {property.rooms.map((room, i) => (
                                    <div key={i} className="property-rooms-room">
                                        <div className="row">
                                            <div className="col-3 image">
                                                <Slider>
                                                    {room.images.map((img, i) =>
                                                    <Image key={i} src={img} width={1600} height={900} /> 
                                                    )}
                                                </Slider>
                                            </div>
                                            <div className="col-6">
                                                <h3>{room.name} <span>• {room.roomSize}sq.ft.</span></h3>
                                                <p className='property-rooms-room-amenities'>
                                                    {room.amenities.slice(0,12).map((amn, i) => (
                                                        <span key={i} style={{marginRight: 20}}>
                                                            <i className='bx bx-check'></i> {property.amenities.filter((am) => am.id === amn )[0].name}
                                                        </span>
                                                    ))}
                                                    <span key={i} style={{marginRight: 20, marginTop: 10}}>
                                                    <i class='bx bxs-chevron-down-circle'></i> View More
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="col-3 price-box">
                                                <p>Prices starting at</p>
                                                <div className="price">
                                                    <span className='highlight'>
                                                    ₹{ room.basePrice.mrp.toLocaleString('en-IN') }</span>
                                                    /Night
                                                </div>
                                                <button style={{justifyContent: 'space-between'}} onClick={() => setEqState(true)} className="form-button full explore">
                                                    Enquire Now <i className='bx bxs-chevron-right' ></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="property-mobile">
                    <div className="property-mobile-banner">
                        <div className="property-mobile-banner-image">
                            <Image className='image' src={property.main.gallery.photos[0]} width={1600} height={900} />
                            <div className="overlay" />
                        </div>
                    </div>
                    <div className="container pi-2">
                        <div className="property-mobile-rating">
                            <i className='bx bx-star' ></i> 4.62 <span>30+ Reviews</span>
                        </div>
                        <div className="property-mobile-details">
                            <h1>{property.main.nameLocation.name}</h1>
                            <p>{property.main.nameLocation.about}</p>
                        </div>
                        <div className="property-mobile-video">
                            <Image src={property.main.gallery.photos[1]} width={1600} height={900}/>
                        </div>
                    </div>
                    <div className="property-mobile-gallery">
                        <h2>What you can expect?</h2>
                        <GalleryMobile imageList={property.main.gallery.photos} />
                    </div>
                    <div className="container pi-2">
                        <div className="property-mobile-amenities">
                            <h2>In the property</h2>
                            <div className="property-mobile-amenities-grid">
                                {property.main.propertySetup.amenities.slice(0,10).map((amn, i) => (
                                    <span key={i} style={{marginRight: 20}}>
                                        <img src={sampleIcon.src} alt="" />
                                        {property.amenities.filter((am) => am.id === amn )[0].name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-12">
                            <h2>Rooms & Packages</h2>
                            <div className="property-rooms">
                                {property.rooms.map((room, i) => (
                                    <div key={i} className="property-rooms-room">
                                        <div className="row">
                                            <div className="col-12 image">
                                                <Slider>
                                                    {room.images.map((img, i) =>
                                                    <Image key={i} src={img} width={1600} height={900} /> 
                                                    )}
                                                </Slider>
                                            </div>
                                            <div className="col-12">
                                                <h3>{room.name} <span>• {room.roomSize}sq.ft.</span></h3>
                                                <div className="property-mobile-amenities-grid room">
                                                    {room.amenities.slice(0,9).map((amn, i) => (
                                                        <span key={i} style={{marginRight: 20}}>
                                                            <img src={sampleIcon.src} alt="" />
                                                            {property.amenities.filter((am) => am.id === amn )[0].name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-12 price-box">
                                                <p>Prices starting at</p>
                                                <div className="price">
                                                    <span className='highlight'>
                                                    ₹{ room.basePrice.mrp.toLocaleString('en-IN') }</span>
                                                    /Night
                                                </div>
                                                <button style={{justifyContent: 'space-between'}} onClick={() => setEqState(true)} className="form-button full explore">
                                                    Enquire Now <i className='bx bxs-chevron-right' ></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <EnquireForm open={eqState} setOpen={setEqState} data={{guests, startDate, endDate}} clean={cleanData} />
                <Footer key="footer" footer={property.settings.footer} general={property.settings.general}/>
            </AnimatePresence>
            <ToastContainer />
        </div>
    )
}

// export async function getStaticPaths() {
//     return {
//       paths: [
//         { params: { id: '63752b4aad3e8758ae6ad042' } }, 
//         { params: { id: '6375b543d18eb430546c20a6' } }, 
//         { params: { id: '6375bab8d18eb430546c2111' } }, 
//         { params: { id: '6375bd93d18eb430546c215c' } }],
//       fallback: true, // can also be true or 'blocking'
//     }
//   }

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