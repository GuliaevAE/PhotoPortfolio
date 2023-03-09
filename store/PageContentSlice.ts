import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import Comand from '../public/images/Comand.webp'
import Comand1 from '../public/images/Comand2.webp'
import Olga from '../public/images/Olga.webp'
import Olga1 from '../public/images/Olga2.webp'
import Retush from '../public/images/Retush.webp'
import Retush1 from '../public/images/Retush2.webp'
import YulySmirnova from '../public/images/YulySmirnova.webp'
import YulySmirnova1 from '../public/images/YulySmirnova2.webp'
import FSTany from '../public/images/FSTany.webp'
import FSTany1 from '../public/images/FSTany2.webp'
import Yana from '../public/images/Yana.webp'
import Yana1 from '../public/images/Yana2.webp'
import FS from '../public/images/FSs.webp'
import FS1 from '../public/images/FSs2.webp'
import { StaticImageData } from "next/image"

export type Note = {
  id: string
  header: string
  content: string
  img: any
  imagetitle: string,
  numberOfImages: number,
  dir: string,
  selectpImg: any
}

export type SelectedContentType = null | undefined | Note

interface NoteState {
  AllContent: Array<Note>,
  SelectedContent: null | undefined | Note,
  booleanSwitcher: boolean,
  selectedPage: string,
  selectedDir: null | string,
  focusImage: any,
  arrayOfLoadedImages: boolean[]
}

const initialState: NoteState = {
  AllContent:
    [{ id: '1', selectpImg: Comand1, numberOfImages: 15, header: 'Команда', dir: 'Comand', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Comand, imagetitle: 'From sadasdNature to Culture' },
    { id: '2', selectpImg: Olga1, numberOfImages: 15, header: 'Ольга Ипатова', dir: 'OlgaIpatova', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Olga, imagetitle: 'Reventing Wonder' },
    { id: '3', selectpImg: Retush1, numberOfImages: 15, header: 'Юдя Родаева', dir: 'Retush', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Retush, imagetitle: 'Sound Expressed In Full' },
    { id: '4', selectpImg: YulySmirnova1, numberOfImages: 15, header: 'Юля Смирнова', dir: 'YulySmirnova', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: YulySmirnova, imagetitle: 'From Gaggio With Love' },
    { id: '5', selectpImg: FSTany1, numberOfImages: 15, header: 'Таня', dir: 'FSTany', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: FSTany, imagetitle: 'The Regeneration Suit' },
    { id: '6', selectpImg: Yana1, numberOfImages: 15, header: 'Яна Суетнова', dir: 'Yana', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Yana, imagetitle: 'Чето еще' },
    { id: '7', selectpImg: FS1, numberOfImages: 15, header: 'Людитлп Бухова', dir: 'FS', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: FS, imagetitle: 'Чето еще' }

    ],
  SelectedContent: null,
  booleanSwitcher: false,
  selectedPage: "work",
  selectedDir: null,

  focusImage: null,


  arrayOfLoadedImages: []

}

export const pageContentSlice = createSlice({
  name: 'pageContentSlice',
  initialState,
  reducers: {
    changearrayOfLoadedImages: (state) => {
      state.arrayOfLoadedImages.push(true)
    },
    emptychangearrayOfLoadedImages:(state)=>{
      state.arrayOfLoadedImages = []
    },

    selectContent: (state, action: PayloadAction<string>) => {
      state.SelectedContent = state.AllContent.find(x => x.id === action.payload)
    },
    selectNull: (state) => {
      state.SelectedContent = null
    },
    changeBooleanSwitcher: (state, action: PayloadAction<boolean>) => {
      state.booleanSwitcher = action.payload
    },
    changeSelectedPage: (state, action: PayloadAction<string>) => {
      state.selectedPage = action.payload
    },
    changeSelectedDir: (state, action: PayloadAction<string | null>) => {
      state.selectedDir = action.payload
    },
    changeFocusedImage: (state, action: PayloadAction<any>) => {
      state.focusImage = action.payload
    }
  }
})

// actions
export const {changearrayOfLoadedImages,emptychangearrayOfLoadedImages, selectContent, selectNull, changeBooleanSwitcher, changeSelectedPage, changeSelectedDir, changeFocusedImage } = pageContentSlice.actions

// selectors
export const Allcontent = (state: RootState) => state.pageContent.AllContent
export const SelectedContent = (state: RootState) => state.pageContent.SelectedContent
export const booleanSwitcher = (state: RootState) => state.pageContent.booleanSwitcher
export const selectedPage = (state: RootState) => state.pageContent.selectedPage
export const selectedDir = (state: RootState) => state.pageContent.selectedDir
export const focusImage = (state: RootState) => state.pageContent.focusImage
export const arrayOfLoadedImages = (state: RootState) => state.pageContent.arrayOfLoadedImages
export default pageContentSlice.reducer