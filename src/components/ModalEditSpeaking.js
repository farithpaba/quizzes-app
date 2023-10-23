import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, selectQuestion } from '../redux/newQuestionSlice';
import { v4 as uuidv4 } from 'uuid';

export default function ModalEditSpeaking(props) {

    const dispatch = useDispatch();
    const question = useSelector(selectQuestion);

    const [validation, setValidation] = useState(false);
    const [numIntentos, setNumIntentos] = useState(props.obj.intentos);
    const [numMin, setNumMin] = useState(props.obj.tiempoMax);

    /* if (!props.visible) return null; */
    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            props.onClose();
            setValidation(false);
        }
    }

    const handleOnCloseBtn = (e) => {
        dispatch(setQuestion({
            pregunta: "",
            respuestas: [],
            respuestaCorrecta: ""
        }))
        props.onClose();
    }
    function saveValue() {
        var pregunta = document.getElementById("pregunta").value;

        if (pregunta.trim() === "") {
            setValidation(true);
            return null;
        }
        var obj = {
            id: props.obj.id,
            pregunta: pregunta,
            type: "speaking",
            intentos: numIntentos,
            tiempoMax:numMin
        }
        
        props.handleValue(obj);
        dispatch(setQuestion({
            pregunta: "",
            respuestas: [],
            respuestaCorrecta: ""
        }))
        props.onClose();
    }

    function handleMin(operator) {
        if (operator === "+") {
            if (numMin < 3) {
                setNumMin(numMin + 1)
            }
        } else {
            if (numMin > 1) {
                setNumMin(numMin - 1)
            }
        }
    }
  

    function handleNumIntentos(operator) {
        if (operator === "+") {
            if (numIntentos < 5) {
                setNumIntentos(numIntentos + 1)
            }
        } else {
            if (numIntentos > 1) {
                setNumIntentos(numIntentos - 1)
            }
        }
    }

    return (
        <div
            id='container'
            onClick={handleOnClose}
            className='fixed z-50 inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center '
        >
            <div className='w-[90%] lg:w-[60%]  bg-white h-auto pb-5  rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>
                    <label className="flex w-full relative px-3 mt-4">
                        <input
                            id='pregunta'
                            type="text"
                            defaultValue={props.obj.pregunta}
                            className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                            required
                        />
                        <span
                            className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                        >
                            Pregunta<span className="text-red-500">*</span>
                        </span>
                    </label>
                    <br/>
                    
                    <div className='flex gap-4 px-5  items-center'>
                        <p className='text-gray-500 w-44'>Intentos permitidos para grabar:</p>
                        <div className='flex items-center'>

                            <p className='border w-8 h-7 text-center rounded-xl  text-gray-400 font-bold'>{numIntentos}</p>

                            <div className='text-2xl text-red-500'>
                                <RiArrowDropUpLine onClick={() => handleNumIntentos("+")} className={`${numIntentos === 5 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                                <RiArrowDropDownLine onClick={() => handleNumIntentos("-")} className={`${numIntentos === 1 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                            </div>
                        </div>
                    </div>
                    <br/>
                    
                    <div className='flex gap-4 px-5  items-center'>
                        <p className='text-gray-500 w-44'>Tiempo máximo de grabación (minutos):</p>
                        <div className='flex items-center'>

                            <p className='border w-8 h-7 text-center rounded-xl  text-gray-400 font-bold'>{numMin}</p>

                            <div className='text-2xl text-red-500'>
                                <RiArrowDropUpLine onClick={() => handleMin("+")} className={`${numMin === 3 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                                <RiArrowDropDownLine onClick={() => handleMin("-")} className={`${numMin === 1 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                            </div>
                        </div>
                    </div>

                   
                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completa todos los campos para avanzar.</p> : <br />}
                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={handleOnCloseBtn} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Cancelar
                        </a>
                        <a onClick={saveValue} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Guardar
                        </a>
                    </div>
                </div>


            
        </div>
    )
}
