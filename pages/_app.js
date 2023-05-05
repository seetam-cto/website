// import '../styles/globals.css'
import "../styles/App.scss"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-select-search/style.css'
import { store } from "../store/store"
import { Provider } from "react-redux"
import NextNProgress from 'nextjs-progressbar';
import Script from "next/script";
import 'swiper/css/bundle';
import { ConfigProvider } from 'antd';
import React, {useEffect} from "react"
import { useRouter } from "next/router";
import {SessionProvider} from "next-auth/react"
import Login from "../components/Auth";

function MyApp({ Component, pageProps, session }) {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
        if (loader){
          setTimeout(() => {
            loader.style.opacity = "0"
            setTimeout(() => {
              loader.style.display = 'none';
            }, 1000)
          }, 2000)
        }
    }
}, [router]);
  return (
    <>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-5QMWVR4FB3"/>
    <Script
    id='google-analytics'
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
    __html: `
    window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5QMWVR4FB3');
    `,
    }}/>
    {/* <Script async src="https://otpless.com/auth.js" /> */}
    <Provider store={store}>
      <>
        <NextNProgress color="#4ecca3" />
        <ConfigProvider
        theme={{ token: {
            colorPrimary: '#4ecca3',
            colorLink: '#393e46',
            colorLinkHover: '#543885',
            colorBgElevated: '#ffffff',
            fontFamily: "'Jost', sans-serif"
          }}}
        >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
        </ConfigProvider>
      </>
    </Provider>
    </>
  )
}

export default MyApp
