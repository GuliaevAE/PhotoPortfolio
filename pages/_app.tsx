import '../styles/globals.css'
import '../styles/slider.scss'
import '../styles/sliderItem.scss'
import '../styles/selectedPage.scss'
import '../styles/focusedImage.scss'
import type { AppProps } from 'next/app'
import {store} from '../store/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return(
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
)
}
