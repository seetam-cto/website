import React, {useState} from 'react'
import {motion} from "framer-motion"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Col, Row, Button } from 'antd'

const Deals = ({deals}) => {
    const [reload, setReload] = useState(456)
    const [currentSlide, setCurrentSlide] = useState(0)
    const router = useRouter()
    return (
        <motion.div className="deals">
            <div className="container">
            <Row>
                <Col md={12} xs={24}>
                    <div className="deals-tiles">
                        <div className="deals-tiles-track">
                        {deals.list.map((deal, i) => (
                            <div
                            onClick={() => setCurrentSlide(i)}
                            key={`deal-${i}`} className="deals-tiles-tile">
                                <Image className='deals-tiles-tile-image' width={80} height={80} src={deal.icon} />
                                <h3>{deal.title}</h3>
                            </div>
                        ))}
                        </div>
                    </div>
                    <Row>
                        <Col md={14} xs={24} style={{padding: 0}}>
                        <h2 className="deals-title">
                            {deals.title}
                        </h2>
                        <h3 className="deals-subtitle">
                            {deals.subTitle}
                        </h3>
                        </Col>
                        <Col md={10} xs={24} style={{padding: 0}}>
                            <div className="deals-explore">
                                <Button icon={<i class="fa-solid fa-paper-plane"></i>} block size="large" type="primary" className='deals-explore-button'>&nbsp;&nbsp;Explore All Deals</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col md={12} xs={24}>
                    <div className="deals-slide"style={{backgroundImage: `url(${deals.list[currentSlide].icon})`}}>
                        <h4>{deals.list[currentSlide].title}</h4>
                    </div>
                    {deals.list.map((img, i) => <img key={`${i}-fakeloads`} style={{display: 'none'}} src={img.icon} />)}
                </Col>
            </Row>
            </div>
        </motion.div>
    )
}

export default Deals