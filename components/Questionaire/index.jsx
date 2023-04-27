import { Button, Checkbox, Divider, Radio, Steps, Row, Col } from 'antd'
import React, {useState} from 'react'
import {motion} from "framer-motion"
import { ArrowRightOutlined, ArrowLeftOutlined, FireFilled } from '@ant-design/icons';
import tripPlanner from "../../assets/images/trip-planner.jpg"
import { useRouter } from 'next/router';

const Questionaire = ({locations, experiences}) => {
    const [progress, setProgress] = useState(0)
    const [knowDestination, setKnowDestination] = useState(undefined)
    const onDestinationOptionChange = ({target: { value }}) => {
        setKnowDestination(value)
    }
    const [selectedLocs, setSelectedLocs] = useState([])
    
    const handleSelectLoc = (loc) => {
        if(selectedLocs.map((l) => {return l.name}).includes(loc.name)){
            setSelectedLocs([...selectedLocs.filter((l) => l.name !== loc.name)])
        }else{
            setSelectedLocs([...selectedLocs, loc])
        }
    }

    const [selectedExp, setSelectedExp] = useState([])

    const handleSelectExp = (exp) => {
        if(selectedExp.includes(exp)){
            setSelectedExp([...selectedExp.filter((ex) => ex !== exp)])
        }else{
            setSelectedExp([...selectedExp, exp])
        }
    }

    const [traveller, setTraveller] = useState('')
    const [price, setPrice] = useState('0')

    const router = useRouter()

    const handleSubmit = () => {
        let path = `/search?query=${selectedLocs.map((l) => {return l.name})}&start=04-09-2023&end=04-11-2023&adults=1&childs=0&pets=false`
        router.push()
    }

    return (
        <div className="qsa">
            <div className="container">
                <div className="qsa-box">
                    <Row>
                        <Col md={16}>
                            <div className="qsa-innerbox">
                                <div className="qsa-title">
                                    Let us inspire you
                                </div>
                                <p className="qsa-subtitle">
                                    Your tailor-made SwitchOff adventure starts here. Tell us your outline travel plans and we&apos;ll recommend some amazing resort to visit.
                                </p>
                                <div className="qsa-qs">
                                    <Steps
                                        progressDot
                                        current={progress && progress}
                                        items={[
                                            {
                                                title: 'Destinations'
                                            },
                                            {
                                                title: 'Experiences'
                                            },
                                            {
                                                title: 'Budget'
                                            }
                                        ]}
                                    />
                                    {progress === 0 && (
                                        <div className="qsa-q">
                                        <div className="qsa-q-title">
                                            DO YOU KNOW WHERE YOU WANT TO TRAVEL?
                                        </div>
                                        <div className="qsa-q-optns">
                                            <Radio.Group
                                                options={[
                                                    {
                                                        label: 'Yes, I do!',
                                                        value: true
                                                    },
                                                    {
                                                        label: 'No, not just yet',
                                                        value: false
                                                    }
                                                ]}
                                                defaultValue={knowDestination}
                                                onChange={onDestinationOptionChange}
                                                optionType='button'
                                                buttonStyle='solid'
                                                size='large'
                                            />
                                            {knowDestination && 
                                            <div className="qsa-q">
                                                <div className="qsa-q-title">
                                                    WHERE WOULD YOU LIKE TO TRAVEL TO?
                                                </div>
                                                <div className="qsa-q-optns">
                                                    <Row justify={'center'} gutter={[20,20]}>
                                                        {locations?.list && locations?.list.map((loc, i) => (
                                                            <Col key={i} md={6} xs={24}>
                                                                <Button onClick={() => handleSelectLoc({name: loc.name, pic: loc.cover_image})} className={`qsa-q-optns-btn ${selectedLocs.map((l) => {return l.name}).includes(loc.name) ? 'active' : ''}`}>
                                                                    <img src={loc.cover_image} />
                                                                    <div className="qsa-q-optns-btn-text">
                                                                        {loc.name}
                                                                    </div>
                                                                </Button>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </div>
                                            </div>}
                                        </div>
                                        <Divider />
                                        <div className="qsa-q-buttons">
                                            <p></p>
                                            <Button onClick={() => setProgress(1)} disabled={knowDestination === undefined || (knowDestination === true && selectedLocs.length === 0)} size='large' type='primary'>Continue <ArrowRightOutlined /></Button>
                                        </div>
                                    </div>
                                    )}
                                    {progress === 1 && (
                                    <div className="qsa-q">
                                        <div className="qsa-q-title">
                                            WHAT WOULD YOU LIKE TO EXPERIENCE?
                                        </div>
                                        <div className="qsa-q-optns">
                                            <Row style={{width: '100%'}} justify={'center'} gutter={[20,20]}>
                                                {experiences && experiences.map((exp, i) => (
                                                    <Col md={6} xs={24} key={i}>
                                                        <Button onClick={() => handleSelectExp(exp.title)} className={`qsa-q-optns-btn wi ${selectedExp.includes(exp.title) ? 'active' : ''}`}>
                                                            <div className="qsa-q-optns-btn-text wi">
                                                                {exp.title}
                                                            </div>
                                                        </Button>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                        <Divider />
                                        <div className="qsa-q-buttons">
                                            <Button onClick={() => setProgress(0)} size='large' ><ArrowLeftOutlined /> Back</Button>
                                            <Button onClick={() => setProgress(2)} disabled={selectedExp.length === 0 && traveller === ''} size='large' type='primary'>Continue <ArrowRightOutlined /></Button>
                                        </div>
                                    </div>
                                    )}
                                    {progress === 2 && (
                                        <div className="qsa-q">
                                            <div className="qsa-q-title">
                                                WHO IS TRAVELLING?
                                            </div>
                                            <div className="qsa-q-optns">
                                                <Row style={{width: '100%'}} justify={'center'} gutter={[20,20]}>
                                                        <Col md={8} xs={24}>
                                                            <Button onClick={() => setTraveller('family')} className={`qsa-q-optns-btn wi ${traveller === 'family' ? 'active' : ''}`}>
                                                                <div className="qsa-q-optns-btn-text wi">
                                                                    Families, Groups
                                                                </div>
                                                            </Button>
                                                        </Col>
                                                        <Col md={8} xs={24}>
                                                            <Button onClick={() => setTraveller('solo')} className={`qsa-q-optns-btn wi ${traveller === 'solo' ? 'active' : ''}`}>
                                                                <div className="qsa-q-optns-btn-text wi">
                                                                    Solo,<br /> Adventure Seekers
                                                                </div>
                                                            </Button>
                                                        </Col>
                                                        <Col md={8} xs={24}>
                                                            <Button onClick={() => setTraveller('couple')} className={`qsa-q-optns-btn wi ${traveller === 'couple' ? 'active' : ''}`}>
                                                                <div className="qsa-q-optns-btn-text wi">
                                                                    Couples, Friends
                                                                </div>
                                                            </Button>
                                                        </Col>
                                                </Row>
                                            </div>
                                            <Divider />
                                            <div className="qsa-q-title">
                                                ROUGHLY, WHAT IS YOUR BUDGET PER PERSON?
                                            </div>
                                            <div className="qsa-q-optns">
                                                <Row style={{width: '100%'}} justify={'center'} gutter={[20,20]}>
                                                        <Col md={8} xs={24}>
                                                            <Button onClick={() => setPrice('less')} className={`qsa-q-optns-btn wi ${price === 'less' ? 'active' : ''}`}>
                                                                <div className="qsa-q-optns-btn-text wi">
                                                                    Less than ₹25K
                                                                </div>
                                                            </Button>
                                                        </Col>
                                                        <Col md={8} xs={24}>
                                                            <Button onClick={() => setPrice('more')} className={`qsa-q-optns-btn wi ${price === 'more' ? 'active' : ''}`}>
                                                                <div className="qsa-q-optns-btn-text wi">
                                                                    More than ₹25K
                                                                </div>
                                                            </Button>
                                                        </Col>
                                                        <Col md={8} xs={24}>
                                                            <Button onClick={() => setPrice('none')} className={`qsa-q-optns-btn wi ${price === 'none' ? 'active' : ''}`}>
                                                                <div className="qsa-q-optns-btn-text wi">
                                                                    Not sure yet
                                                                </div>
                                                            </Button>
                                                        </Col>
                                                </Row>
                                            </div>
                                            <Divider />
                                            <div className="qsa-q-buttons">
                                                <Button onClick={() => setProgress(1)} size='large' ><ArrowLeftOutlined /> Back</Button>
                                                <Button onClick={() => setProgress(2)} disabled={selectedExp.length === 0 && traveller === ''} size='large' type='primary'>Lets Switch it off <FireFilled /></Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>
                        <Col style={{padding: 0}} md={8}>
                            <div className='qsa-box-image'>
                                <motion.img
                                key={'qsa-box-image'}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                src={tripPlanner.src} alt='travel planner' />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Questionaire