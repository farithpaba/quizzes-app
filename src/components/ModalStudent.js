import React, { useState } from 'react';
import { RiCloseLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';

export default function ModalStudent(props) {

    const [validation, setValidation] = useState();

    const handleOnClose = (e) => {
        if (e.target.id === "container") {
            props.onClose();
            setValidation(false);
        }
    }

    const handleOnCloseBtn = (e) => { props.onClose(); }

    function saveValue() {
        var fullName = document.getElementById("fullName").value;
        var email = document.getElementById("email").value;
        var telefono = document.getElementById("telefono").value;
        var estatus = document.getElementById("estatus").value

        if (fullName.trim() === "" || email.trim() === "" || telefono.trim() === "" || estatus === "") {
            setValidation("Por favor, completa todos los campos para avanzar.");
            return null;
        }
        if (courseArray.length === 0) {
            setValidation("Por favor, ingresa por lo menos un curso.");
            return null;
        }

        var obj = {
            id: uuidv4(),
            fullName: fullName,
            email: email,
            telefono: telefono,
            cursos: courseArray,
            estatus: estatus
        }
        props.handleValue(obj);
        props.onClose();
        setValidation();
    }

    var courses = ["Starters", "Curso preparación EAT", "Curso 6-8pm Miercoles"];
    const [courseArray, setCourseArray] = useState([]);

    function addCourse() {
        var course = document.getElementById("cursos").value;
        if (courseArray.includes(course) === false) {
            setCourseArray([...courseArray, course]);
        }
    }

    function deleteItem(e) {
        var newArray = courseArray.filter((curso) => curso !== e);
        setCourseArray(newArray);
    }

    return (
        <div
            id='container'
            onClick={handleOnClose}
            className='fixed z-50 inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center '
        >
            <div className='w-[90%] lg:w-[60%]  bg-white h-[90%] pb-5  rounded-md  border overflow-y-auto'>
                <div className='bgColorCustom rounded-tl-md text-6xl '>
                    <br />
                </div>
                <label className="flex w-full relative px-3 mt-4">
                    <input
                        id='fullName'
                        type="text"
                        className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                        required
                    />
                    <span
                        className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                    >
                        Nombre Completo<span className="text-red-500">*</span>
                    </span>
                </label>

                <label className="flex w-full relative px-3 mt-4">
                    <input
                        id='email'
                        type="text"
                        className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                        required
                    />
                    <span
                        className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                    >
                        Email<span className="text-red-500">*</span>
                    </span>
                </label>
                <label className="flex w-full relative px-3 mt-4">
                    <input
                        id='telefono'
                        type="number"
                        className="bg-transparent ring-1 ring-gray-300 w-full h-10 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400"
                        required
                    />
                    <span
                        className="absolute top-1/2 -translate-y-1/2 left-3 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold transition-all bg-white px-2 cursor-text peer-valid:top-0 peer-valid:text-xs peer-valid:font-semibold text-gray-500 flex items-center gap-2"
                    >
                        Teléfono<span className="text-red-500">*</span>
                    </span>
                </label>
                <br />
                <div className='lg:flex items-center gap-2 '>
                    <div className='flex items-center gap-2 ml-5'>
                        <p className='text-gray-500'>Cursos inscrito:</p>
                        <select
                            id="cursos"
                            className='text-gray-500 mr-3  my-2 rounded-md px-2 py-1 focus:outline-none focus:border-purple-600 border border-solid'
                            defaultValue={""}
                            onChange={addCourse}
                        >
                            <option disabled></option>
                            {courses.map((course) =>
                                <option key={course} value={course}>{course}</option>
                            )}
                        </select>
                    </div>
                    <p className='text-gray-500 text-center'>(Selecciona uno o varios cursos)</p>
                </div>

                <br />
                {/* Courses */}
                {courseArray.length > 0 &&
                    <div className="flex items-center flex-wrap gap-4 mb-4 ml-5">
                        {courseArray.map((curso) =>
                            <span key={curso} className="bg-white flex items-center gap-4 py-2 pl-2 pr-6 rounded-full shadow-md border">
                                <button onClick={() => deleteItem(curso)} className="bg-purple-100 p-1 rounded-full textColorCustom text-xs ">
                                    <RiCloseLine />
                                </button>{" "}
                                <span className="text-gray-500">{curso}</span>
                            </span>
                        )}

                        <button onClick={() => setCourseArray([])} className="text-gray-500 ml-4">Clear all</button>
                    </div>
                }

                <div className='flex items-center gap-2 ml-5'>
                    <p className='text-gray-500'>Estatus:</p>
                    <select
                        id="estatus"
                        className='text-gray-500 mr-3  my-2 rounded-md px-2 py-1 focus:outline-none focus:border-purple-600 border border-solid'
                        defaultValue={""}
                    >
                        <option disabled></option>
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
                {validation !== undefined ? <p className='text-center text-red-500 my-3'>{validation}</p> : <br />}
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
