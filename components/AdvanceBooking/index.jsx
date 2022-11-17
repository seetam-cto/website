import React, {useState, useEffect, useRef} from 'react'
import {motion} from "framer-motion"
import Image from 'next/image'

const AdvanceBooking = ({advanceData}) => {
  return (
    <div className="advance">
        <div className="container">
            <div className="advance-title">
                    {advanceData.title}
            </div>
            <div className="advance-subtitle">
                {advanceData.subTitle}
            </div>
            <div className="row d-m-flex flex-m-col-rev">
                <div className="col-6 advance-list col-m-12">
                    {
                        advanceData.list.map((l, i) => (
                            <div key={i} className="row">
                                <div className="col-3">
                                    <Image src={l.icon} width={70} height={70} objectFit={"contain"} />
                                </div>
                                <div className="col-9">
                                    <h4 className="advance-list-title">
                                        {l.title}
                                    </h4>
                                    <p className="advance-list-subtitle">
                                        {l.subTitle}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="col-6 advance-image col-m-12">
                    <div className='d-only'><Image layout="fixed" width={550} height={700} objectFit='cover' src={advanceData.image} className="d-only" /></div>
                    <Image width={700} height={500}  objectFit='cover' src={advanceData.image} className="m-only"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdvanceBooking