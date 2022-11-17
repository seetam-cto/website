import React, {useState, useEffect} from 'react'
import { motion } from "framer-motion"
import { DateRangePicker } from 'react-date-range';
import { addDays, eachWeekendOfInterval } from 'date-fns';
import longArrow from "../../assets/images/next.svg"
import moment from "moment"
import Image from 'next/image';
import { CheckboxInput, CounterInput } from '../UI';
import SelectSearch from 'react-select-search';
import { useRouter } from 'next/router';

//locationbox
const LocationBox = ({data, setData, handleNext, properties}) => {
    const [options, setOptions] = useState(properties.map((prp) => {
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
                <button onClick={() => handleNext(true)} className="form-button full explore">
                    Let&apos;s explore {data.location}
                    <i className='bx bx-planet' ></i>
                </button>
            )
            : (<>
                <h4 className="searchbar-locationbox-divide">OR</h4>
                <button
                onClick={() => {
                    setData({...data, location: "all"});
                    handleNext(true)
                }}
                className="form-button full explore">
                    Show all SwitchOff destinations
                    <i className='bx bx-planet' ></i>
                </button>
                </>
            )
            }
            <div className="searchbar-locationbox-recent">
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
        console.log(date.selection)
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
        className="searchbar-guestsbox">
            <div className="searchbar-title">
                <div onClick={() => handleNext(false)} className="back">
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
            <div className="row full">
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
                    <button onClick={() => explore()} className="form-button explore">
                        Explore <i className='bx bxs-chevron-right' ></i>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

const SearchBar = ({properties}) => {
    const [searchq, setSearchq] = useState({
        location: '',
        checkin: new Date(),
        checkout: addDays(new Date(), 2),
        guests: {
            adult: 1,
            child: 0,
        },
        handicap: false,
        pets: false
    })
    const closeAll = () => {
        setLocationbox(false)
        setCalendarbox(false)
        setGuestsbox(false)
    }
    const [locationbox, setLocationbox] = useState(false)
    const [calendarbox, setCalendarbox] = useState(false)
    const [guestsbox, setGuestsbox] = useState(false)

    const afterLocation = (value) => {
        setLocationbox(!value)
        setCalendarbox(value)
    }

    const afterCalendar = (value) => {
        value ? setCalendarbox(!value) : setCalendarbox(value)
        !value && setLocationbox(!value)
        value && setGuestsbox(value)
    }

    const afterGuests = (value) => {
        setGuestsbox(value)
        !value && setCalendarbox(!value)
    }

    const router = useRouter()

    const explore = () => {
        let query = `query=${searchq.location}&start=${moment(searchq.checkin).format("MM-DD-YYYY")}&end=${moment(searchq.checkout).format("MM-DD-YYYY")}&guests=${searchq.guests.adult + searchq.guests.child}`
        router.push(`/search?${query}`)
    }
  return (
    <>
        {(locationbox || calendarbox || guestsbox) && 
            <div onClick={() =>  closeAll()} className="searchbar-overlay"></div>}
        <div className="searchbar">
        {(locationbox || calendarbox || guestsbox) && 
            <div onClick={() =>  closeAll()} className="searchbar-overlay"></div>}
            <div className="container searchbar-container">
                <div className="row full">
                    <div className="col-20 m-full searchbar-gap">
                        <div
                        onClick={() => {setLocationbox(true); }}
                        className="searchbar-item">
                            <div className="icon">
                                <i className='bx bx-map' ></i>
                            </div>
                            <div className="content">
                                <h3>Location</h3>
                                <p>{searchq.location ? searchq.location : 'Your Destination'}</p>
                            </div>
                        </div>
                        {locationbox && (
                            <LocationBox properties={properties} data={searchq} setData={setSearchq} handleNext={afterLocation} />
                        )}
                    </div>
                    <div className="col-20 searchbar-gap">
                        <div
                        onClick={() => {setCalendarbox(true); }}
                        className="searchbar-item">
                            <div className="icon">
                                <i className='bx bxs-calendar-check'></i>
                            </div>
                            <div className="content">
                                <h3>Check In</h3>
                                <p>{searchq.checkin ? moment(searchq.checkin).format('MMM Do YYYY') : 'Choose your date'}</p>
                            </div>
                        </div>
                        {calendarbox && (
                            <CalendarBox data={searchq} setData={setSearchq} handleNext={afterCalendar} />
                        )}
                    </div>
                    <div className="col-20 searchbar-gap">
                        <div
                        onClick={() => {setCalendarbox(true); }}
                        className="searchbar-item">
                            <div className="icon">
                                <i className='bx bx-calendar-check' ></i>
                            </div>
                            <div className="content">
                                <h3>Check Out</h3>
                                <p>{searchq.checkout
                                ? moment(searchq.checkout).format('MMM Do YYYY') 
                                : 'Choose your date'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-20 m-full">
                        <div
                        onClick={() => {setGuestsbox(true); }}
                        className="searchbar-item">
                            <div className="icon">
                                <i className='bx bxs-user' ></i>
                            </div>
                            <div className="content">
                                <h3>Guests</h3>
                                <p>{(searchq.guests.adult + searchq.guests.child) > 1 ? ("Total Guests " + (searchq.guests.adult + searchq.guests.child)) : 'Number of guests'}</p>
                            </div>
                        </div>
                        {guestsbox && (
                            <GuestsBox explore={explore} data={searchq} setData={setSearchq} handleNext={afterGuests} />
                        )}
                    </div>
                    <div className="col-20">
                        <div className="searchbar-item button">
                            <button className="form-button searchbar-item-button">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    
  )
}

export const SearchBarMobile = () => {
    
} 

export default SearchBar