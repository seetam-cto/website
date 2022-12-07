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

function MyApp({ Component, pageProps }) {
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
    <Provider store={store}>
      <>
        <NextNProgress color="#FF5A5F" />
        <Component {...pageProps} />
      </>
    </Provider>
    </>
  )
}

export default MyApp
