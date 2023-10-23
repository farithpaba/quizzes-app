import React, { useState } from 'react'
import { RiDragMove2Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';
import ModalCreateEdit from './ModalCreateEdit';

export default function Exam(props) {

    let navigate = useNavigate();
    const [options, setOptions] = useState(false);

    const [modalEdit, setModalEdit] = useState(null);

    const CloseModalEdit = () => setModalEdit(null);

    function handleObj(e) {
        if (e !== null) {
            props.edit(e);
        }
    }


    return (
        <div
            
            className="bg-white hover:bg-slate-50  max-w-5xl mx-auto py-1  px-6 rounded-lg shadow-xl my-3"
        >
            <div className="flex flex-row  mb-4 justify-between">
                <a 
                    onClick={() => navigate('/quizEdit')}
                    className="text-2xl  text-gray-700 font-bold hover:cursor-pointer hover:underline"
                >
                    {props.obj.nombre}
                </a>
                <div className="flex text-xl text-gray-400 gap-2">
                    <div className="relative inline-block text-left">
                        <div>
                            <button onClick={() => setOptions(!options)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3  text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                </svg>
                            </button>
                        </div>
                        {options === true &&
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                                <div className="" role="none">
                                    <a onClick={() => { setModalEdit(true); setOptions(false); }} className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:text-gray-400" >Opciones</a>
                                    <a onClick={() => { props.delete(props.obj.id); setOptions(false); }} className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-b-md " >Eliminar</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-gray-500  text-sm">{"Fecha de inicio: " + props.obj.fechaInicio}</p>
                    <p className="text-gray-500  text-sm">{"Fecha de cierre: " + props.obj.fechaCierre}</p>
                </div>

                <span className="bgColorCustom text-white py-2 px-4 text-xs rounded uppercase">
                    {props.obj.nivel}
                </span>
            </div>
            {modalEdit && <ModalCreateEdit obj={props.obj} onClose={CloseModalEdit} visible={modalEdit} handleValue={handleObj} type={"examen"} />}
        </div>
    )
}
