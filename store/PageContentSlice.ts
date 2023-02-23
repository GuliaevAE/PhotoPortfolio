import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import Comand from '../public/images/Comand.jpg'
import Olga from '../public/images/Olga.jpg'


export type Note = {
  id: string
  header: string
  content: string
  img: string | any
  imagetitle: string,
  numberOfImages:number,
  dir:string
}

export type SelectedContentType = null | undefined | Note

interface NoteState {
  AllContent: Array<Note>,
  SelectedContent: null | undefined | Note,
  booleanSwitcher: boolean,
  selectedPage: string,
  selectedDir: null | string
}

const initialState: NoteState = {
  AllContent:
    [{ id: '1',numberOfImages:51, header: 'Команда', dir:'Comand', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Comand, imagetitle: 'From sadasdNature to Culture' },
    { id: '2',numberOfImages:54, header: 'Ольга Ипатова', dir:'Olga Ipatova', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem', img: Olga, imagetitle: 'Reventing Wonder' },
      // { id: '3',numberOfImages:51, header: '3Toadsadasdo for the day',dir:'Comand', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://images.wallpaperscraft.ru/image/single/ulitsa_osveshchenie_podsvetka_134856_1920x1080.jpg", imagetitle: 'Sound Expressed In Full' },
      // { id: '4',numberOfImages:51, header: '4Toadsadasdo for the day',dir:'Comand', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://wallpaperaccess.com/full/109666.jpg", imagetitle: 'From Gaggio With Love' },
      // { id: '5',numberOfImages:51, header: '5Toadsadasdo for the day',dir:'Comand', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://mikhail.krivyy.com/wallpapers/list/m11-6-4/1920x1080.jpg", imagetitle: 'The Regeneration Suit' },
      // { id: '6',numberOfImages:51, header: '6Toadsadasdo for the day',dir:'Comand', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://mobimg.b-cdn.net/v3/fetch/9c/9c63d540a3284fd5b7077e6a63dd2d3e.jpeg", imagetitle: 'Чето еще' }
    ],
  SelectedContent: null,
  booleanSwitcher: false,
  selectedPage: "work",
  selectedDir: null

}

export const pageContentSlice = createSlice({
  name: 'pageContentSlice',
  initialState,
  reducers: {
    selectContent: (state, action: PayloadAction<string>) => {
      console.log('action', action)
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
    changeSelectedDir: (state, action: PayloadAction<string>) => {
      state.selectedDir = action.payload
    }
  }
})

// actions
export const { selectContent, selectNull, changeBooleanSwitcher, changeSelectedPage,changeSelectedDir } = pageContentSlice.actions

// selectors
export const Allcontent = (state: RootState) => state.pageContent.AllContent
export const SelectedContent = (state: RootState) => state.pageContent.SelectedContent
export const booleanSwitcher = (state: RootState) => state.pageContent.booleanSwitcher
export const selectedPage = (state: RootState) => state.pageContent.selectedPage
export const selectedDir = (state: RootState) => state.pageContent.selectedDir
export default pageContentSlice.reducer