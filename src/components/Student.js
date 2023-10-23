import React from 'react'
import { useState } from 'react';
import ModalStudent from './ModalStudent';
import ModalEditStudent from './ModalEditStudent';

export default function Student(props) {

    const [modal, setModal] = useState(null);

    const CloseModal = () => setModal(null);

    function handleObj(e) {
        if (e !== null) {
            props.edit(e);
        }
    }

    return (
        <div className="bg-white max-w-5xl mx-auto py-1 px-6 rounded-lg shadow-xl my-1 ">
            <div className="flex items-center justify-between my-1 ">
                <a
                    onClick={()=>setModal(true)}
                    className="text-2xl text-gray-700 w-2/3  hover:underline cursor-pointer"
                >
                    {props.obj.fullName}
                </a>
                <span className={`text-sm rounded ${props.obj.estatus === "true" ? "text-green-500":"text-red-500"}`}>
                  {props.obj.estatus === "true" ? "● Activo": "● Inactivo"}
                </span>
            </div>
            {modal && <ModalEditStudent obj={props.obj} onClose={CloseModal} handleValue={handleObj} />}
        </div>
    )
}
