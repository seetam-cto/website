import Head from 'next/head';
import React, {useEffect, useState} from 'react'
import { getBlogsBySlug } from '../../controllers/general';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import draftToHtml from 'draftjs-to-html';
import { PropertyCard } from '../../components/PromoSliders';
import { Row, Col, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const PropertyHover = ({property, pos}) => {
    return (
        <div style={{'--x': pos.x, '--y': pos.y}} className="blog-property">
            <PropertyCard data={property} />
        </div>
    )
}

const Blog = ({data}) => {
    const [propertyId, setPropertyId] = useState('')
    const [mPos, setMPos] = useState({
        x: 0,
        y: 0
    })

    const setPropData = (e) => {
        let brkUrl = e.target.href.split('/')
        setPropertyId(brkUrl[brkUrl.length - 1])
        setMPos({x: e.clientX, y: e.clientY})
    }
    
    useEffect(() => {
        const allWithClass = Array.from(
            document.getElementsByClassName('wysiwyg-mention')
          );
        allWithClass.forEach((ele) => {
            ele.addEventListener('mouseenter', (e) => setPropData(e))
        })
        return () => {
            allWithClass.forEach((ele) => {
                ele.removeEventListener('mouseenter', (e) => setPropertyId(''))
            })
        }
    },[])
    return (
        <div className="blog">
            <Head>
                <title>{data.blog.title} | SwitchOff</title>
                {/* <meta name="description" content={property.main.nameLocation.about} /> */}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header key="header" theme={"light other"} headerSettings={data.settings}/>
            <div className="container">
                <div className="blog-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb.Item><Link href={'/'}><a><HomeOutlined /></a></Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link href={'/blogs'}><a>Blogs</a></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{data.blog.title}</Breadcrumb.Item>
                </Breadcrumb>
                </div>
                <Row gutter={[20,10]}>
                    <Col md={16}>
                        <div className="blog-hero">
                            <Image alt={""} className='blog-hero-banner' src={data.blog.seo.cover} quality={100} objectFit='cover' width={1080} height={520} />
                            <div className="blog-hero-overlay" />
                            <h1 className="blog-hero-title">
                                {data.blog.title}
                            </h1>
                        </div>
                        <div className='blog-content' dangerouslySetInnerHTML={{__html: JSON.parse(JSON.stringify(draftToHtml(
                            JSON.parse(data.blog.content[0].data)
                        )))}}></div>
                        
                    </Col>
                    <Col md={8}>
                    {propertyId && mPos && <PropertyHover pos={mPos} property={data.properties.filter((p) => p._id === propertyId)[0]} />}
                    </Col>
                </Row>
            </div>
            
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