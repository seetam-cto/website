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
        {/* <script type="text/javascript" src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"></script> */}
        <script src="https://kit.fontawesome.com/6f7794673e.js" crossOrigin="anonymous" async />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>
      <body style={{backgroundColor: "#F3F4FA"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}