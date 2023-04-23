import '../styles/globals.css'
import '../styles/slider.scss'
import '../styles/slider_Item.scss'
import '../styles/selectedPage.scss'
import '../styles/selectedPage_focusedImage.scss'
import '../styles/about.scss'
import '../styles/navigationMenu.scss'

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
      zIndex: 0,
    },
    enter: [{
      position: "absolute",
      top: '0',
      zIndex: 1,
    }],
    leave: [{
      position: "absolute",
      zIndex: 1,
      top: '100vh',
    }],
  });

  let [currentPath, setCurrentPath] = useState('/')
  useEffect(() => {

    // if (compoentArray[0].key === router.pathname) {   
    //   return;
    // }

    if (currentPath === router.asPath) {
      return;
    }
    console.log(router.asPath)
    setComponentArray([<Component key={router.pathname} {...pageProps} />]);
    setCurrentPath(router.asPath)
  }, [Component, pageProps, router, compoentArray, currentPath]);



  return (
    <Provider store={store}>

      <Layout>
        {transitions((style: any, item: any) => {
          return <animated.div style={style}>{item}</animated.div>;
        })}
      </Layout>
    </Provider>
  )
}
