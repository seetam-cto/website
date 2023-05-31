import Head from 'next/head'
import Header from "../../components/Header"
import { getAllBlogs } from '../../controllers/general'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import Lottie from 'react-lottie';
import * as loadAnim from "../../assets/images/loading.json"
import { Button, Card, Col, Divider, Row, Space, Steps, Tag } from 'antd'
import Image from 'next/image'
import moment from 'moment'
import { HiOutlineExternalLink } from "react-icons/hi"
import Link from 'next/link'

const loaderOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const BlogCard = ({data}) => {
  const router = useRouter()
  return (
    <Link href={`/blogs/${data.slug}`}>
    <a>
      <div className="blogs-card"> 
      <Image alt={""} style={{zIndex: 0}} src={data.seo.cover} width={1080} height={720} quality={100} objectFit='cover' />
      <div className="blogs-card-content">
        <h2>{data.title}</h2>
        <p>{data.seo.description}</p>
        <div className="blogs-card-content-date">
          {moment(data.createdAt).format('Do MMM YYYY')}
        </div>
        <div className="blogs-card-content-author">
          <span>By: {data.postedBy.name.toLowerCase()}</span>
        </div>
      </div>
      </div>
    </a>
    </Link>
  )
}

const Blogs = ({settingsData, blogs}) => {
    let sets = useSelector((state) => state.settings)
    const dispatch = useDispatch()

    //checkout steps
    const [step, setStep] = useState(0)

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
        router.push("/blogs")
        }
    },[sets, dispatch, router, settingsData])
    return (
        <div className="home">
        <Head>
            <title>Checkout | SwitchOff</title>
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
        <section className="blogs">
          <div className="container">
          <div className="blogs-header">
            <Row gutter={[20,10]}>
              <Col md={16}>
                <div className="blogs-header-banner">
                  <Image alt={""} src={blogs && blogs[0].seo.cover} width={1080} height={550} objectFit='cover' quality={100} />
                  <div className="blogs-header-banner-overlay" />
                  <div className="blogs-header-banner-title">
                    Explore our Blogs
                  </div>
                  <Link href={`/blogs/${blogs[0].slug}`}>
                  <a>
                  <div className="blogs-header-banner-content">
                    <Row>
                      <Col md={20}>
                        <h1>{blogs[0].title}</h1>
                        <p>{moment(blogs[0].createdAt).format('Do MMM YYYY')}</p>
                        <h3>By: {blogs[0].postedBy.name.toLowerCase()}</h3>
                      </Col>
                      <Col md={4} className='blogs-header-banner-content-link'>
                        <HiOutlineExternalLink className='blogs-header-banner-content-link-icon' />
                      </Col>
                    </Row>
                  </div>
                  </a>
                  </Link>
                </div>
              </Col>
              <Col md={8}>
                <div className="blogs-tops">
                  <h2>Best Properties Banner</h2>
                </div>
              </Col>
            </Row>
          </div>
            <Row gutter={[20,10]}>
              {blogs && blogs.map((b, i) => <Col key={i} md={6}><BlogCard data={b} /></Col>)}
            </Row>
          </div>
        </section>
        <Footer footer={settingsData.footer} general={settingsData.general}/>
        </div>
    )
}

export async function getServerSideProps() {
    let res = await getAllBlogs()
    return {
      props: {
        settingsData: res.settings,
        blogs: res.blogs
      }
    }
  }

export default Blogs