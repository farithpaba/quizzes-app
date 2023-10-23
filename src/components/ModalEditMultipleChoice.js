import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, selectQuestion } from '../redux/newQuestionSlice';
import {v4 as uuidv4} from 'uuid';

export default function ModalEditMultipleChoice(props) {

    const dispatch = useDispatch();
    const question = useSelector(selectQuestion);

    const [numAnswers, setNumAnswers] = useState(question.pregunta === "" ? props.obj.respuestas.length : question.respuestas.length)
    const [preview, setPreview] = useState(false)
    const [respuestaCorrecta, setRespuestaCorrecta] = useState("")
    const [validation, setValidation] = useState(false);
    const [validation2, setValidation2] = useState(false);
    const [validation3, setValidation3] = useState(false);


    /* if (!props.visible) return null; */
    const handleOnClose = (e) => {
        if (e.target.id === "container"){
            props.onClose(); 
            setValidation(false);
            setValidation2(false);
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
        if (respuestaCorrecta === "") {
            setValidation2(true);
            return null;
        }
        var obj = {
            id:props.obj.id,
            pregunta: question.pregunta,
            respuestas: question.respuestas,
            respuestaCorrecta: respuestaCorrecta,
            type:"multipleChoice"
        }
        props.handleValue(obj);
        dispatch(setQuestion({
            pregunta: "",
            respuestas: [],
            respuestaCorrecta: ""
        }))
        setValidation2(false);
        props.onClose();
    }

    function handleNumAnswers(operator) {
        if (operator === "+") {
            if (numAnswers < 5) {
                setNumAnswers(numAnswers + 1)
            }
        } else {
            if (numAnswers > 2) {
                setNumAnswers(numAnswers - 1)
            }
        }
    }

    const hasDuplicates = array =>
        new Set(array).size < array.length;

    function createArrayQ() {
        var pregunta = document.getElementById('pregunta').value
        var array = [];

        for (let index = 0; index < numAnswers; index++) {
            var respuesta = document.getElementById(index).value
            array.push(respuesta);
        }
        if (pregunta.trim() === "") {
            setValidation(true)
            return null;
        }
        if (array.find(element => element.trim() === "" ) === "") {
            setValidation(true)
            return null;
        }
        if (hasDuplicates(array) === true) {
            setValidation3(true)
            return null;
        }
        dispatch(setQuestion({
            pregunta,
            respuestas: array,
            respuestaCorrecta: ""
        }))
        setValidation(false);
        setValidation3(false);
        setPreview(true);
    }

    return (
        <div
            id='container'
            onClick={handleOnClose}
            className='fixed z-50 inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center '
        >
            {preview === false &&
                <div className='w-[90%] lg:w-[60%]  bg-white h-auto pb-5  rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>
                    <label className="flex w-full relative px-3 mt-4">
                        <input
                            id='pregunta'
                            type="text"
                            defaultValue={question.pregunta === "" ? props.obj.pregunta : question.pregunta}
                            className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                            required
                        />
                        <span
                            className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                        >
                            Pregunta<span className="text-red-500">*</span>
                        </span>
                    </label>

                    <div className='flex gap-4 px-5 my-3 items-center'>
                        <p className='text-gray-500'>N° de respuestas:</p>
                        <div className='flex items-center'>

                            <p className='border w-8 h-7 text-center rounded-xl  text-gray-400 font-bold'>{numAnswers}</p>

                            <div className='text-2xl text-red-500'>
                                <RiArrowDropUpLine onClick={() => handleNumAnswers("+")} className={`${numAnswers === 5 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                                <RiArrowDropDownLine onClick={() => handleNumAnswers("-")} className={`${numAnswers === 2 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                            </div>
                        </div>
                    </div>

                    {
                        Array.from({ length: numAnswers }, (_, k) => (
                            <label className="flex w-full relative px-3 mt-4" key={k}>
                                <input
                                    id={k}
                                    type="text"
                                    className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                                    defaultValue={question.pregunta === "" ? props.obj.respuestas[k] : question.respuestas[k]}
                                    required
                                />
                                <span
                                    className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                                >
                                    Respuesta {k + 1}<span className="text-red-500">*</span>
                                </span>
                            </label>
                        ))
                    }
                    
                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completa todos los campos para avanzar.</p>:<br/>}
                    {validation3 === true && <p className='text-center text-red-500 my-3'>No pueden haber respuestas repetidas.</p>}
                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={handleOnCloseBtn} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Cancelar
                        </a>
                        <a onClick={createArrayQ} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Siguiente
                        </a>
                    </div>
                </div>
            }


            {preview === true &&
                <div className='w-[90%] lg:w-[60%]  bg-white h-auto pb-5  rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>
                    <div className='px-5'>
                        <h1 className='text-3xl font-extralight '>Ahora selecciona la respuesta correcta</h1>
                        <br />
                        <div className="flex flex-col gap-2 pb-3">
                            <a
                                className="text-2xl  font-extralight "
                            >
                                {question.pregunta}
                            </a>
                            {question.respuestas.map((obj) =>
                                <button key={obj} onClick={() => setRespuestaCorrecta(obj)} className="border boderColorCustom focus:bgColorCustom focus:text-white textColorCustom py-2 px-4 hover:bgColorCustom hover:text-white rounded-xl transition-colors text-center  w-1/2 mx-auto">
                                    {obj}
                                </button>
                            )}

                        </div>
                    </div>

                    {validation2 === true ? <p className='text-center text-red-500 my-3'>Por favor, selecciona una respuesta para avanzar.</p>:<br/>}

                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={() => { setPreview(false) }} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Atrás
                        </a>
                        <a onClick={saveValue} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Guardar
                        </a>
                    </div>
                </div>
            }
        </div>
    )
}
