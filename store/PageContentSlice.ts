import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

type Note = {
  id: string
  header: string
  content: string
  img:string
  imagetitle:string
  
}

interface NoteState {
  AllContent: Array<Note>,
  SelectedContent: null | undefined| Note,
  booleanSwitcher: boolean,
  selectedPage:string
}

const initialState: NoteState = {
  AllContent:
    [{ id: '1', header: '1Toadsadasdo for the day', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem',img: "https://look.com.ua/pic/201701/1920x1080/look.com.ua-192291.jpg", imagetitle: 'From sadasdNature to Culture' },
    { id: '2', header: '2Toadsadasdo for the day', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://img2.akspic.ru/crops/9/2/1/6/6/166129/166129-california_streaming_apple_event_wallpaper_without_logo-1920x1080.jpg", imagetitle: 'Reventing Wonder' },
    { id: '3', header: '3Toadsadasdo for the day', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://images.wallpaperscraft.ru/image/single/ulitsa_osveshchenie_podsvetka_134856_1920x1080.jpg", imagetitle: 'Sound Expressed In Full' },
    { id: '4', header: '4Toadsadasdo for the day', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://wallpaperaccess.com/full/109666.jpg", imagetitle: 'From Gaggio With Love' },
    { id: '5', header: '5Toadsadasdo for the day', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://mikhail.krivyy.com/wallpapers/list/m11-6-4/1920x1080.jpg", imagetitle: 'The Regeneration Suit' },
    { id: '6', header: '6Toadsadasdo for the day', content: 'Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem' ,img: "https://mobimg.b-cdn.net/v3/fetch/9c/9c63d540a3284fd5b7077e6a63dd2d3e.jpeg", imagetitle: 'Чето еще' }],
  SelectedContent: null,
  booleanSwitcher: false,
  selectedPage:"work"

}

export const pageContentSlice = createSlice({
  name: 'pageContentSlice',
  initialState,
  reducers: {
    selectContent: (state, action: PayloadAction<string>) => {
      console.log('action', action)
      state.SelectedContent = state.AllContent.find(x=>x.id===action.payload)
    },
    selectNull: (state) => {
      state.SelectedContent = null
    },
    changeBooleanSwitcher: (state, action: PayloadAction<boolean>) => {
      state.booleanSwitcher = action.payload
    },
    changeSelectedPage:(state, action: PayloadAction<string>) =>{
      state.selectedPage = action.payload
    }
  }
})

// actions
export const { selectContent, selectNull, changeBooleanSwitcher , changeSelectedPage} = pageContentSlice.actions

// selectors
export const Allcontent = (state: RootState) => state.pageContent.AllContent
export const SelectedContent = (state: RootState) => state.pageContent.SelectedContent
export const booleanSwitcher = (state: RootState) => state.pageContent.booleanSwitcher
export const selectedPage = (state: RootState) => state.pageContent.selectedPage

export default pageContentSlice.reducer