import React, { useState } from 'react'
import ModalSelectAnswers from './ModalSelectAnswers';

export default function SelectAnswers(props) {
  const [showMyModal, setShowMyModal] = useState(false);
  const handleOnClose = () => setShowMyModal(false);
  const handleValue = (e) => { if (e !== null) { props.handleSelectValues(e, props.indice); } }

  return (
    <>
      <select onClick={() => setShowMyModal(true)} className='border outline-none rounded-lg mx-1 select-none'>
        
            <option className='hidden'  value={props.obj.opcion1}>{props.obj.opcion1}</option>
            <option className='hidden'  value={props.obj.opcion2}>{props.obj.opcion2}</option>
            <option className='hidden'  value={props.obj.opcion3}>{props.obj.opcion3}</option>
          
      </select>
      <ModalSelectAnswers onClose={handleOnClose} visible={showMyModal} handleValue={handleValue} obj={props.obj}/>
    </>
  )
}
