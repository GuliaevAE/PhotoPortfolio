import { configureStore } from "@reduxjs/toolkit"
import pageContent from "./PageContentSlice"


export const store = configureStore({
  reducer: {
    pageContent
  }
})

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch