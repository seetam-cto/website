import { Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const ImageBox = ({data}) => {
    return (
        <div className="destinations-box-item">
            <img src={data.cover_image} alt={data.name} />
            <div className="destinations-box-item-content">
                <Link href="">
                    <>
                    <h2 className="destinations-box-item-content-title">
                        {data.name}
                    </h2>
                    </>
                </Link>
            </div>
        </div>
    )
}

const TopDestinations = ({cities}) => {
  return (
    <div className="destinations">
        <div className="container">
            <div className="destinations-title">
                Top Destinations
            </div>
            <div className="destinations-box">
                <Row gutter={20}>
                    <Col span={12}>
                        <ImageBox data={cities?.list[0]} />
                    </Col>
                    <Col span={6}>
                        <ImageBox data={cities?.list[5]} />
                    </Col>
                    <Col span={6}>
                        <ImageBox data={cities?.list[2]} />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={6}>
                        <ImageBox data={cities?.list[3]} />
                    </Col>
                    <Col span={6}>
                        <ImageBox data={cities?.list[4]} />
                    </Col>
                    <Col span={12}>
                        <ImageBox data={cities?.list[1]} />
                    </Col>
                </Row>
            </div>
        </div>
    </div>
  )
}

export default TopDestinations