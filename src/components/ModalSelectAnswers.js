import React, { useState } from 'react'
import multipleChoice from '../assets/multipleChoice.svg'
import complete from '../assets/complete.svg'
import dragAndDrop from '../assets/dragAndDrop.svg'
import listening from '../assets/listening.svg'
import select from '../assets/select.svg'
import speaking from '../assets/speaking.svg'

export default function ModalSelectAnswers(props) {

    const [validation, setValidation] = useState(false);
    const [validation2, setValidation2] = useState(false);

    if (!props.visible) return null;

    function saveValues() {
        var opcion1 = document.getElementById("opcion1").value;
        var opcion2 = document.getElementById("opcion2").value;
        var opcion3 = document.getElementById("opcion3").value;

        if (opcion1.trim() === "" || opcion2.trim() === "" || opcion3.trim() === "") {
            setValidation(true)
            return null;
        }
        if (opcion1.trim() === opcion2.trim() || opcion2.trim() === opcion3.trim()|| opcion3.trim() === opcion1.trim()) {
            setValidation2(true)
            return null;
        }
        var obj = {opcion1:opcion1, opcion2:opcion2, opcion3:opcion3,}

        props.handleValue(obj);
        props.onClose();
        setValidation(false);
        setValidation2(false);
    }

    return (
        <div
            className='fixed z-50 inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center '
        >
            <div className='h-auto overflow-y-auto  md:h-auto bg-white  pb-7 rounded-3xl border '>
                <div className='bgColorCustom rounded-t-3xl text-6xl '>
                    <br />
                </div>

                <div className='px-5'>
                    <h1 className='text-xl font-extralight px-3 mt-4'>Ahora en cada casilla inserta la opción de respuesta. </h1>
                    <br />
                    <div className='flex flex-col  '>
                        <input id='opcion1' defaultValue={props.obj.opcion1} type='text' className='border my-2 rounded-lg w-52 mx-auto outline-none focus:boderColorCustom'/>
                        <input id='opcion2' defaultValue={props.obj.opcion2} type='text' className='border my-2 rounded-lg w-52 mx-auto outline-none focus:boderColorCustom'/>
                        <input id='opcion3' defaultValue={props.obj.opcion3} type='text' className='border my-2 rounded-lg w-52 mx-auto outline-none focus:boderColorCustom'/>
                    </div>

                </div>
                {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, escribe las respuestas para avanzar.</p> : <br />}
                {validation2 === true && <p className='text-center text-red-500 my-3'>Las respuestas no pueden ser iguales.</p>}

                <div className='flex flex-row justify-center gap-3'>
                    <a onClick={() => {props.onClose(); setValidation(false); setValidation2(false);}} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                        Atrás
                    </a>
                    <a onClick={saveValues} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                        Guardar
                    </a>
                </div>

            </div>
        </div>
    )
}
