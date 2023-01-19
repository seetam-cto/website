import Head from 'next/head';
import React, {useState} from 'react'
import { getBlogsBySlug } from '../../controllers/general';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import draftToHtml from 'draftjs-to-html';
import { PropertyCard } from '../../components/LocationProps';

const PropertyHover = ({property}) => {
    return (
        <div className="blog-property">
            <PropertyCard property={property} />
        </div>
    )
}

const Blog = ({data}) => {
    const [propertyId, setPropertyId] = useState('')
    return (
        <div className="blog">
            <Head>
                <title>{data.blog.title} | SwitchOff</title>
                {/* <meta name="description" content={property.main.nameLocation.about} /> */}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header key="header" theme={"light other"} headerSettings={data.settings}/>
            <div className="blog-hero">
                <Image className='blog-hero-banner' src={data.blog.seo.cover} width={1920} height={500} />
                <div className="blog-hero-banner-overlay" />
                <h1 className="blog-hero-title">
                {data.blog.title}
                </h1>
            </div>
            <div className="container">
                <div className='blog-content' dangerouslySetInnerHTML={{__html: JSON.parse(JSON.stringify(draftToHtml(
                    JSON.parse(data.blog.content[0].data)
                )))}}></div>
            </div>
            {propertyId && <PropertyHover property={data.properties.filter(prop => prop.id === propertyId)[0]} />}
            <Footer key="footer" footer={data.settings.footer} general={data.settings.general} />
        </div>
    )
}

export async function getServerSideProps({params}) {
    let res;
    try{
        res = await getBlogsBySlug(params.slug)
    }catch(err){
        console.log(err)
    }
    return {
      props: {
        data : {
            blog: res.blog,
            settings: res.settings,
            properties: res.properties
        }
      }
    }
  }

export default Blog