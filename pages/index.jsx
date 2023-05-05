import Head from 'next/head'
import Header from "../components/Header"
import { getSettings } from '../controllers/general'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Banner from '../components/Banner'
import Deals from '../components/Deals'
import LocationProps from '../components/LocationProps'
import Footer from '../components/Footer'
import Lottie from 'react-lottie';
import * as loadAnim from "../assets/images/loading.json"
import TopDestinations from '../components/TopDestinations'
import Questionaire from '../components/Questionaire'
import PromoSlider from '../components/PromoSliders'

const loaderOptions = {
  loop: true,
  autoplay: true, 
  animationData: loadAnim,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default function Home({settingsData, properties, banners}) {
  let sets = useSelector((state) => state.settings)
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
      <div id={'globalLoader'}>
        <Lottie options={loaderOptions}
        height={200}
        isClickToPauseDisabled={true}
        width={200}/>
      </div>
      <Header headerSettings={settingsData}/>
      <Banner banner={banners.banners} properties={properties} homepage={settingsData.homepage} />
      {settingsData.homepage.deals.enabled && <Deals deals={settingsData.homepage.deals}/>}
      {settingsData?.homepage?.promoPropsSection?.map((promoSec, i) => <PromoSlider key={i} data={promoSec} />)}
      {/* {settingsData.homepage.locations.enabled && <LocationProps locations={settingsData.homepage.locations} properties={properties} />} */}
      <TopDestinations cities={settingsData.homepage.locations} />
      <Questionaire locations={settingsData.homepage.locations} experiences={settingsData.homepage.experiences.list} />
      <Footer footer={settingsData.footer} general={settingsData.general}/>
    </div>
  )
}

export async function getServerSideProps() {
  let res = await getSettings()
  return {
    props: {
      settingsData: res.settings,
      properties: res.properties,
      banners: res.banners
    }
  }
}
