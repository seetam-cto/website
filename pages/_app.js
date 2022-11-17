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

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <>
        <NextNProgress color="#FF5A5F" />
        <Component {...pageProps} />
      </>
    </Provider>
  )
}

export default MyApp
