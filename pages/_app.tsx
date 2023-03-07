import '../styles/globals.css'
import '../styles/slider.scss'
import '../styles/sliderItem.scss'
import '../styles/selectedPage.scss'
import '../styles/focusedImage.scss'

import '../styles/layout.scss'

import type { AppProps } from 'next/app'
import { store } from '../store/store'
import { Provider } from 'react-redux'

import { useTransition, animated } from "react-spring";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'

import Layout from '../layouts/Layout'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // initial state
  const [compoentArray, setComponentArray] = useState([
    <Component key={router.pathname} {...pageProps} />,
  ]);

  const transitions = useTransition(compoentArray, {
    from: {
      position: "absolute",
      top: '100vh',
      zIndex: 1,
      // opacity: 0
    },
    enter: [{
      position: "absolute",
      top: '0',
      zIndex: 1,
      // opacity: 1
    }],
    leave: [{
      position: "absolute",
      zIndex: 0,
      // opacity: 0,
    }],
    // delay: 200,
    // config: { duration: 1000 },
  });


  useEffect(() => {
    if (compoentArray[0].key === router.pathname) {
      return;
    }
    setComponentArray([<Component key={router.pathname} {...pageProps} />]);
  }, [Component, pageProps, router, compoentArray]);



  return (
    <Provider store={store}>
      <Layout>
        {/* <Component {...pageProps} /> */}
        {transitions((style: any, item: any) => {
          // Render items managed by react-spring
          return <animated.div style={style}>{item}</animated.div>;
        })}
      </Layout>
    </Provider>
  )
}
