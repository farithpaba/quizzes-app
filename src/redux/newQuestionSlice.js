import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question:{
    pregunta:"",
    respuestas:[],
    respuestaCorrecta:"",
    textoPrevio:""
  }
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion: (state,action) => {
        state.question = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setQuestion } = questionSlice.actions;

export const selectQuestion = (state) => state.question.question;

export default questionSlice.reducer;