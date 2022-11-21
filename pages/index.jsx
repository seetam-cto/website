import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header"
import { getProperties, getSettings } from '../controllers/general'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Banner from '../components/Banner'
import SearchBar from '../components/SearchBar'
import {AnimatePresence} from "framer-motion"
import Deals from '../components/Deals'
import LocationProps from '../components/LocationProps'
import AdvanceBooking from '../components/AdvanceBooking'
import Footer from '../components/Footer'
import { banner } from '../assets/banners/banners'

export default function Home({settingsData, properties}) {
  let sets = useSelector((state) => state.settings)
  // console.log(sets)
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    if(!sets.loaded){
      dispatch({
        type: "FETCH_API",
        payload: {
          ...settingsData,
          loaded: true
        }
      })
      router.push("/")
    }
  },[sets])
  return (
    <div className="home">
      <Head>
        <title>SwitchOff - Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence>
        <Header headerSettings={settingsData}/>
        <Banner banner={settingsData.homepage.banner}/>
        <SearchBar properties={properties} />
        {settingsData.homepage.deals.enabled && <Deals deals={settingsData.homepage.deals}/>}
        {/* {settingsData.homepage.locations.enabled && <LocationProps locations={settingsData.homepage.locations} properties={properties} />} */}
        {settingsData.homepage.advanceBooking.enabled && <AdvanceBooking advanceData={settingsData.homepage.advanceBooking} />}
        <Footer footer={settingsData.footer} general={settingsData.general}/>
      </AnimatePresence>
    </div>
  )
}

export async function getServerSideProps() {
  let res = await getSettings()
  // let properties = await getProperties()
  return {
    props: {
      settingsData: res.settings,
      properties: res.properties
    }
  }
}

// export async function getStaticProps(){
//   let properties = await getProperties()
//   return {
//     props: {
//       properties: properties
//     }
//   }
// }
