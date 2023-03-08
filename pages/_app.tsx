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

  const [compoentArray, setComponentArray] = useState([
    <Component key={router.pathname} {...pageProps} />,
  ]);

  const transitions = useTransition(compoentArray, {
    from: {
      position: "absolute",
      top: '0',
      zIndex:0,
    },
    enter: [{
      position: "absolute",
      top: '0',
      zIndex:1,
    }],
    leave: [{
      position: "absolute",
      zIndex:1 ,
      top: '100vh',
    }],
  });


  useEffect(() => {
    if (compoentArray[0].key === router.pathname) {
      return;
    }
    setComponentArray([<Component key={router.pathname} {...pageProps} />]);
  }, [Component, pageProps, router, compoentArray]);



  return (
    <Provider store={store}>
      {transitions((style: any, item: any) => {
        return <animated.div style={style}>{item}</animated.div>;
      })}
    </Provider>
  )
}
