import React, { useEffect, useRef, useState, useCallback } from 'react'
import ReactMapGL, {Marker, Popup, NavigationControl } from "react-map-gl"
import { getCenter } from 'geolib'
import {motion} from "framer-motion"

const PropertyCard = ({setLoc, property}) => {
    return (
        <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        key={property._id} onMouseLeave={() => setLoc('')} className='map-property-card'>
            <img src={property.gallery.photos.filter((p) => p!== null)[0]} />
            <div className='map-property-card-name'>
                <h4>{property.nameLocation.name}</h4>
                <h5>₹{property.pricingCalendar.pricePerNight.toLocaleString('en-IN')}</h5>
            </div>
        </motion.div>
    )
}

const Map = ({center, setCenter, selectedLoc, setSelectedLoc, properties}) => {
    
    const [viewport, setViewport] = useState({
        latitude: 12.4244,
        longitude: 75.7382,
        zoom: 6.5,
        transitionDuration: 1000,
        padding: {
            top: 100
        }
    })

    useEffect(() => {
        setViewport(center)
    },[center])

    const mapRef = useRef()

    // const [selectedLoc, setSelectedLoc] = useState('')

    // useEffect(() => {
    //     const cnt = getCenter(properties.map((p) => { return {latitude: p.nameLocation.address.map.lat, longitude: p.nameLocation.address.map.lng}}))
    //     // setViewport({
    //     //     ...viewport,
    //     //     latitude: cnt.latitude,
    //     //     longitude: cnt.longitude
    //     // })
    // },[])

    useEffect(() => {
        if(navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setViewport({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    zoom: 6.5,
                    transitionDuration: 1000,
                    padding: {
                        top: 100
                    }
                })
            })
        }
    },[])

    return (
        <div className='map'>
            <ReactMapGL
            ref={mapRef}
            minZoom={3.5}
            maxZoom={12}
            mapStyle='mapbox://styles/seetam-divkar/cli8gnwl200ro01qu1k3v62bs?optimize=true'
            mapboxAccessToken={process.env.mapbox_key}
            onMove={(e) => {setViewport(e.viewState); setCenter(e.viewState)}}
            {...viewport}
            >
                {properties.map((result) => (
                    <div key={result.nameLocation.address.map.lng}>
                        <Marker
                            longitude={result.nameLocation.address.map.lng}
                            latitude={result.nameLocation.address.map.lat}
                            onClick={() => setSelectedLoc(result.nameLocation.address.map.lng)}
                        >
                            <p style={{fontSize: 20}}>
                                {selectedLoc === result._id ? (
                                    ''
                                ): <div className='map-marker' onMouseOver={() => setSelectedLoc(result._id)} >
                                        <h5>₹{result.pricingCalendar.pricePerNight.toLocaleString('en-IN')}</h5>
                                </div>}
                            </p>
                        </Marker>
                        {selectedLoc === result._id &&
                        <Popup
                        style={{borderRadius: 10, padding: 0}}
                        longitude={result.nameLocation.address.map.lng}
                        latitude={result.nameLocation.address.map.lat}
                        >
                            <PropertyCard setLoc={setSelectedLoc} property={result} />
                        </Popup>}
                    </div>
                ))}
                <NavigationControl position='bottom-right' />
            </ReactMapGL>
        </div>
    )
}

export default Map