import React, { useState } from 'react'

export default function SelectAnswersAdmin(props) {
  return (
    <select id={'selectBox' + props.indice}   className='border outline-none rounded-lg mx-1 select-none focus:boderColorCustom'>
      <option  selected disabled></option>
      <option  value={props.obj.opcion1}>{props.obj.opcion1}</option>
      <option  value={props.obj.opcion2}>{props.obj.opcion2}</option>
      <option  value={props.obj.opcion3}>{props.obj.opcion3}</option>
    </select>
  )
}
