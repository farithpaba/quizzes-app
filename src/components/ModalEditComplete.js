import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, selectQuestion } from '../redux/newQuestionSlice';
import { v4 as uuidv4 } from 'uuid';
import SelectAnswers from './SelectAnswers';
import SelectAnswersPreview from './SelectAnswersPreview';

export default function ModalComplete(props) {

    const dispatch = useDispatch();
    const question = useSelector(selectQuestion);

    const [numAnswers, setNumAnswers] = useState(2)
    const [formView, setFormView] = useState(true)
    const [optionsView, setOptionsView] = useState(false)
    const [preview, setPreview] = useState(false)
    const [respuestaCorrecta, setRespuestaCorrecta] = useState("")
    const [validation, setValidation] = useState(false);
    const [validation2, setValidation2] = useState(false);
    const [validation3, setValidation3] = useState(false);


    /* if (!props.visible) return null; */
    const handleOnClose = (e) => {
        if (e.target.id === "container") {
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
    


    function createQuestion() {
        var textoPrevio = document.getElementById('textoPrevio').value
        var textoCompletar = document.getElementById('textoCompletar').value

        if (textoPrevio.trim() === "" || textoCompletar.trim() === "") {
            setValidation(true)
            return null;
        }
        var array = textoCompletar.split(' ');
        array = array.map((elemento) => {
            if (elemento === "@") {
                return { opcion1: "", opcion2: "", opcion3: "" }
            } else {
                return elemento
            }
        })
        /* console.log(array); */

        dispatch(setQuestion({
            textoPrevio,
            textoCompletar,
            array
        }))
        setValidation(false);
        setFormView(false);
        setOptionsView(true);
    }
    function handleSelectValues(e, indice) {
        if (e !== null && indice !== null) {

            var newArray = question.array.map((cosa) => {
                if (question.array.indexOf(cosa) === indice) {
                    return e;
                } else {
                    return cosa;
                }
            })
            dispatch(setQuestion({
                textoPrevio: question.textoPrevio,
                textoCompletar: question.textoCompletar,
                array: newArray
            }))
            /* console.log(question.array); */
        }
    }

    function rightAnswers() {
        var arrayPreguntas = [];
        var arrayPreguntasVacias = [];

        question.array.map((cosa)=>{
            if (typeof cosa === "object") {
                arrayPreguntas.push(cosa);
            }
        });

        arrayPreguntas.map((cosa)=>{
            if (cosa.opcion1.trim() === "") {
                arrayPreguntasVacias.push(cosa);
            }
        });

        if (arrayPreguntasVacias.length !== 0 ) {
            setValidation(true);
            return null;
        }


        setOptionsView(false);
        setPreview(true);
        setValidation(false);

    }

    function saveValue() {
        var arrayPreguntas = [];
        var arrayPreguntasSinRespuesta = [];

        question.array.map((cosa)=>{
            if (typeof cosa === "object") {
                arrayPreguntas.push(cosa);
            }
        });

        arrayPreguntas.map((cosa)=>{
            if (cosa.respuestaCorrecta === undefined || cosa.respuestaCorrecta === "") {
                arrayPreguntasSinRespuesta.push(cosa);
            }
        });

        if (arrayPreguntasSinRespuesta.length !== 0 ) {
            setValidation(true);
            return null;
        }

        /* console.log(question); */

        var obj = {
            id: props.obj.id,
            array:question.array,
            textoPrevio:question.textoPrevio,
            type: "complete",
            textoCompletar:question.textoCompletar
        }

        props.handleValue(obj);

        dispatch(setQuestion({
            pregunta: "",
            respuestas: [],
            respuestaCorrecta: ""
        }))

        setValidation(false);
        props.onClose();
    }

    return (
        <div
            id='container'
            onClick={handleOnClose}
            className='fixed z-50 inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center '
        >
            {formView &&
                <div className='w-[90%] lg:w-[60%]  bg-white h-auto pb-5  rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>
                    <h1 className='text-xl font-extralight px-3 mt-4'>Ingresa el texto que explica lo que debes hacer en el ejercicio.</h1>
                    <br />
                    <label className="flex w-full relative px-3 ">
                        <input
                            id='textoPrevio'
                            type="text"
                            defaultValue={question.pregunta === "" ? props.obj.textoPrevio : question.textoPrevio}
                            className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                            required
                        />
                        <span
                            className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                        >
                            Texto previo<span className="text-red-500">*</span>
                        </span>
                    </label>

                    <h1 className='text-xl font-extralight px-3 mt-4'>Ingresa el texto que se debe completar, con un @ en los espacios donde deseas insertar una pregunta. (Para insertar un salto de línea escribe @@) Por ejemplo:</h1>
                    <br />
                    <div className='flex justify-center'>
                        <h1 className='text-xs font-extralight px-1 '>Este es @ ejemplo = </h1>
                        <div className='text-xs font-extralight  '>
                            Este es
                            <select defaultValue={""} className='border outline-none rounded-lg mx-1'>
                                <option disabled></option>
                                <option value="Person A">un</option>
                                <option value="Person B">una</option>
                                <option value="Person C">unos</option>
                            </select>
                            ejemplo.
                        </div>
                    </div>
                    <br />
                    <div className='flex justify-center items-center'>
                        <h1 className='text-xs font-extralight px-1 '>Este también. @@ Es otro ejemplo. = </h1>
                        <div className='text-xs font-extralight  '>
                            <p>Este también.</p>
                            <p>Es otro ejemplo.</p>
                        </div>
                    </div>

                    <br />
                    <label className="flex w-full relative px-3 ">
                        <textarea
                            id='textoCompletar'
                            type="text"
                            defaultValue={question.pregunta === "" ? props.obj.textoCompletar : question.textoCompletar}
                            className="bg-transparent ring-1 ring-gray-300 w-full h-20 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                            required
                        />

                    </label>



                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completa todos los campos para avanzar.</p> : <br />}
                    {validation3 === true && <p className='text-center text-red-500 my-3'>No pueden haber respuestas repetidas.</p>}
                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={handleOnCloseBtn} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Cancelar
                        </a>
                        <a onClick={createQuestion} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Siguiente
                        </a>
                    </div>
                </div>
            }


            {optionsView &&
                <div className='w-[90%] lg:w-[60%]  bg-white h-auto pb-5  rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>
                    <div className='px-5'>
                        <h1 className='text-xl font-extralight px-3 mt-4'>Selecciona las casillas para insertar las opciones de respuesta. </h1>
                        <br />
                        <p className='text-justify'>
                            {question.array.map((palabra) => {
                                if (palabra === "@@")
                                    return <br />
                                if (typeof palabra === "object")
                                    return <SelectAnswers key={question.array.indexOf(palabra)} indice={question.array.indexOf(palabra)} obj={palabra} handleSelectValues={handleSelectValues} />
                                else {
                                    return " " + palabra + " "
                                }
                            })}
                        </p>


                    </div>

                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completa todos los campos para avanzar.</p> : <br />}

                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={() => { setOptionsView(false); setFormView(true); }} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Atrás
                        </a>
                        <a onClick={() => rightAnswers()} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Siguiente
                        </a>
                    </div>
                </div>
            }

            {preview &&
                <div className='w-[90%] lg:w-[60%]  bg-white h-auto pb-5  rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>
                    <div className='px-5'>
                        <h1 className='text-xl font-extralight px-3 mt-4'>Ahora selecciona las respuestas correctas. </h1>
                        <br />
                        <p className='text-justify'>
                            {question.array.map((palabra) => {
                                if (palabra === "@@")
                                    return <br />
                                if (typeof palabra === "object")
                                    return <SelectAnswersPreview key={question.array.indexOf(palabra)} indice={question.array.indexOf(palabra)} obj={palabra} handleSelectValues={handleSelectValues} />
                                else {
                                    return " " + palabra + " "
                                }
                            })}
                        </p>


                    </div>

                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completa todos los campos para avanzar.</p> : <br />}

                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={() => { setPreview(false); setOptionsView(true); }} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Atrás
                        </a>
                        <a onClick={() => saveValue()} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Guardar
                        </a>
                    </div>
                </div>
            }
        </div>
    )
}
