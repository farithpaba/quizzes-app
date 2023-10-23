import React, { useState } from 'react'

export default function QuizQuestionMultipleChoice(props) {

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
                {props.obj.respuestas.map((res) =>
                    <button key={res} onClick={()=>handleRespuesta(res)} className={`border ${selectedQ === res ? "bgColorCustom text-white":"textColorCustom"} boderColorCustom  py-2 px-4 hover:bgColorCustom hover:text-white rounded-xl transition-colors text-center w-full lg:w-1/2 mx-auto`}>
                        {res}
                    </button>
                )}
            </div>
        </div>
    )
}
