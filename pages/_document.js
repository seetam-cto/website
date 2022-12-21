// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'
import Lottie from 'react-lottie';
import * as loadAnim from "../assets/images/loading.json"

const loaderOptions = {
  loop: true,
  autoplay: true, 
  animationData: loadAnim,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://kit.fontawesome.com/6f7794673e.js" crossorigin="anonymous"></script>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </Head>
      <body style={{backgroundColor: "#F3F4FA"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}