import React, {useState, useEffect} from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import longArrow from "../../assets/images/next.svg"
import moment from "moment"
import Image from 'next/image';
import { CheckboxInput, CounterInput, RangeDatePicker } from '../UI';
import SelectSearch from 'react-select-search';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { Card, Col, Divider, Form, Input,
    DatePicker, Tooltip, Popover, Space, Checkbox,
    Row, Select, Button, InputNumber, Slider, Spin, message } from 'antd';
import dayjs from "dayjs"
import { SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { SearchPropertyCard } from '../PromoSliders';
import { useAtom } from 'jotai';
import { filters } from '../../pages/search';
import debounce from 'lodash/debounce';
import { useMemo, useRef } from 'react';
import { algoliasearch } from 'algoliasearch';
import Link from 'next/link';

const {RangePicker} = DatePicker

//locationbox
const LocationBox = ({data, setData, handleNext, properties}) => {
    const [options, setOptions] = useState(properties.filter(pp => pp.status === "published").map((prp) => {
        return {
            name: prp.nameLocation.address.locality,
            value: prp.nameLocation.address.locality
        }
    }))
    return (
        <motion.div
            initial={{scale: 0, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            exit={{scale: 0, opacity: 0}}
            transition={{bounce: 2}}
            className="searchbar-locationbox">
            <h4>Where would you like to go?</h4>
            <div className="searchbar-locationbox-search">
                {/* <input
                value={data.location}
                onChange={(e) => setData({...data, location: e.target.value})}
                placeholder='Find your destination'
                type="text" className="form-control" /> */}
                <SelectSearch 
                search
                options={options} 
                onChange={(e) => setData({...data, location: e})} 
                value={data.location} name="location" 
                placeholder="Search your location" />
                <i className='bx bx-search'></i>
            </div>
            {data.location 
            ? (
                <button onClick={() => handleNext(true)} className="form-button searchbar-locationbox-hideMobile full explore">
                    Let&apos;s explore {data.location}
                    <i className='bx bx-planet' ></i>
                </button>
            )
            : (<>
                <h4 className="searchbar-locationbox-divide searchbar-locationbox-hideMobile">OR</h4>
                <button
                onClick={() => {
                    setData({...data, location: "all"});
                    handleNext(true)
                }}
                className="form-button searchbar-locationbox-hideMobile full explore">
                    Show all SwitchOff destinations
                    <i className='bx bx-planet' ></i>
                </button>
                </>
            )
            }
            <div className="searchbar-locationbox-recent searchbar-locationbox-hideMobile">
                <p>Recent Searches</p>
            </div>
        </motion.div>
    )
}

//calendar
const labelBox = (props) => (
        <span className={`searchbar-calendarbox-labels ${props.isSelected() && 'active'}`}>{props.label}</span>
    )

export const CalendarBox = ({data, setData, handleNext}) => {
    const [state, setState] = useState([
        {
          startDate: data.startDate,
          endDate: data.endDate,
          key: 'selection'
        }
      ]);
    const handleSelect = (date) => {
        setState([date.selection])
        setData({
            ...data,
            checkin: date.selection.startDate,
            checkout: date.selection.endDate
        })
      }
    return (
        <motion.div
        initial={{scale: 0, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 0, opacity: 0}}
        transition={{bounce: 2}}
        className="searchbar-calendarbox">
            <div className="searchbar-title">
                <div onClick={() => handleNext(false)} className="back">
                    <i className='bx bxs-chevron-left' ></i>
                </div>
                <h4>Select your dates</h4>
            </div>
            {state && data && (
                <DateRangePicker
                    onChange={item => handleSelect(item)}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 120)}
                    months={2}
                    ranges={[{
                        startDate: data.checkin,
                        endDate: data.checkout,
                        key: 'selection'
                    }]}
                    inputRanges={[]}
                    renderStaticRangeLabel={labelBox}
                    staticRanges={[
                        {
                            label: "Tomorrow",
                            hasCustomRendering: true,
                            range: () => ({
                                startDate: addDays(new Date(), 1),
                                endDate: addDays(new Date(), 2)
                            }),
                            isSelected(){
                                return true
                            }
                        },
                        {
                            label: "This Week",
                            hasCustomRendering: true,
                            range: () => ({
                                startDate: new Date(),
                                endDate: addDays(new Date(), 6)
                            }),
                            isSelected(){
                                return true
                            }
                        },
                        {
                            label: "Next Week",
                            hasCustomRendering: true,
                            range: () => ({
                                startDate: addDays(new Date(), 7),
                                endDate: addDays(new Date(), 13)
                            }),
                            isSelected(){
                                return true
                            }
                        },
                        {
                            label: "This Month",
                            hasCustomRendering: true,
                            range: () => ({
                                startDate: new Date(),
                                endDate: addDays(new Date(), 30)
                            }),
                            isSelected(){
                                return true
                            }
                        },{
                            label: "Next Month",
                            hasCustomRendering: true,
                            range: () => ({
                                startDate: addDays(new Date(), 30),
                                endDate: addDays(new Date(), 60)
                            }),
                            isSelected(){
                                return true
                            }
                        }
                    ]}
                    rangeColors={["#FF5A5F"]}
                    direction="horizontal"
                />
            )}
            <div className="row full">
                {/* <div className="col-12 d-flex justify-end searchbar-next">
                    <Image onClick={() => handleNext()} src={longArrow} />
                </div> */}
                <div className="col-12 d-flex justify-end align-center">
                    Continue to 
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleNext(true)} className="form-button explore">
                        Add Guests <i className='bx bxs-chevron-right' ></i>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

//guests box
const GuestsBox = ({data, setData, handleNext, explore}) => {
    const handleAdult = (value) => {
        setData({...data, guests: {...data.guests, adult: value}})
    }
    const handleChild = (value) => {
        setData({...data, guests: {...data.guests, child: value}})
    }
    const handleHandicap = (value) => {
        setData({...data, handicap: value})
    }
    const handlePets = (value) => {
        setData({...data, pets: value})
    }
    return (
        <motion.div
        initial={{scale: 0, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 0, opacity: 0}}
        transition={{bounce: 2}}
        key={"desktop-search"}
        className="searchbar-guestsbox">
            <div className="searchbar-title">
                <div onClick={() => handleNext(false)} className="searchbar-guestsbox-hideMobile back">
                    <i className='bx bxs-chevron-left' ></i>
                </div>
                <h4>How may guests?</h4>
            </div>
            <div className="row">
                <div className="col-6">
                    <h5>Adults</h5>
                    <CounterInput min={1} label={"Ages 18+"} value={data.guests.adult} onChange={handleAdult} />
                </div>
                <div className="col-6">
                    <h5>Child</h5>
                    <CounterInput label={"Ages 17 and below"} value={data.guests.child} onChange={handleChild} />
                </div>
            </div>
            <div className="row full searchbar-guestsbox-checks">
                <div className="col-6 d-flex justify-start align-center">
                    <CheckboxInput label={"Pets"} value={data.pets} icon={"bx bxs-dog"} onChange={handlePets} />
                </div>
                <div className="col-6 d-flex justify-start align-center">
                    <CheckboxInput label={"Handicap"} value={data.handicap} icon={"bx bx-handicap"} onChange={handleHandicap} />
                </div>
            </div>
            <p>&nbsp;</p>
            <div className="row full">
                <div className="col-12 d-flex justify-end  align-center">
                    <button onClick={() => explore()} className="full-m form-button explore">
                        Explore <i className='bx bxs-chevron-right' ></i>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export const SearchBarMobile = ({open, setOpen, searchq, setSearchq, properties, explore}) => {
    const customStyles = {
        overlay: {
            backgroundColor: 'transparent'
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          backgroundImage: 'linear-gradient(to bottom, #000000, #00000000, #000000)',
          transform: 'translate(-50%, -50%)',
        },
    };

    function closeModal() {
        setOpen(false);
    }

    return (
        <Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <AnimatePresence>
        <motion.div
        initial={{scale: 0, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 0, opacity: 0}}
        key={"mobile-search"}
        className="searchbar-mobile">
            <div onClick={() => closeModal()} className="close-btn">
                <i className='bx bx-x'></i>
            </div>
            <LocationBox
            handleNext={closeModal}
            data={searchq} setData={setSearchq} properties={properties}/>
            <div className="searchbar-mobile-calendar">
                <h4>When?</h4>
                <div className="searchbar-mobile-calendar-boxes">
                    <div className="searchbar-mobile-calendar-boxes-box">
                        CHECK IN
                        <input
                        value={moment(searchq.checkin).format("YYYY-MM-DD")}
                        onChange={(e) => setSearchq({...searchq, checkin: e.target.value})}
                        type="date" name="" className='form-control' id="" />
                    </div>
                    <div className="divider"></div>
                    <div className="searchbar-mobile-calendar-boxes-box">
                        CHECK OUT
                        <input
                        value={moment(searchq.checkout).format("YYYY-MM-DD")}
                        onChange={(e) => setSearchq({...searchq, checkout: e.target.value})}
                        type="date" name="" className='form-control' id="" />
                    </div>
                </div>
            </div>
            <GuestsBox data={searchq} setData={setSearchq} explore={explore} />
        </motion.div>
        </AnimatePresence>
      </Modal>
    )
}

export const BannerSearch = ({properties, showAll=true}) => {
    const [step, setStep] = useState(0)
    const [options, setOptions] = useState([])
    const [fltr, setFltr] = useAtom(filters)

    const router = useRouter()

    const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
    };
    useEffect(() => {
        let arr = properties.filter(pp => pp.status === "published").map((prp) => prp.nameLocation.address.locality)
        let newArr = Array.from(new Set(arr))
        setOptions(newArr.map((ar) => {
            return {
                label: ar.toLowerCase(),
                value: ar
            }
        }))
    },[])

    const [form] = Form.useForm()
    const [guestsOpen, setGuestsOpen] = useState(false)

    const handleOpenChange = (newOpen) => {
    setGuestsOpen(newOpen);
    };
    const [searchQuery, setSearchQuery] = useState({
        location: null,
        checkin: new Date(),
        checkout: addDays(new Date(), 2),
        guests: {
            adult: 1,
            child: 0,
        },
        pets: false
    })

    const {query, start, end, adults, childs, pets} = router.query


    const explore = () => {
        setFltr({
            query: searchQuery.location ? searchQuery.location : 'all',
            start: moment(searchQuery.checkin).format("MM-DD-YYYY"),
            end: moment(searchQuery.checkout).format("MM-DD-YYYY"),
            adults: searchQuery.guests.adult,
            childs: searchQuery.guests.child,
            pets: searchQuery.pets
        })
        router.push(`/search`)
    }

    return (
        <div className="banner-searchbar">
            <div className="banner-searchbar-container">
                <Form
                form={form}
                initialValues={{
                    ["search_location"]: searchQuery.location,
                    ["search_adults"]: searchQuery.guests.adult,
                    ["search_childrens"]: searchQuery.guests.child,
                    ["search_pet"]: searchQuery.pets,
                }}
                >
                    <motion.div
                    initial={{x: 0}}
                    whileInView={{x: `-${step*33.33}%`}}
                    key={"searchbar-long-multistep"}
                    className="banner-searchbar-formtrack">
                        <Row gutter={0} style={{margin: 0}}>
                            <Col span={8} style={{paddingInline: 20}}>
                                <Row>
                                    <Col span={16} className="banner-searchbar-location-mobile">
                                        <div className="banner-searchbar-icon">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                            <Form.Item
                                            style={{width: '90%', padding: 0, margin: 0}}
                                            name={"search_location"}
                                            >
                                            <Select
                                            showSearch
                                            showArrow={false}
                                            placeholder="Search destination..."
                                            optionFilterProp="children"
                                            bordered={false}
                                            value={searchQuery.location}
                                            onChange={(value) => setSearchQuery({...searchQuery, location: value})}
                                            className="banner-searchbar-location"
                                            filterOption={(inputValue, option) => option.label.toLowerCase().includes(inputValue.toLowerCase())}
                                            filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            style={{width: "90%", textTransform: 'capitalize'}}
                                            size="large"
                                            options={options} />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    <Col span={8} className="banner-searchbar-location-mobile-button">
                                        <Button style={{borderRadius: 10}} block size='large' onClick={() => setStep(1)} type='primary'>Let&apos;s Go</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8} style={{paddingInline: 20}}>
                                <Row>
                                    <Col span={3} style={{paddingRight: 0}}>
                                    <Button size='large' className='banner-searchbar-buttons back' icon={<i className="fa-solid fa-circle-arrow-left"></i>} onClick={() => setStep(0)}></Button>
                                    </Col>
                                    <Col span={13} style={{padding: 0}}>
                                        <Form.Item
                                        style={{padding: 0, margin: 0}}
                                        name={"search_dates"}
                                        >
                                            {/* <RangePicker
                                            disabledDate={disabledDate}
                                            placeholder={["Check-in", "Check-out"]}
                                            bordered={false} size='large' /> */}
                                            <RangeDatePicker 
                                            disabledDate={disabledDate}
                                            placeholder={["Check-in", "Check-out"]}
                                            bordered={false} size='large' />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                    <Button style={{borderRadius: 10}} type="primary" block size='large' onClick={() => setStep(2)}>Guests</Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8} style={{paddingInline: 20}}>
                                <Row>
                                    <Col span={3} style={{paddingRight: 0}}>
                                    <Button size='large' className='banner-searchbar-buttons back' icon={<i className="fa-solid fa-circle-arrow-left"></i>} onClick={() => setStep(1)}></Button>
                                    </Col>
                                    <Col span={12} offset={1} style={{padding: 0}}>
                                        <Popover
                                        trigger="click"
                                        open={guestsOpen}
                                        onOpenChange={handleOpenChange}
                                        placement='bottom' content={
                                            <Space style={{width: 200}} direction='vertical'>
                                                <Form.Item
                                                style={{padding: 0, margin: 0}}
                                                name={"search_adults"}
                                                >
                                                    <InputNumber size='large' min={1} max={20}
                                                    value={searchQuery.guests.adult}
                                                    onChange={(value) => setSearchQuery({...searchQuery, guests: {...searchQuery.guests, adult: value ? value : 1}})}
                                                    style={{width: '100%', backgroundColor: "#ffffff40", borderRadius: 5}} 
                                                    addonBefore={<span style={{width: 60, display: "block"}}>Adults</span>} />
                                                </Form.Item>
                                                <Form.Item
                                                style={{padding: 0, margin: 0}}
                                                name={"search_childrens"}
                                                >
                                                    <InputNumber size='large' min={0} max={10}
                                                    value={searchQuery.guests.child}
                                                    onChange={(value) => setSearchQuery({...searchQuery, guests: {...searchQuery.guests, child: value ? value : 0}})}
                                                    style={{width: '100%', backgroundColor: "#ffffff40", borderRadius: 5}} 
                                                    addonBefore={<span style={{width: 60, display: "block"}}>Children</span>} />
                                                </Form.Item>
                                                <Form.Item
                                                style={{padding: 0, margin: 0}}
                                                name={"search_pet"}
                                                >
                                                    <Checkbox size="large" value={searchQuery.pets} onChange={(e) => setSearchQuery({...searchQuery, pets: e.target.checked})}>Pets Allowed</Checkbox>
                                                </Form.Item>
                                            </Space>
                                        }>
                                            <Button size='large' className='banner-searchbar-buttons-guests' block type="text">Adults {searchQuery.guests.adult}, Childs {searchQuery.guests.child}{searchQuery.pets && ', Pets'} </Button>
                                        </Popover>
                                    </Col>
                                    <Col span={8}>
                                        <Button style={{borderRadius: 10}} type="primary" block size='large' onClick={() => explore()}>Explore</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </motion.div>
                </Form>
            </div>
            {/* {showAll && (
                <button
                onClick={() => {
                    setData({...data, location: "all"});
                    handleNext(true)
                }}
                className="form-button banner-searchbar-all full explore">
                    Show all SwitchOff destinations
                    <i className='bx bx-planet' ></i>
                </button>
            )} */}
        </div>
    )
}

const DebounceSelect = ({fetchOptions, debounceTimeout = 800, ...props}) => {
    const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

export const HistoSlider = ({title = 'Price Range', range = [0, 100000], setRange, list = []}) => {
    const [newArr, setNewArr] = useState([])
    const reArrangeValues = () => {
        let step = 10000
        let ll = []
        for(var i=range[0]; i<= 100000;i+=step){
            let inRange = list.filter((l) => l >=i && l < i+step).length
            ll = [...ll, inRange]
        }
        setNewArr(ll)
    }
    useEffect(() => {
        reArrangeValues()
    },[list])
    return (
        <div className="histoslider">
            <h3>{title}</h3>
            <div className="histoslider-container">
                {newArr.map((l, i) => <div key={i} className='histoslider-bar' style={{'--height': `${((l+1)/(Math.max(...newArr)+1))*60}px`}} />)}
            </div>
        </div>
    )
}

export const ExtraFilters = ({priceRange = [1000, 100000], setPriceRange, locations, selectedLocs, setSelectedLocs, properties}) => {
    const [showMoreLocs, setShowMoreLocs] = useState(false)
    const fetchOptions = async (value) => {
        return value ? locations.filter((l) => (l?.label ?? '').toLowerCase().includes(value.toLowerCase())) : []
    }
    return (
        <div className="filters">
            <div className="filters-container">
                <Form
                >
                    <Row gutter={[100,10]} style={{paddingInline: 20}}>
                        <Col md={5}>
                            <Popover
                            trigger="click"
                            placement='bottom'
                            content={
                                <div className='filters-pricerange'>
                                    <HistoSlider range={priceRange} setRange={setPriceRange} list={properties} />
                                    <Form.Item
                                    style={{margin: 0, width: 200}}
                                    >
                                        <Slider size="large" 
                                        max={100000} min={0} step={10}
                                        marks={{
                                            0: '₹0',
                                            100000: '₹1L+'
                                        }}
                                        value={priceRange}
                                        onChange={(price) => setPriceRange(price)}
                                        range defaultValue={priceRange} />
                                        {/* <Button className='filters-buttons' onClick={() => setPriceRange([1000,25000])} block>Less than ₹25,000</Button>
                                        <Button className='filters-buttons' onClick={() => setPriceRange([25000,50000])} block>More than ₹50,000</Button>
                                        <Button className='filters-buttons' onClick={() => setPriceRange([1000,50000])} block>Not Sure Yet</Button> */}
                                    </Form.Item>
                                </div>
                            }>
                                <h3>Select Price Range</h3>
                            </Popover>
                        </Col>
                        <Col style={{height: '100%'}} md={2}>
                        <Divider type='vertical' />
                        </Col>
                        {/* <Col md={14}>
                            <h3>Select Destination</h3>
                            <Form.Item
                            style={{margin: 0}}
                            >
                                <Select
                                    showSearch
                                    allowClear
                                    onClear={() => setSelectedLocs('all')}
                                    placeholder="Select a destination"
                                    optionFilterProp="children"
                                    onChange={(v) => setSelectedLocs(v)}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={locations}
                                />
                            </Form.Item>
                        </Col> */}
                    </Row>
                </Form>
            </div>
        </div>
    )
}

const PropertySearchResult = ({result, property}) => {
    return (
        <Link href={`/property/${property._id}`}>
            <a>
            <li className='ai-search-output-section-list-property'>
                <img src={result.image} />
                <div className="ai-search-output-section-list-property-content">
                    <h2 dangerouslySetInnerHTML={{__html: result?._highlightResult?.name?.value}} />
                    <p dangerouslySetInnerHTML={{__html: result?._highlightResult?.shortAddress?.value}}/>
                    <div className='price' dangerouslySetInnerHTML={{__html: 'from ₹'+result?._highlightResult?.price?.value.toLocaleString('en-IN')+"/-"}} />
                </div>
            </li>
            </a>
        </Link>
    )
}

export const AISearch = ({rawData}) => {
    const [props, setProps] = useState([])
    const [locs, setLocs] = useState([])
    const [blogs, setBlogs] = useState([])
    const [results, setResults] = useState([])

    const [query, setQuery] = useState('')

    const client = algoliasearch(process.env.algolia_app, process.env.algolia_key)

    const search = async () => {
        try{
            const searchResults = await client.search({
                requests: [
                    {
                        indexName: 'switchoff',
                        query: query,
                        hitsPerPage: 10
                    }
                ]
            })
            setResults(searchResults.results[0])
            console.log(searchResults)
        }catch(err){
            console.log(err)
            message.error("Error in Algolia Search, check console.")
        }
    }

    useEffect(() => {
        search()
    },[query])

    return (
        <div className="ai-search">
            <div className="ai-search-input">
                <SearchOutlined className='ai-search-input-icon' />
                <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={'Search for “best resorts in coorg”'} type="text" name="" id="" />
            </div>
            <div className="ai-search-output">
                <div className="ai-search-output-section">
                    <p className="ai-search-output-section-title">
                        Locations
                    </p>
                    <ul className="ai-search-output-section-list">
                        <li className="search-term">
                            new search
                        </li>
                    </ul>
                </div>
                <div className="ai-search-output-section">
                    <p className="ai-search-output-section-title">
                        Properties
                    </p>
                    <ul className="ai-search-output-section-list">
                        {results && results?.hits?.map((resu, i) => <PropertySearchResult key={i} property={rawData.filter((p) => p._id === resu.objectID)[0]} result={resu} />)}
                    </ul>
                </div>
            </div>
        </div>
    )
}