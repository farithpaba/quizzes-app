import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setQuestion, selectQuestion } from '../redux/newQuestionSlice';
import { v4 as uuidv4 } from 'uuid';
import {DndContext, closestCenter } from "@dnd-kit/core"
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import SortableItem from './SortableItem'

export default function ModalDragandDRop(props) {

    const dispatch = useDispatch();
    const question = useSelector(selectQuestion);

    const [numAnswers, setNumAnswers] = useState(5);
    const [preview, setPreview] = useState(false);
    const [validation, setValidation] = useState(false);
    const [validation3, setValidation3] = useState(false);

    const [elements, setElements] = useState(question.respuestas)


    /* if (!props.visible) return null; */
    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            props.onClose();
            setValidation(false);
            setValidation3(false);
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
        
        var obj = {
            id: uuidv4(),
            textoPrevio: question.textoPrevio,
            respuestas: question.respuestas,
            ordenCorrecto: elements,
            type: "drag&drop"
        }
        props.handleValue(obj);
        dispatch(setQuestion({
            pregunta: "",
            respuestas: [],
            respuestaCorrecta: "",
            textoPrevio:""
        }))
        setValidation(false);
        props.onClose();
    }

    function handleNumAnswers(operator) {
        if (operator === "+") {
            if (numAnswers < 10) {
                setNumAnswers(numAnswers + 1)
            }
        } else {
            if (numAnswers > 5) {
                setNumAnswers(numAnswers - 1)
            }
        }
    }

    const hasDuplicates = array => new Set(array).size < array.length;

    function createArrayQ() {
        var textoPrevio = document.getElementById('textoPrevio').value
        var array = [];

        for (let index = 0; index < numAnswers; index++) {
            var respuesta = document.getElementById(index).value
            array.push(respuesta);
        }
        if (textoPrevio.trim() === "") {
            setValidation(true)
            return null;
        }
        if (array.find(element => element.trim() === "") === "") {
            setValidation(true)
            return null;
        }
        if (hasDuplicates(array) === true) {
            setValidation3(true)
            return null;
        }
        dispatch(setQuestion({
            textoPrevio,
            respuestas: array,
            /* respuestaCorrecta: "" */
        }))
        setElements(array);
        setValidation(false);
        setValidation3(false);
        setPreview(true);
    }

    function handle(event) { 
        const {active, over} = event;
    
        if (active.id !== over.id) {
          setElements((items)=>{
            const activeIndex = items.indexOf(active.id)
            const overIndex = items.indexOf(over.id)
    
            return arrayMove(items, activeIndex, overIndex);
          })
        }
      }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handle}
        >
            <div
                id='container'
                onClick={handleOnClose}
                className='fixed z-50 inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center '
            >


                {preview === false &&
                    <div className='w-[90%] lg:w-[60%]  bg-white h-[90%] pb-5  rounded-md  border overflow-y-auto'>
                        <div className='bgColorCustom rounded-tl-md text-6xl '>
                            <br />
                        </div>
                        <h1 className='text-xl font-extralight px-3 mt-4'>Ingresa el texto que explica lo que debes hacer en el ejercicio.</h1>
                        <br />
                        <label className="flex w-full relative px-3 ">
                            <input
                                id='textoPrevio'
                                type="text"
                                defaultValue={question.textoPrevio}
                                className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                                required
                            />
                            <span
                                className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                            >
                                Texto previo<span className="text-red-500">*</span>
                            </span>
                        </label>
                        <br />
                        <h1 className='text-xl font-extralight px-3 mt-4'>Ingresa las oraciones que se deben ordenar.</h1>

                        <div className='flex gap-4 px-5 my-3 items-center'>
                            <p className='text-gray-500'>N° de oraciones:</p>
                            <div className='flex items-center'>

                                <p className='border w-8 h-7 text-center rounded-xl  text-gray-400 font-bold'>{numAnswers}</p>

                                <div className='text-2xl text-red-500'>
                                    <RiArrowDropUpLine onClick={() => handleNumAnswers("+")} className={`${numAnswers === 10 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                                    <RiArrowDropDownLine onClick={() => handleNumAnswers("-")} className={`${numAnswers === 5 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                                </div>
                            </div>
                        </div>

                        {
                            Array.from({ length: numAnswers }, (_, k) => (
                                <label key={k} className="flex w-full relative px-3 mt-4">
                                    <input
                                        id={k}
                                        type="text"
                                        className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                                        defaultValue={question.respuestas[k]}
                                        required
                                    />
                                    <span
                                        className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                                    >
                                        Oración {k + 1}<span className="text-red-500">*</span>
                                    </span>
                                </label>
                            ))
                        }


                        {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completa todos los campos para avanzar.</p> : <><br /><br /></>}
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



                {preview &&
                    <div className='w-[90%] lg:w-[60%]  bg-white h-[90%] pb-5  rounded-md  border overflow-y-auto'>
                        <div className='bgColorCustom rounded-tl-md text-6xl '>
                            <br />
                        </div>
                        <div className='px-5'>
                            <h1 className='text-3xl font-extralight '>Ahora selecciona el orden correcto.</h1>
                            <br />
                            <div className="flex flex-col gap-2 pb-3">
                                <a
                                    className="text-2xl  font-extralight "
                                >
                                    {question.textoPrevio}
                                </a>
                                <br />
                                <SortableContext
                                    items={elements}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {elements.map((obj) => 
                                        <SortableItem key={obj} id={obj} />
                                    )}
                                </SortableContext>


                            </div>
                        </div>
                        <br />
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
        </DndContext>
    )
}
