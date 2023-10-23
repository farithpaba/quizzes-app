import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  elements: [
    {
      id: "1",
      pregunta: "How much ____ the train to Santiago cost? ",
      respuestas: ["does", "is", "do"],
      respuestaCorrecta: "does",
      type: "multipleChoice"
    },
    /* {
      id: "2",
      pregunta: "How much ____ the train to Santiago costs? ",
      respuestas: ["does", "is", "do"],
      respuestaCorrecta: "does",
      type: "multipleChoice"
    },
    {
      id: "3",
      pregunta: "How much ____ the train to Santiago costx? ",
      respuestas: ["does", "is", "do"],
      respuestaCorrecta: "does",
      type: "multipleChoice"
    }, */
  ]
};

export const elementsSlice = createSlice({
  name: "elements",
  initialState,
  reducers: {
    setElementsRedux: (state, action) => {
      state.elements = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setElementsRedux } = elementsSlice.actions;

export const selectElements = (state) => state.elements.elements;

export default elementsSlice.reducer;