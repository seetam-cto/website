import React, {useState, useEffect} from 'react'
import { getSettings } from '../../controllers/general'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getRooms } from '../../controllers/general'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { AnimatePresence } from 'framer-motion'
import { AISearch, BannerSearch, ExtraFilters } from '../../components/SearchBar'
import moment from 'moment'
import bgImage from "../../assets/images/searchbg.jpg"
import { atom, useAtom } from 'jotai'
import { favourites } from '../../store/states'
import { Button, Col, Row, Tooltip, Pagination, message, Divider, Space, Dropdown, Select } from 'antd'
import { SearchPropertyCard } from '../../components/PromoSliders'
import Map from '../../components/Map/Map'
import { getCenter, isPointWithinRadius } from 'geolib'
import * as loadAnim from "../../assets/images/loading.json"
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux'
import { FallOutlined, RiseOutlined } from '@ant-design/icons'

export const filters = atom({
    query: '',
    start: '',
    end: '',
    adults: 1,
    childs: 0,
    pets: false
})

export const getFilters = atom((get) => get(filters))

const loaderOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

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

const Search = ({rawResult, settings}) => {
    const [mapShow, setMapShow] = useState(true)
    const router = useRouter()
    const {query, start, end} = router.query
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(20)
    const [result, setResult] = useState(rawResult)
    const [loading, setLoading] = useState(false)
    const [fltr, setFltr] = useAtom(filters)
    const [newFlF] = useAtom(getFilters)

    const setFilters = () => {
        setFltr(newFlF)
    }

    useEffect(() => {
        setFilters()
    },[])

    const [center, setCenter] = useState({
        latitude: 12.4244,
        longitude: 75.7382,
        zoom: 5
    })

    useEffect(() => {
        if(navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    zoom: 6.5
                })
            })
        }
    },[])

    const [priceRange, setPriceRange] = useState([1000, 50000])
    const [locationList, setLocationList] = useState([])
    const [selectedLocs, setSelectedLocs] = useState('')
    const [selectedProp, setSelectedProp] = useState('')

    useEffect(() => {
        setFltr({
            ...fltr,
            query: selectedLocs
        })
        let newResult = result
        .filter(pp => pp.status === "published")
        .filter((prp) => prp.nameLocation.address.fullAddress.toLowerCase().includes(fltr.query === "all" ? "" : (fltr.query ? fltr.query.toLocaleLowerCase() : '')))
        .filter((prp) => prp.pricingCalendar.pricePerNight > priceRange[0] && prp.pricingCalendar.pricePerNight < priceRange[1])
        if(newResult.length > 0){
            setCenter({
                ...getCenter(newResult.map((p) => {return {latitude: p.nameLocation.address.map.lat, longitude: p.nameLocation.address.map.lng}})),
                zoom: 8
            })
        }
    },[selectedLocs])
    
    const listLocations = () => {
      let newlist = result.map((prp) => {return prp.nameLocation.address.locality})
      setLocationList([...new Set(newlist)].map((ll) => {return {label: ll, value: ll}}))
    }

    const getRadius = (z) => {
        if(z >= 3.4 && z <= 5){
            return 4000000
        }else if(z > 5 && z <= 6){
            return 600000
        }else if(z > 6 && z <= 7){
            return 200000
        }else if(z > 7 && z <= 8){
            return 150000
        }else if(z > 8 && z <= 9){
            return 100000
        }else if(z > 9 && z <= 10){
            return 50000
        }else{
            return 20000
        }
    }

    const sortMenu = [
        {
            value: 'any',
            label: 'Any'
        },
        {
            value: 'ltoh',
            label: <span>Price: <RiseOutlined/> </span>
        },
        {
            value: 'htol',
            label: <span>Price: <FallOutlined/> </span>
        },
        {
            value: 'distance',
            label: 'Distance'
        }
    ]

    const resetProperties = () => {
        let newR = rawResult.filter((p) => isPointWithinRadius(
            {latitude: p.nameLocation.address.map.lat, longitude: p.nameLocation.address.map.lng},
            {latitude: center.latitude, longitude: center.longitude},
            getRadius(center.zoom)
        ))
        setResult(newR)
    }

    let sets = useSelector((state) => state.settings)
    const dispatch = useDispatch()

    useEffect(() => {
        resetProperties()
    },[center])

    useEffect(() => {
      listLocations()
      setResult(rawResult)
    },[])

    const getMaxListNo = (z) => {
        if(z >= 3.4 && z <= 7){
            return 20
        }else if(z > 6){
            return 20
        }
    }

    const ltohSort = (list) => {
        return list.sort((a,b) => a.pricingCalendar.pricePerNight - b.pricingCalendar.pricePerNight)
    }

    const htolSort = (list) => {
        return list.sort((a,b) => b.pricingCalendar.pricePerNight - a.pricingCalendar.pricePerNight)
    }

    const [srt, setSrt] = useState('any')

    const sortMethod = (list) => {
        if(srt === 'any'){
            return list
        }else if(srt === 'ltoh'){
            return ltohSort(list)
        }else if(srt === 'htol'){
            return htolSort(list)
        }else{
            return list
        }
    }

    const [sortList, setSortList] = useState([])

    useEffect(() => {
        let nlist = result
        .filter(pp => pp.status === "published")
        .filter((prp) => prp.nameLocation.address.fullAddress.toLowerCase().includes(fltr.query === "all" ? "" : (fltr.query ? fltr.query.toLocaleLowerCase() : '')))
        .filter((prp) => prp.pricingCalendar.pricePerNight > priceRange[0] && prp.pricingCalendar.pricePerNight < priceRange[1])
        .slice(0,getMaxListNo(center.zoom))
        setSortList(sortMethod(nlist))
    },[srt, center, selectedLocs, priceRange])

    useEffect(() => {
        if(!sets.loaded){
            dispatch({
            type: "FETCH_API",
            payload: {
                ...settings,
                loaded: true
            }
            })
            router.push('/search')
        }
    },[sets])

    return (
        <div className="search">
            <Head>
                <title>Search Results | SwitchOff</title>
                <meta name="description" content={fltr.query} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id={'globalLoader'}>
                <Lottie options={loaderOptions}
                height={200}
                isClickToPauseDisabled={true}
                width={200}/>
            </div>
            <AnimatePresence>
                <Header key="header" theme={"light other"} headerSettings={settings}/>
                <div className="search-result">
                    <div className="container">
                        <Row gutter={[20,20]}>
                          <Col md={24} style={{padding: 0}}>
                            <ExtraFilters properties={result.map((p) => p.pricingCalendar.pricePerNight)} priceRange={priceRange} locations={locationList} selectedLocs={selectedLocs} setSelectedLocs={setSelectedLocs} setPriceRange={setPriceRange} />
                          </Col>
                          <Col md={mapShow ? 8 : 24}>
                            <div className='search-result-sort'>
                                <p>We found <span>{result
                                .filter(pp => pp.status === "published")
                                .filter((prp) => prp.nameLocation.address.fullAddress.toLowerCase().includes(fltr.query === "all" ? "" : (fltr.query ? fltr.query.toLocaleLowerCase() : '')))
                                .filter((prp) => prp.pricingCalendar.pricePerNight > priceRange[0] && prp.pricingCalendar.pricePerNight < priceRange[1])
                                .length} search results</span></p>
                                <span>
                                <span className="search-result-sort-title">
                                Sort By:
                                </span>
                                <Select
                                defaultValue={'any'}
                                className='search-result-sort-select'
                                value={srt}
                                onChange={(v) => setSrt(v)}
                                options={sortMenu}
                                />
                                </span>
                            </div>
                            <Row gutter={[20,20]} className={mapShow ? 'search-result-scroll' : ''}>
                                {loading ?
                                'Loading...'
                                : sortList
                                    .map((prp, i) => (
                                    <Col key={`${i}-colcol`} md={mapShow ? 24 : 8}>
                                        {/* <PropertyBox property={prp} key={i} /> */}
                                        <SearchPropertyCard setLoc={setSelectedProp} active={prp._id === selectedProp} data={prp} key={i} />
                                    </Col>
                                ))}
                            </Row>
                            <Divider />
                          </Col>
                          <Col md={16}>
                            <div className="search-map">
                                <Map
                                center={center} setCenter={setCenter}
                                selectedLoc={selectedProp} setSelectedLoc={setSelectedProp} properties={result
                                .filter(pp => pp.status === "published")
                                .filter((prp) => prp.nameLocation.address.fullAddress.toLowerCase().includes(fltr.query === "all" ? "" : (fltr.query ? fltr.query.toLocaleLowerCase() : '')))
                                .filter((prp) => prp.pricingCalendar.pricePerNight > priceRange[0] && prp.pricingCalendar.pricePerNight < priceRange[1])
                                .slice(0,getMaxListNo(center.zoom))
                                } />
                                <div className="search-map-bar">
                                    <AISearch rawData={rawResult} />
                                </div>
                            </div>
                          </Col>
                        </Row>
                    </div>
                </div>
                <Footer key="footer" footer={settings.footer} general={settings.general}/>
            </AnimatePresence>
        </div>
    )
}



export async function getServerSideProps() {
    const res = await getSettings()
    return { 
        props: { 
            rawResult: res.properties,
            settings: res.settings
        } 
    }
  }

export default Search