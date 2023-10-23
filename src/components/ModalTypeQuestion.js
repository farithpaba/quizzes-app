import React, { useState } from 'react'
import multipleChoice from '../assets/multipleChoice.svg'
import complete from '../assets/complete.svg'
import dragAndDrop from '../assets/dragAndDrop.svg'
import listening from '../assets/listening.svg'
import select from '../assets/select.svg'
import speaking from '../assets/speaking.svg'

export default function ModalTypeQuestion(props) {


    if (!props.visible) return null;
    const handleOnClose = (e) => {
        if (e.target.id === "container") props.onClose();
    }
    function saveType(type) {
        props.handleValue(type);
        props.onClose();
    }

    return (
        <div
            id='container'
            onClick={handleOnClose}
            className='fixed z-50 inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center '
        >
            <div className='h-4/5 overflow-y-auto  md:h-auto bg-white  pb-7 rounded-3xl border '>
                <div className='bgColorCustom rounded-t-3xl text-6xl '>
                    <br />
                </div>

                <br/>
                
                <div className='px-5 '>
                    <h1 className='text-3xl font-extralight '>Selecciona el tipo de pregunta:</h1>
                    <div className=' grid md:grid-cols-3 gap-4 '>
                        <div onClick={()=>saveType("multipleChoice")}  className='w-full bg-white border shadow-xl flex flex-col p-8 my-4 rounded-lg items-center hover:cursor-pointer hover:scale-105 duration-100'>
                            <img className='h-[100px]' src={multipleChoice} />
                            <p className=' text-center text-2xl font-extralight '>Opción multiple</p>
                        </div>
                        <div onClick={()=>saveType("listening")}  className='w-full bg-white border shadow-xl flex flex-col p-8 my-4 rounded-lg items-center hover:cursor-pointer hover:scale-105 duration-100'>
                            <img className='h-[100px]' src={listening} />
                            <p className=' text-center text-2xl font-extralight '>Listening</p>
                        </div>
                        <div onClick={()=>saveType("speaking")}  className='w-full bg-white border shadow-xl flex flex-col p-8 my-4 rounded-lg items-center hover:cursor-pointer hover:scale-105 duration-100'>
                            <img className='h-[100px]' src={speaking} />
                            <p className=' text-center text-2xl font-extralight '>Speaking</p>
                        </div>
                        <div onClick={()=>saveType("complete")}  className='w-full bg-white border shadow-xl flex flex-col p-8 my-4 rounded-lg items-center hover:cursor-pointer hover:scale-105 duration-100'>
                            <img className='h-[100px]' src={complete} />
                            <p className=' text-center text-2xl font-extralight '>Completar</p>
                        </div>
                        <div onClick={()=>saveType("drag&drop")}  className='w-full bg-white border shadow-xl flex flex-col p-8 my-4 rounded-lg items-center hover:cursor-pointer hover:scale-105 duration-100'>
                            <img className='h-[100px]' src={dragAndDrop} />
                            <p className=' text-center text-2xl font-extralight '>Arrastrar y Soltar</p>
                        </div>
                        {/* <div  className='w-full bg-white border shadow-xl flex flex-col p-8 my-4 rounded-lg items-center hover:cursor-pointer hover:scale-105 duration-100'>
                            <img className='h-[100px]' src={select} />
                            <p className=' text-center text-2xl font-extralight '>Seleccionar</p>
                        </div> */}
                    </div>
                </div>
                



            </div>
        </div>
    )
}
