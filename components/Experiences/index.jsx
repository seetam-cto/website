import React from 'react'
import { Row, Col} from 'antd'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Experiences = ({experiences}) => {
  return (
    <div className="experience-card">
        <h2>{experiences.title}</h2>
        <Row gutter={5}>
            {experiences.list.slice(0,6).map((exp, i) => (
                <Col key={`${i}-exp-tile`} span={4}>
                    <motion.div
                    key={`exp-tile-${i}-motion`}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.1*i, duration: 1, type: "just", ease: "linear"}}
                    className="experience-card-tile">
                        <Image className='tile-image' width={35} height={35} src={exp.icon} />
                        <h4>{exp.title}</h4>
                    </motion.div>
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default Experiences