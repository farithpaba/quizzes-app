import React, { useState } from 'react'
import { RiDragMove2Fill, RiRecordCircleFill } from 'react-icons/ri'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ModalEditMultipleChoice from './ModalEditMultipleChoice';
import ModalEditListening from './ModalEditListening';
import ModalEditSpeaking from './ModalEditSpeaking';

export default function PreviewQuestionSpeaking(props) {

    const [recordBtn, setRecordBtn] = useState(false);

    



    return (
        <div  className="bg-white max-w-5xl mx-auto py-2 my-3">
            <div className="flex justify-between">
                <a
                    className="text-2xl font-extralight ml-6"
                >
                    {props.obj.pregunta}
                </a>
                
            </div>
            <br />
            <div className='mx-6'>
                <p className='text-center text-gray-500'>Pulsa el botón para grabar tu respuesta. </p>
                <br/>
                <p className='text-center text-gray-500'>Recuerda, tienes solo {props.obj.intentos} {props.obj.intentos === 1 ? "intento permitido" : "intentos permitidos"}  y el tiempo máximo por intento es de {props.obj.tiempoMax} min.</p>
                <br/>
                <button 
                    onClick={()=>setRecordBtn(!recordBtn)} 
                    className={recordBtn === false ? "flex gap-1 mx-auto text-2xl rounded-full p-2 bg-red-500 text-white font-extralight" : "flex gap-1 mx-auto text-2xl rounded-full p-2 border text-red-500 border-red-500"}
                >
                    {recordBtn === false ? "Grabar" : "Detener"}
                    <p>{recordBtn === false ? "●" : "■"}</p>
                </button>
                {recordBtn && <p className='text-sm text-gray-500 text-center animate-pulse'>grabando...</p>}
                
                <br/>
            </div>

        </div>
    )
}
