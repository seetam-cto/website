import React, {useState, useEffect} from 'react'
import { getSettings } from '../../controllers/general'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getRooms } from '../../controllers/general'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { AnimatePresence } from 'framer-motion'
import SearchBar, { BannerSearch, ExtraFilters } from '../../components/SearchBar'
import moment from 'moment'
import bgImage from "../../assets/images/searchbg.jpg"
import { useAtom } from 'jotai'
import { favourites } from '../../store/states'
import { Button, Col, Row, Tooltip, Pagination, message, Divider } from 'antd'

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
    const [favs, setFavs] = useAtom(favourites)
    const [isFav, setIsFav] = useState(favs.includes(property._id))
    const router = useRouter()
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
      <div className="locations-search-property">
        <img
        src={property.gallery.photos[0]}
        alt=""
        className="locations-search-property-background" />
        <div className="locations-search-property-background-overlay"/>
        <div onClick={() => handleFav()} className="locations-search-property-favourite">
          <i style={{color: isFav ? '#ee5151' : 'white'}} className={`fa-${isFav ? 'solid' : 'regular'} fa-heart`}></i>
        </div>
        <div onClick={() => router.push(`/property/${property._id}`)} className="locations-search-property-content">
          <div>
          <h2>{property.nameLocation.name.length > 20 ? <Tooltip title={property.nameLocation.name} color="black">{property.nameLocation.name.slice(0,20) + '...'}</Tooltip> : property.nameLocation.name}</h2>
          <div className="locations-search-property-content-price">
            From <span>₹{property.pricingCalendar.pricePerNight}</span> / per night
          </div>
          </div>
          <div className="locations-search-property-content-footer">
            <Button icon={<i className="fa-solid fa-location-dot"></i>}>{property.nameLocation.address.locality}</Button>
            <Button icon={<i className="fa-solid fa-star"></i>}>4.7</Button>
          </div>
        </div>
      </div>
    )
  }

const Search = ({result}) => {
    const router = useRouter()
    const {query, start, end} = router.query
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(12)
    const onPageChange = (page) => {
      setFrom(((page - 1)*12))
      setTo(12+((page - 1)*12))
    }
    const [priceRange, setPriceRange] = useState([10000, 50000])
    const [locationList, setLocationList] = useState([])
    const [selectedLocs, setSelectedLocs] = useState([])
    
    const listLocations = () => {
      let newlist = result.properties.map((prp) => {return prp.nameLocation.address.locality})
      setLocationList([...new Set(newlist)].map((ll) => {return {label: ll, value: ll}}))
    }

    useEffect(() => {
      listLocations()
    },[])

    return (
        <div className="search">
            <Head>
                <title>Search Results | SwitchOff</title>
                <meta name="description" content={query} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AnimatePresence>
                <Header key="header" theme={"light other"} headerSettings={result.settings}/>
                <div key={"search-bar"} className="search-bar">
                    <div className="container">
                        <Row gutter={20}>
                            <Col md={12}>
                              <div className="search-bar-banner">
                                <div className="search-bar-banner-container">
                                Ad Banner
                                </div>
                              </div>
                            </Col>
                            <Col md={12}>
                                <BannerSearch showAll={false} properties={result.properties} />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="search-result">
                    <div className="container">
                        <Row gutter={[20,20]}>
                          <Col md={4} style={{padding: 0}}>
                            <ExtraFilters priceRange={priceRange} locations={locationList} selectedLocs={selectedLocs} setSelectedLocs={setSelectedLocs} setPriceRange={setPriceRange} />
                          </Col>
                          <Col md={20}>
                            <Row gutter={[20,20]}>
                            {result.properties
                            .filter(pp => pp.status === "published")
                            .filter((prp) => prp.nameLocation.address.fullAddress.toLowerCase().includes(query === "all" ? "" : query.toLocaleLowerCase()))
                            .filter((prp) => prp.pricingCalendar.pricePerNight > priceRange[0] && prp.pricingCalendar.pricePerNight < priceRange[1])
                            .slice(from, to)
                            .map((prp, i) => (
                                <Col key={`${i}-colcol`} md={6}>
                                    <PropertyBox property={prp} key={i} />
                                </Col>
                            ))}
                            </Row>
                            <Divider />
                            <div className="search-result-pages">
                            <Pagination
                            onChange={(page) => onPageChange(page)}
                            defaultCurrent={1} pageSize={12} total={result.properties
                              .filter((prp) => prp.pricingCalendar.pricePerNight > priceRange[0] && prp.pricingCalendar.pricePerNight < priceRange[1])
                              .filter((prp) => prp.nameLocation.address.fullAddress.toLowerCase().includes(query === "all" ? "" : query.toLocaleLowerCase())).length} showSizeChanger={false} />
                            </div>
                          </Col>
                        </Row>
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