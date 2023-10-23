import React, { useState } from 'react'
import { RiCloseFill } from "react-icons/ri";
import {v4 as uuidv4} from 'uuid';

export default function ModalEditMedia(props) {

    const [validation, setValidation] = useState(false);

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



        if (props.type === "texto") {
            var texto = document.getElementById("texto").value;
            var fontSize = document.getElementById("fontSize").value;
            if (texto.trim() === "") {
                setValidation(true);
                return null;
            }
            var obj = {
                id:props.obj.id,
                texto: texto,
                type: "texto",
                fontSize: fontSize
            }
            props.handleValue(obj);
            props.onClose();
        }
        if (props.type === "imagen") {

            if (selectedImages.length === 0) {
                setValidation(true);
                return null;
            }

            if (selectedImages.length > 5) {
                return null;
            }

            var obj = {
                id:props.obj.id,
                imgs: selectedImages,
                type: "imagen"
            }

            props.handleValue(obj);
            props.onClose();
        }
        if (props.type === "audio") {
            if (selectedAudio.length === 0) {
                setValidation(true);
                return null;
            }

            var obj = {
                id:props.obj.id,
                audios: selectedAudio,
                type: "audio"
            }

            props.handleValue(obj);
            props.onClose();
        }
        setValidation(false);
    }

    const [selectedAudio, setSelectedAudio] = useState(props.obj.audios);
    const [selectedImages, setSelectedImages] = useState(props.obj.imgs);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) => previousImages.concat(imagesArray));

        // FOR BUG IN CHROME
        event.target.value = "";
        setValidation(false);
    };

    const onSelectFileAudio = (event) => {
        setSelectedAudio([]);
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const audiosArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedAudio((previousAudios) => previousAudios.concat(audiosArray));

        // FOR BUG IN CHROME
        event.target.value = "";
        setValidation(false);
    };

    function deleteHandler(image) {
        setSelectedImages(selectedImages.filter((e) => e !== image));
        URL.revokeObjectURL(image);
    }
    


    return (
        <div
            id='container'
            onClick={handleOnClose}
            className='fixed z-50 inset-0 bg-black bg-opacity-0 backdrop-blur-sm flex justify-center items-center '
        >
            {props.type === "texto" &&
                <div className='w-[90%] lg:w-[60%] bg-white h-auto pb-5 rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>

                    <div className='px-3 '>

                        <h1 className='text-xl font-extralight my-2'>Escribe el texto que deseas mostrar</h1>

                        <label className="flex w-full relative  mt-4">
                            <textarea
                                id='texto'
                                type="text"
                                defaultValue={props.obj.texto}
                                className="border bg-transparent ring-1 ring-gray-300 w-full h-36 rounded peer px-5 transition-all outline-none focus:ring-gray-400 valid:ring-gray-400 "
                                required
                            />

                        </label>
                        <div className='flex items-center gap-2 ml-2'>
                            <p className='text-gray-500'>Tamaño de letra:</p>
                            <select
                                id="fontSize"
                                className='text-gray-500  my-2 rounded-full px-2 py-1 focus:outline-none focus:border-purple-600 border border-solid'
                                defaultValue={""}
                            >
                                <option  disabled></option>
                                <option value="text-xs">12</option>
                                <option value="text-sm">14</option>
                                <option value="text-base">16</option>
                                <option value="text-lg">18</option>
                                <option value="text-xl">20</option>
                                <option value="text-2xl">24</option>
                            </select>
                        </div>
                    </div>

                    {validation === true ? <p className='text-center text-red-500 my-3'>Necesitas escribir algo.</p> : <br />}
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

            {props.type === "imagen" &&
                <div className='w-[90%] lg:w-[60%] bg-white h-auto pb-5 rounded-3xl  border'>
                    <div className='bg-purple-600 rounded-t-3xl text-6xl '>
                        <br />
                    </div>


                    <section className='p-6'>
                        <label className='px-3 py-1 flex flex-col justify-center items-center border rounded-full bgColorCustom text-white font-extralight cursor-pointer hover:scale-95 duration-100'>
                            Agregar imagenes
                            <br />
                            <span className='text-xs font-normal'>Máximo 5 imágenes</span>
                            <input
                                className='hidden'
                                type="file"
                                name="images"
                                onChange={onSelectFile}
                                multiple
                                accept="image/png , image/jpeg, image/webp"
                            />
                        </label>
                        <br />

                        {selectedImages.length > 0 &&
                            (selectedImages.length > 5 ? (
                                <p className="my-1 flex text-red-500">
                                    No puedes subir mas de 5 imagenes!
                                    <span className='ml-1'>
                                        Por favor, elimina <b> {selectedImages.length - 5} </b> imagenes{" "}
                                    </span>
                                </p>
                            ) : (
                                <button
                                    className="mx-auto flex mb-3 rounded-full border py-1 px-2 bg-emerald-500 text-white hover:cursor-default"
                                /* onClick={() => {
                                    console.log(selectedImages);
                                }} */
                                >
                                    {selectedImages.length} IMAGE
                                    {selectedImages.length === 1 ? "" : "S"} UPLOADED
                                </button>
                            ))}

                        <div className="flex gap-2 overflow-x-auto">
                            {selectedImages &&
                                selectedImages.map((image, index) => {
                                    return (
                                        <div key={image} className="w-1/4 h-max">
                                            <img src={image} height="200" alt="upload" />
                                            <button onClick={() => deleteHandler(image)} className='mx-auto flex my-1 rounded-full border text-gray-500 py-1 px-2 hover:bg-red-500 hover:text-white'>
                                                Eliminar
                                            </button>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>

                    {validation === true ? <p className='text-center text-red-500 my-3'>Por favor, selecciona al menos una imagen.</p> : <br />}

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

            {props.type === "audio" &&
                <div className='w-[90%] lg:w-[60%] bg-white h-auto pb-5 rounded-3xl  border'>
                    <div className='bgColorCustom rounded-t-3xl text-6xl '>
                        <br />
                    </div>

                    <section className='p-6'>
                        <label className='px-3 py-1 flex flex-col justify-center items-center border rounded-full bgColorCustom text-white font-extralight cursor-pointer hover:scale-95 duration-100'>
                            Agregar audio
                            <br />
                            <span className='text-xs font-normal'>Solo Mp3</span>
                            <input
                                className='hidden'
                                type="file"
                                name="images"
                                onChange={onSelectFileAudio}
                                accept="audio/mp3"
                            />
                        </label>
                        <br />



                        <div className="flex gap-2 overflow-x-auto">
                            {selectedAudio.length > 0 ? (
                                <div className="mx-auto">
                                    <audio src={selectedAudio} controls></audio>
                                </div>
                            ) : null}   
                        </div>
                    </section>


                    {validation === true ? <p className='text-center text-red-500 my-3'>Ningún archivo seleccionado</p> : <br />}

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
