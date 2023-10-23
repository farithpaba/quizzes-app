import React, { useState } from 'react'

export default function ReviewQuestionMultipleChoice(props) {

    const [selectedQ, setSelectedQ] = useState(props.obj.respuestaSeleccionada);
    var newObj = props.obj;

    function handleRespuesta(res) {
        newObj.respuestaSeleccionada = res;
        setSelectedQ(res);
        props.handleSelection(newObj);
    }

    return (
        <div className=" bg-white max-w-5xl mx-auto py-2    my-3 ">
            <div className="flex justify-between">
                <a
                    className="text-2xl font-extralight ml-6"
                >
                    {props.obj.pregunta}
                </a>

            </div>
            <br />
            <div className="flex flex-col gap-2 pb-3 px-6">
                {props.obj.respuestas.map((res) => {
                    if ( res === props.obj.respuestaCorrecta) {
                        return  <button key={res} className="border  bg-emerald-500 text-white py-2 px-4   rounded-xl  text-center w-full lg:w-1/2 mx-auto">
                                    {res}
                                </button>
                    } else if ((res === selectedQ) && (res !== props.obj.respuestaCorrecta)) {
                        return  <button key={res} className="border  bg-red-500 text-white py-2 px-4   rounded-xl  text-center w-full lg:w-1/2 mx-auto">
                                    {res}
                                </button>
                    }
                    else{
                        if (selectedQ === "") {
                            return  <button key={res} className="border bg-red-500 text-white py-2 px-4   rounded-xl  text-center w-full lg:w-1/2 mx-auto">
                                        {res}
                                    </button>
                        }
                        return  <button key={res} className="border boderColorCustom  textColorCustom py-2 px-4   rounded-xl  text-center w-full lg:w-1/2 mx-auto">
                                    {res}
                                </button>
                    }
                }

                )}
            </div>
        </div>
    )
}
