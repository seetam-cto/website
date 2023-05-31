import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'

const StatsPromo = ({data}) => {
    const [locs, setLocs] = useState(0)
    useEffect(() => {
        let arr = data.filter(pp => pp.status === "published").map((prp) => prp.nameLocation.address.locality)
        setLocs(Array.from(new Set(arr)).length)
    },[])
    return (
        <div className="statspromo">
            <div className="container">
                <div className="statspromo-box">
                <Row>
                    <Col md={12}>
                        Hi
                    </Col>
                    <Col md={12}>
                        <h2>India&apos;s best luxury resorts, villas and experiences</h2>
                        <h3>Serene Destinations. More Ease. Best Experiences.</h3>
                        <div className="statspromo-stats">
                            <div className="stats">
                                <span>{locs && locs}+</span>
                                destinations
                            </div>
                            <div className="stats">
                                <span>{data.length}+</span>
                                resorts, villas & more...
                            </div>
                        </div>
                    </Col>
                </Row>
                </div>
            </div>
        </div>
    )
}

export default StatsPromo