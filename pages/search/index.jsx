import React, {useState, useRef, useEffect} from 'react'
import { getSettings } from '../../controllers/general'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getProperties, getPropertyDetails, getRooms } from '../../controllers/general'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Slider from 'react-slick'
import sliderArrow from "../../assets/images/long-arrow.svg"
import { addDays } from 'date-fns';
import Modal from 'react-modal'
import SearchBar from '../../components/SearchBar'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import bgImage from "../../assets/images/searchbg.jpg"

const PriceSpan = ({id}) => {
    const [price, setPrice] = useState('')
    const fetchRooms = async () => {
        try{
            let res = await getRooms(id)
            let pp = res.sort((a,b) => {
                let keyA = a.basePrice.mrp;
                let keyB = b.basePrice.mrp;
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            })[0].basePrice.mrp.toLocaleString('en-IN')
            setPrice(pp)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        fetchRooms()
    },[])
    return (
        <span>
            ₹{price && price}
        </span>
    )
}

const PropertyBox = ({property}) => {
    const router = useRouter()
    return (
        <div onClick={() => router.push(`/property/${property._id}`)} className="search-result-property">
            <div className="card-cover">
                <div className="card-background">
                    <img src={property.gallery.photos[0]} alt="" />
                    <div className="overlay" />
                </div>
                <div className="d-flex flex-col justify-between card-cover-content">
                    <div className="d-flex justify-between">
                        <p><i class='bx bx-map'></i> {property.nameLocation.address.locality}</p>
                        <i class='bx bxs-hot' ></i>
                    </div>
                    <p><i class='bx bxs-star'></i>4.{property.nameLocation.name.length.toString().split(0,1)}</p>
                </div>
            </div>
            <div className="card-content">
                <h4><i class='bx bx-buildings' ></i><span>{property.nameLocation.name}</span></h4>
                <div className="price">
                    Staring from <PriceSpan id={property._id} /> • Night
                </div>
            </div>
        </div>
    )
}

const Search = ({result}) => {
    const router = useRouter()
    const {query, start, end} = router.query

    return (
        <div className="search">
            <Head>
                <title>Search Results | SwitchOff</title>
                <meta name="description" content={query} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AnimatePresence>
                <Header key="header" theme={"light other"} headerSettings={result.settings}/>
                <div key={Math.random() + Math.random()} className="search-bar">
                    <div className="container">
                        <img src={bgImage.src} />
                    </div>
                    <SearchBar />
                </div>
                <div className="search-result">
                    <div className="container">
                        <div className="search-result-grid">
                        {result.properties
                        .filter((prp) => prp.nameLocation.address.fullAddress.toLowerCase().includes(query === "all" ? '' : query.toLocaleLowerCase()))
                        .map((prp, i) => (
                            <PropertyBox property={prp} key={i} />
                        ))}
                        </div>
                    </div>
                </div>
                <Footer key="footer" footer={result.settings.footer} general={result.settings.general}/>
            </AnimatePresence>
        </div>
    )
}



export async function getServerSideProps() {
    const res = await getSettings()
    return { 
        props: { 
            result: res
        } 
    }
  }

export default Search