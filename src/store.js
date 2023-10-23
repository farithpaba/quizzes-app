import { configureStore } from '@reduxjs/toolkit'
import questionReducer from "./redux/newQuestionSlice"
import elementsReducer from "./redux/newElementsSlice"
import globalUserReducer from "./redux/newGlobalUserSlice"

export const store = configureStore({
  reducer: {
    question: questionReducer,
    elements:elementsReducer,
    globalUser:globalUserReducer,
  },
})