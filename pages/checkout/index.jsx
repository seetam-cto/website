import Head from 'next/head'
import Header from "../../components/Header"
import { getSettings } from '../../controllers/general'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import Lottie from 'react-lottie';
import * as loadAnim from "../../assets/images/loading.json"
import { Button, Card, Col, Divider, Form, Input, Row, Space, Steps } from 'antd'

const loaderOptions = {
    loop: true,
    autoplay: true, 
    animationData: loadAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const Checkout = ({settingsData}) => {
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
        router.push("/checkout")
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
        <section className="checkout">
            <div className="container">
                <Space>
                    <Button icon={<i className="fa-solid fa-arrow-left"></i>} />
                    <h1 className="checkout-title"> Checkout </h1>
                </Space>
                <Divider />
                <Row>
                    <Col md={16} xs={24}>
                        <Steps
                        direction='vertical'
                        current={step}
                        items={[
                            {
                                title: "Booking Details",
                                description: <Card title={"Property Name"}>
                                    
                                </Card>
                            },
                            {
                                title: "Primary Guest Details",
                                description: <Card title={"Property Name"}>
                                    <Form
                                    layout='vertical'
                                    >
                                        <Form.Item
                                        label="Full Name of Guest"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                        label="Phone Number"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                        label="Address"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Form>
                                </Card>
                            },
                            {
                                title: "Billing Details",
                                description: "Hello"
                            }
                        ]}
                        />
                    </Col>
                </Row>
            </div>
        </section>
        <Footer footer={settingsData.footer} general={settingsData.general}/>
        </div>
    )
}

export async function getServerSideProps() {
    let res = await getSettings()
    return {
      props: {
        settingsData: res.settings
      }
    }
  }

export default Checkout