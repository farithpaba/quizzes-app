import React, { useState } from 'react'
import { RiDragMove2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ModalCreateEdit from './ModalCreateEdit';

export default function Section(props) {

    let navigate = useNavigate();
    const [options, setOptions] = useState(false);

    const [modalEdit, setModalEdit] = useState(null);

    const CloseModalEdit = () => setModalEdit(null);

    function handleObj(e) {
        if (e !== null) {
            props.edit(e);
        }
    }

    const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <div 
            ref={setNodeRef} style={style} 
            className="hover:bg-slate-700  touch-none flex justify-between bgColorCustom  max-w-5xl mx-auto py-2  rounded-lg shadow-xl my-3"
        >
            <div  className="flex flex-col ml-3 ">
                <a
                    className="text-2xl text-white font-extralight hover:cursor-pointer hover:underline"
                    onClick={() => { navigate('/sectionEdit') }}
                >
                    {props.obj.nombre}
                </a>
            </div>
            <div className="flex text-xl text-white items-center">
                <RiDragMove2Fill {...attributes} {...listeners} className="hover:scale-95 duration-100 cursor-pointer focus:outline-none hover:text-gray-500" />
                <div className="relative inline-block text-left ">
                    <div>
                        <button onClick={() => setOptions(!options)} type="button" className="hover:scale-95 duration-75 cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3  text-sm font-semibold text-gray-900  ring-white " id="menu-button" aria-expanded="true" aria-haspopup="true">
                            <svg className="-mr-1 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"  />
                            </svg>
                        </button>
                    </div>
                    {options === true &&
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                            <div className="" role="none">
                                <a onClick={() => { setModalEdit(true); setOptions(false); }} className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:text-gray-400" >Editar</a>
                                <a onClick={() => { props.delete(props.obj.id); setOptions(false); }} className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-b-md " >Eliminar</a>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {modalEdit && <ModalCreateEdit obj={props.obj} onClose={CloseModalEdit} visible={modalEdit} handleValue={handleObj} type={"seccion"} />}
        </div>
    )
}