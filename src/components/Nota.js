import React from 'react'
import { useState } from 'react';
import ModalStudent from './ModalStudent';
import ModalEditStudent from './ModalEditStudent';

export default function Nota(props) {

    const [modal, setModal] = useState(null);

    const CloseModal = () => setModal(null);

    function handleObj(e) {
        if (e !== null) {
            props.edit(e);
        }
    }

    return (
        <div className="bg-white max-w-5xl mx-auto py-1 px-6 rounded-lg shadow-xl my-2 pb-3">
            <div className="flex items-center justify-between my-1 ">
                <a
                    className="text-2xl text-gray-700 w-2/3"
                >
                    {props.obj.fullName}
                </a>
                <div className='flex flex-col items-center'>
                    <p className='text-gray-500'>Nota Final:</p>
                    <span className="bgColorCustom text-white py-2 px-4 text-xs rounded uppercase">
                        {props.obj.notaFinal}
                    </span>
                </div>
            </div>

            <div >
                {props.obj.intentos.length > 0 &&
                    <div className="flex justify-between   py-1 ">
                        <p className="font-bold w-13">Intento</p>
                        <p className="font-bold w-13">&nbsp;&nbsp;Fecha&nbsp;&nbsp;</p>
                        <p className="font-bold w-10">Nota</p>
                        <p className="font-bold w-13">Revisión</p>
                    </div>
                }

                {props.obj.intentos.map((obj) =>
                    <div className="flex justify-between  py-1">
                        <p className="font-extralight w-13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{obj.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        <p className="font-extralight w-13">{obj.fecha}</p>
                        <p className="font-extralight w-10">{obj.nota}</p>
                        <p className="font-extralight w-13 ">
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <a className="hover:underline hover:cursor-pointer hover:textColorCustom">Ver</a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        </p>
                    </div>
                )}



            </div>
            {modal && <ModalEditStudent obj={props.obj} onClose={CloseModal} handleValue={handleObj} />}
        </div>
    )
}
