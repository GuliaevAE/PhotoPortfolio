import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Slider from '../components/slider'
import { useRef, useState } from 'react'

import SelectedPage from '../components/selectedPage'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { Allcontent, SelectedContent, booleanSwitcher } from '../store/PageContentSlice'
import { selectContent, selectNull, changeBooleanSwitcher } from '../store/PageContentSlice'

import firebase from '../firebase/init'

firebase()






export default function Home() {
  

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Slider />
        <SelectedPage />
      </main>
    </>
  )
}
