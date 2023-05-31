import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavigationRail from '../NavigationRail'
import { AnimatePresence } from 'framer-motion'
import { Col, Row, Dropdown, Button, Space, Tooltip, Modal, Avatar, Popover, Segmented, Form, Input, Divider, message } from 'antd'
import { MailOutlined, DownOutlined, UserOutlined, LockOutlined, UnlockOutlined, 
    CalendarOutlined, BulbOutlined, LoadingOutlined, MobileOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import { atom, useAtom } from 'jotai'
import { useSession, signIn, signOut } from 'next-auth/react'
import google from "../../assets/images/google.png"
import { RESET, atomWithStorage } from 'jotai/utils'
import { login, register, socialLogin } from '../../controllers/general'

export const loginPopupState = atom(false)

export const credsData = atom({
    name: '',
    email: '',
    password: '',
    phone_number: ''
})

export const userData = atomWithStorage("auth", {
    token: '',
    user: {
        _id: '',
        email: '',
        phone_number: "",
        name: '',
        user_type: '',
        profile_image: '',
        favourites: []
    }
})

export const getUserToken = atom((get) => get(userData))

const Header = ({theme = "light",headerSettings}) => {
    const [navrail, setNavrail] = useState(false)
    const [favOn, setFavOn] = useState(false)
    const router = useRouter()
    const {data: session, status} = useSession()
    const [isModalOpen, setIsModalOpen] = useAtom(loginPopupState)

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
    setIsModalOpen(false);
    };
    const handleCancel = () => {
    setIsModalOpen(false);
    };

    const [loginData, setLoginData] = useAtom(credsData)
    const [formState, setFormState] = useState("Login")
    const dropdownContent = (
        <div className='navbar-user-box-dropdown'>
            {/* <Button icon={<UserOutlined />} type='link' onClick={() => router.push("/my-account")}>My Account</Button> */}
            {/* <Button icon={<CalendarOutlined />} type='link' onClick={() => signIn("credentials")}>My Bookings</Button> */}
            <Button icon={<BulbOutlined />} type='link' onClick={() => signOut()}>Help Center</Button>
            <Button icon={<UnlockOutlined />} type='link' danger onClick={() => handleSignout()}>Sign Out</Button>
        </div>
    )
    const [loading, setLoading] = useState(false)

    const [form] = Form.useForm()

    const [userToken, setUserToken] = useAtom(userData)
    const [jwtToken] = useAtom(getUserToken)

    const handleLogin = async () => {
        try{
            let res = await login(loginData)
            let {data} = res
            setUserToken(data)
            message.success("Login Successful!")
            router.reload()
        }catch(err){
            console.log(err)
        }finally{
            setLoginData(RESET)
        }
    }

    const handleRegister = async () => {
        try{
            let res = await register(loginData)
            let {data} = res
            setUserToken(data)
            message.success("Registered!")
            router.reload()
        }catch(err){
            console.log(err)
        }finally{
            setLoginData(RESET)
        }
    }

    const handleSocialLogin = async () => {
        if(status === "authenticated"){
            try{
                let res = await socialLogin({
                    email: session.user.email,
                    profile_image: session.user.image,
                    name: session.user.name
                })
                let {data} = res
                setUserToken(data)
            }catch(err){
                console.log({social_error: err})
                message.error("Error in social login registration")
            }finally{
                setLoginData(RESET)
            }
        }
    }

    const handleSignout = () => {
        signOut()
        setUserToken(RESET)
        setLoginData(RESET)
    }

    useEffect(() => {
        handleSocialLogin()
    },[router])

    return (
        <header className={theme}>
            <div className="navbar-container">
                <div className={`navbar ${theme}`}>
                    <Row>
                        <Col xs={10} md={4}>
                            <Link href={"/"}>
                                <a className='navbar-logo-link'>
                                <Image
                                objectFit={"contain"}
                                quality={100}
                                width={1000}
                                height={300}
                                src={headerSettings.general.logo}
                                />
                                </a>
                            </Link>
                        </Col>
                        <Col xs={0} md={12} offset={2}>
                            <div className="navbar-menu">
                            {headerSettings && headerSettings.general.menu.map((item, i) => 
                                (
                                    <span key={i}>
                                    {item.submenu.length > 0 ? (
                                        <Dropdown
                                        key={i}
                                        menu={{
                                            items: item.submenu.map((sm, x) => {return {
                                                key: `${x}`,
                                                label: <Button onClick={() => router.push(sm.url)} type="link">{sm.title}</Button>
                                            }})
                                        }}
                                        >
                                            <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Button onClick={() => router.push(item.url)} type="link" size="large">{item.title}</Button>
                                                <DownOutlined />
                                            </Space>
                                            </a>
                                        </Dropdown>
                                    ) : (   
                                        <Button  onClick={() => router.push(item.url)} size='large' key={i} type="link">{item.title}</Button>
                                    )}
                                    </span>
                                )
                            )}
                            </div>
                        </Col>
                        <Col xs={0} md={6}>
                            <div className="navbar-user">
                            <Link href="/search"><a><SearchOutlined style={{fontSize: '1.5rem', color: '#111111A0', marginRight: 20}} /></a></Link>
                            {/* <Tooltip title="Favourites" placement='bottom'>
                                    <Button onMouseEnter={() => setFavOn(true)} onMouseLeave={() => setFavOn(false)}
                                    className='navbar-user-favourites'>
                                        {userToken.user.favourites.length > 0 && 
                                        <span className='navbar-user-favourites-badge'>
                                            {userToken.user.favourites.length}
                                        </span>}
                                        <i className={`fa-${favOn ? "solid" : "regular"} fa-heart`}></i>
                                    </Button>
                            </Tooltip> */}
                            {jwtToken && jwtToken.token ? <Space>
                                <div className="navbar-user-box">
                                    <Popover title={<h3 className='navbar-user-box-title'>{jwtToken?.user.name}</h3>} placement='bottomRight' trigger={"click"} content={dropdownContent}>
                                        <Avatar style={{cursor: 'pointer'}} src={jwtToken?.user?.profile_image} icon={<UserOutlined />} />
                                    </Popover>
                                </div>
                            </Space>
                            : <Button shape='round' onClick={showModal} size='large' type='primary' icon={<UserOutlined />}>Login</Button>
                            }
                            </div>
                        </Col>
                        <Col xs={14} md={0}>
                            <div className="navbar-user">
                                <Button className='navbar-user-mobile'><i className="fa-solid fa-heart"></i></Button>
                                <Button onClick={() => setNavrail(true)} className='navbar-user-mobile'>
                                    <i className="fa-solid fa-layer-group"></i>
                                    {/* <i className="fa-solid fa-bars"></i> */}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <AnimatePresence>
                {navrail && <NavigationRail close={setNavrail} settings={headerSettings.general} />}
            </AnimatePresence>
            <Modal
            footer={null}
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="navbar-login-box">
                    <h2 className="title">Welcome Back</h2>
                    <p>Please login to continue</p>
                    <br />
                    <Segmented size='large' className='navbar-login-box-options' options={["Login", "Register"]} value={formState} onChange={(value) => setFormState(value)} />
                    <Form
                    form={form}
                    initialValues={{
                        "name": '',
                        "password" :"",
                        "phoneNumber": "",
                        "email": ""
                    }}
                    layout=''
                    style={{width: '60%'}}
                    >
                        <Divider />
                        {formState === "Register" && (<Form.Item
                        name="name"
                        rules={[{
                            required: true,
                            message: "Name is required!",
                          }]}
                        >
                            <Input
                            prefix={<UserOutlined />}
                            placeholder='John Doe'
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, name: e.target.value})}
                            block size='large' />
                        </Form.Item>)}
                        <Form.Item
                        name="email"
                        rules={[{
                            required: true,
                            type: "email",
                            message: "The input is not valid E-mail!",
                          }]}
                        >
                            <Input
                            prefix={<MailOutlined />}
                            placeholder='xyz@email.com'
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            block size='large' />
                        </Form.Item>
                        <Form.Item
                        name="password"
                        rules={[{
                            required: true,
                            message: "Please enter password!",
                          }]}
                        >
                            <Input.Password
                            placeholder='Enter your password'
                            prefix={<LockOutlined />}
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            block size='large' />
                        </Form.Item>
                        {formState === "Register" && (
                            <Form.Item
                            name="phoneNumber"
                            rules={[{
                                required: true,
                                message: "Please enter password!",
                              }]}
                            >
                                <Input
                                placeholder='Enter your phone number'
                                prefix={<MobileOutlined />}
                                value={loginData.phone_number}
                                onChange={(e) => setLoginData({...loginData, phone_number: e.target.value})}
                                block size='large' />
                            </Form.Item>
                        )}
                        <Button block size='large'
                        onClick={() => {formState === "Register" ? handleRegister() : handleLogin()}}
                        type='primary'>{formState} {loading && <LoadingOutlined />}</Button>
                        <Divider>OR</Divider>
                    </Form>
                    <div onClick={() => signIn("google")} className="navbar-login-box-social">
                        <img src={google.src} />
                        Sign in with Google
                    </div>
                    <p className='navbar-login-box-terms'>By continuing you agree to our <Link href={"#"}>Terms and Conditions</Link></p>
                </div>
            </Modal>
        </header>
    )
}

export default Header