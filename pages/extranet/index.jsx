import Head from 'next/head'
import Image from 'next/image'
import Header from "../../components/Header"
import Footer from '../../components/Footer'
import { getSettings } from '../../controllers/general'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {AnimatePresence} from "framer-motion"
import { Row, Col, Card, Form, Divider, Button } from 'antd'

export default function Intranet({settingsData}) {
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
      router.push("/extranet")
    }
  },[sets, dispatch, router, settingsData])
  const [form] = Form.useForm();
  return (
    <div className="home">
      <Head>
        <title>SwitchOff - About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence>
        <Header theme={"dark"} headerSettings={settingsData}/>
        <div className="intranet">
          <div className="intranet-header">
            <div className="container">
              <div className="intranet-top">
                  <Row gutter={20} align={'middle'}>
                    <Col md={14} sm={24}>
                      <h1>List your
                        <br />properties
                        <br />on SwitchOff
                      </h1>
                      <p className='intranet-top-subtitle'>Registration is free and can take as little as 15 minutes to complete - get started today</p>
                    </Col>
                    <Col  md={10} sm={24}>
                      <Card
                      title={<h2>Create your listing</h2>}
                      >
                        <ul className='intranet-top-list'>
                          <li><i className="fa-solid fa-check"></i> More than 6.4 million vacation rentals already listed</li>
                          <li><i className="fa-solid fa-check"></i> Over 1 billion vacation rental guest arrivals</li>
                          <li><i className="fa-solid fa-check"></i> More than 40% of new vacation rental listings get their first booking within a week</li>
                        </ul>
                        <Divider />
                        <h3>Create a partner account to get started:</h3>
                        <p>By continuing, you agree to let SwitchOff email you regarding your property registration.</p>
                        <br />
                        <Button onClick={() => router.push("/extranet/register")} size='large' type='primary' block>Get Started &nbsp; {<i className="fa-solid fa-arrow-right"></i>}</Button>
                      </Card>
                    </Col>
                  </Row>
              </div>
            </div>
          </div>
        </div>
        <Footer footer={settingsData.footer} general={settingsData.general}/>
      </AnimatePresence>
    </div>
  )
}

export async function getStaticProps() {
  let res = await getSettings()
  // let properties = await getProperties()
  return {
    props: {
      settingsData: res.settings
    }
  }
}
