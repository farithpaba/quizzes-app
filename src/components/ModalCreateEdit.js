import React, { useState } from 'react'
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCloseFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

export default function ModalCreateEdit(props) {

    const [validation, setValidation] = useState(false);
    const [validation2, setValidation2] = useState(false);
    const [btnCronometro, setBtnCronometro] = useState(() => {
        if (props.obj.duracion === "N/A") {
            return false
        } else {
            return true
        }
    })
    const [numIntentos, setNumIntentos] = useState(props.obj.intentos);
    const [btnFechaLimite, setBtnFechaLimite] = useState(() => {
        if (props.obj.fechaInicio === "N/A") {
            return false
        } else {
            return true
        }
    })

    if (!props.visible) return null;
    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            props.onClose();
            setValidation(false);
        }
    }
    const handleOnCloseBtn = (e) => {
        props.onClose();
        setValidation(false);
    }
    function saveValue() {
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var fechaHoy = day + "/" + month + "/" + year;

        if (props.type === "examen") {
            var nombreExamen = document.getElementById("nombreExamen").value;
            let duracion;
            let nivel = document.getElementById("nivel").value;
            let fechaInicio;
            let fechaCierre;
            var fechasLimite = document.getElementById("fechasLimite");
            var cronometro = document.getElementById("cronometro");
            var calificable = document.getElementById("calificable").checked;
            var revision = document.getElementById("revision").checked;

            if (nombreExamen.trim() === "" ||  nivel.trim() === "") {
                setValidation(true);
                return null;
            }


            if (fechasLimite.checked === false) {
                fechaInicio = "N/A"
                fechaCierre = "N/A"
            } else {
                if (document.getElementById("fechaInicio").value === "" || document.getElementById("fechaCierre").value === "") {
                    setValidation(true);
                    return null;
                } else {
                    fechaInicio = document.getElementById("fechaInicio").value;
                    fechaCierre = document.getElementById("fechaCierre").value;
                    if (fechaInicio >= fechaCierre) {
                        setValidation2(true);
                        return null;
                    }
                }

            }

            if (cronometro.checked === false) {
                duracion = "N/A"
                cronometro = false;
            } else {
                if (document.getElementById("duracion").value === "") {
                    setValidation(true);
                    return null;
                } else {
                    cronometro = true;
                    duracion = document.getElementById("duracion").value;
                }
            }

            var obj = {
                id: props.obj.id,
                nombre: nombreExamen,
                duracion: duracion,
                fechaInicio: fechaInicio,
                fechaCierre: fechaCierre,
                nivel: nivel,
                cronometro: cronometro,
                calificable: calificable,
                intentos:numIntentos,
                revision: revision
            }
            props.handleValue(obj);
            props.onClose();
        }
        if (props.type === "seccion") {
            var nombreSeccion = document.getElementById("nombreSeccion").value;
            if (nombreSeccion.trim() === "") {
                setValidation(true);
                return null;
            }
            var obj = {
                id: props.obj.id,
                nombre: nombreSeccion
            }
            props.handleValue(obj);
            props.onClose();
        }
        if (props.type === "modulo") {
            var nombreModulo = document.getElementById("nombreModulo").value;
            let nivel = document.getElementById("nivel").value;
            if (nombreModulo.trim() === "" || nivel.trim() === "") {
                setValidation(true);
                return null;
            }
            var obj = {
                id: props.obj.id,
                nombre: nombreModulo,
                fecha: props.obj.fecha,
                nivel: nivel,
            }
            props.handleValue(obj);
            props.onClose();
        }
        setValidation(false);
        setValidation2(false);
        setBtnFechaLimite(false)
        setBtnCronometro(false)
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
            {props.type === "examen" &&
                <div className='w-[90%] lg:w-[60%] bg-white h-auto pb-5 rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>

                    <div className='px-3 '>
                        {/* Nombre del examen */}
                        <label className="flex w-full relative  mt-4">
                            <input
                                id='nombreExamen'
                                type="text"
                                className="text-black bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                                required
                                defaultValue={props.obj.nombre}
                            />
                            <span
                                className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                            >
                                Nombre del exámen<span className="text-red-500">*</span>
                            </span>
                        </label>
                        {/* Nivel */}
                        <div className='flex items-center gap-2 ml-2'>
                            <p className='text-gray-500'>Nivel:</p>
                            <select
                                id="nivel"
                                className='text-gray-500 my-2 rounded-full px-2 py-1 focus:outline-none focus:boderColorCustom border border-solid'
                                defaultValue={props.obj.nivel}
                            >
                                <option disabled></option>
                                <option value="A1">A1</option>
                                <option value="A2">A2</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="B2+">B2+</option>
                                <option value="C1">C1</option>
                                <option value="C2">C2</option>
                            </select>
                        </div>
                        {/* Cronómetro */}
                        <div className='flex items-center gap-2 ml-2 my-2'>
                            <p className='text-gray-500'>Cronómetro:</p>
                            <input onClick={() => setBtnCronometro(!btnCronometro)} defaultChecked={props.obj.cronometro} id='cronometro' type='checkbox' />
                        </div>
                        {btnCronometro &&
                            <div className='flex items-center gap-2 ml-2'>
                                <p className='text-gray-500'>Duración:</p>
                                <select
                                    id="duracion"
                                    className='text-gray-500 my-2 rounded-full px-2 py-1 focus:outline-none focus:border-purple-600 border border-solid'
                                    defaultValue={props.obj.duracion}
                                >
                                    <option disabled></option>
                                    <option value="5">5 min</option>
                                    <option value="10">10 min</option>
                                    <option value="20">20 min</option>
                                    <option value="30">30 min</option>
                                    <option value="45">45 min</option>
                                    <option value="60">1 h</option>
                                    <option value="90">1 h 30 min</option>
                                    <option value="120">2 h</option>
                                </select>
                            </div>
                        }

                        {/* Fechas limite */}
                        <div className='flex items-center gap-2 ml-2 my-2'>
                            <p className='text-gray-500'>Fechas limite:</p>

                            {btnFechaLimite === true ?
                                <input
                                    onClick={() => setBtnFechaLimite(!btnFechaLimite)}
                                    id='fechasLimite'
                                    type='checkbox'
                                    checked={true}
                                /> :
                                <input
                                    onClick={() => setBtnFechaLimite(!btnFechaLimite)}
                                    id='fechasLimite'
                                    type='checkbox'
                                    checked={false}
                                />
                            }
                        </div>

                        {btnFechaLimite &&
                            <>
                                <div className='flex items-center gap-2 ml-2 my-2'>
                                    <p className='text-gray-500'>Fecha de Inicio:</p>
                                    <input
                                        defaultValue={props.obj.fechaInicio}
                                        id='fechaInicio'
                                        className='border outline-none focus:boderColorCustom px-2 py-1 rounded-full text-gray-500'
                                        type='date'
                                    />
                                </div>

                                <div className='flex items-center gap-2 ml-2 my-2'>
                                    <p className='text-gray-500'>Fecha de Cierre:</p>
                                    <input
                                        defaultValue={props.obj.fechaCierre}
                                        id='fechaCierre'
                                        className='border outline-none focus:boderColorCustom px-2 py-1 rounded-full text-gray-500'
                                        type='date'
                                    />
                                </div>
                            </>
                        }
                        {/* Calificable */}
                        <div className='flex items-center gap-2 ml-2 my-2'>
                            <p className='text-gray-500'>Calificable:</p>
                            <input defaultChecked={props.obj.calificable} id='calificable' type='checkbox' />
                        </div>
                        {/* Intentos permitidos */}
                        <div className='flex gap-4 px-2  items-center'>
                            <p className='text-gray-500'>Intentos permitidos:</p>
                            <div className='flex items-center'>

                                <p className='border w-8 h-7 text-center rounded-xl  text-gray-400 font-bold'>{numIntentos}</p>

                                <div className='text-2xl text-red-500'>
                                    <RiArrowDropUpLine onClick={() => handleNumIntentos("+")} className={`${numIntentos === 5 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                                    <RiArrowDropDownLine onClick={() => handleNumIntentos("-")} className={`${numIntentos === 1 ? "text-gray-400" : "hover:cursor-pointer hover:scale-125 duration-100"}  `} />
                                </div>
                            </div>
                        </div>
                        {/* Revision */}
                        <div className='flex items-center gap-2 ml-2 my-2'>
                            <p className='text-gray-500'>Permitir revisión:</p>
                            <input id='revision' type='checkbox' />
                        </div>
                    </div>
                    {validation2 === true && <p className='text-center text-red-500 my-3'>La fecha de inicio no puede ser mayor o igual que la fecha de cierre.</p>}
                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completar todos los campos para avanzar.</p> : <br />}
                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={handleOnCloseBtn} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Cancelar
                        </a>
                        <a onClick={saveValue} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Guardar
                        </a>
                    </div>
                </div>
            }

            {props.type === "seccion" &&
                <div className='w-[90%] lg:w-[60%] bg-white h-auto pb-5 rounded-3xl  border'>
                    <div className='bg-purple-600 rounded-t-3xl text-6xl '>
                        <br />
                    </div>

                    <div className='px-3 '>
                        <label className="flex w-full relative  mt-4">
                            <input
                                id='nombreSeccion'
                                type="text"
                                className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                                required
                                defaultValue={props.obj.nombre}
                            />
                            <span
                                className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                            >
                                Nombre de la sección<span className="text-red-500">*</span>
                            </span>
                        </label>
                    </div>

                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completar todos los campos para avanzar.</p> : <br />}

                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={handleOnCloseBtn} className="flex bg-purple-600 text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Cancelar
                        </a>
                        <a onClick={saveValue} className="flex bg-purple-600 text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Guardar
                        </a>
                    </div>
                </div>
            }

            {props.type === "modulo" &&
                <div className='w-[90%] lg:w-[60%] bg-white h-auto pb-5 rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>

                    <div className='px-3 '>
                        <label className="flex w-full relative  mt-4">
                            <input
                                id='nombreModulo'
                                type="text"
                                className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                                required
                                defaultValue={props.obj.nombre}
                            />
                            <span
                                className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                            >
                                Nombre del modulo<span className="text-red-500">*</span>
                            </span>
                        </label>
                        <div className='flex items-center gap-2 ml-2'>
                            <p className='text-gray-500'>Nivel:</p>
                            <select
                                id="nivel"
                                className='text-gray-500 my-2 rounded-full px-2 py-1 focus:outline-none focus:boderColorCustom border border-solid'
                                defaultValue={props.obj.nivel}
                            >
                                <option disabled></option>
                                <option value="A1">A1</option>
                                <option value="A2">A2</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="B2+">B2+</option>
                                <option value="C1">C1</option>
                                <option value="C2">C2</option>
                            </select>
                        </div>
                    </div>


                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, completar todos los campos para avanzar.</p> : <br />}

                    <div className='flex flex-row justify-center gap-3'>
                        <a onClick={handleOnCloseBtn} className="flex bgColorCustom text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                            Cancelar
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
