import React, { useState } from 'react'

export default function SelectAnswersPreview(props) {

  

  function handle() {
    let value = document.getElementById("selectBox" + props.indice).value;
    var obj = {
        opcion1:props.obj.opcion1, 
        opcion2:props.obj.opcion2, 
        opcion3:props.obj.opcion3,
        respuestaCorrecta:value
    };
    props.handleSelectValues(obj, props.indice); 
  }

  return (
    <select id={'selectBox' + props.indice} onChange={handle}  className='border outline-none rounded-lg mx-1 select-none focus:boderColorCustom'>
      <option  selected disabled></option>
      <option  value={props.obj.opcion1}>{props.obj.opcion1}</option>
      <option  value={props.obj.opcion2}>{props.obj.opcion2}</option>
      <option  value={props.obj.opcion3}>{props.obj.opcion3}</option>
    </select>
  )
}
