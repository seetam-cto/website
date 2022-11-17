import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
import { getProperties, getPropertyDetails, getRooms } from '../../controllers/general'

const PropertyDetails = ({property}) => {
    return (
        <div className="property">
            <Head>
                <title>{property.main.nameLocation.name} | SwitchOff</title>
                <meta name="description" content={property.main.nameLocation.about} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

        </div>
    )
}

export async function getStaticPaths() {
    return {
      paths: [{ params: { id: '63752b4aad3e8758ae6ad042' } }],
      fallback: false, // can also be true or 'blocking'
    }
  }

export async function getStaticProps({params}) {
    let res;
    try{
        res = await getPropertyDetails(params.id)
    }catch(err){
        console.log(err)
    }
    console.log(res)
    // let rooms = await getRooms(params.id)
    return {
      props: {
        property: {
            main: res.property,
            rooms: res.rooms
            
        }
      }
    }
  }


export default PropertyDetails