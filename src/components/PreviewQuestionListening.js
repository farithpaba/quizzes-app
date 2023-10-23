import React, { useState } from 'react'
import { RiDragMove2Fill, RiPlayFill } from 'react-icons/ri'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ModalEditListening from './ModalEditListening';

export default function PreviewQuestionListening(props) {

  
    
    

    const audio = document.getElementById("audio"+props.obj.id);
    const [btnPlay, setBtnPlay] = useState(true);
    const [intentos, setIntentos] = useState(props.obj.intentos);
    
    

    function playAudio() {
        if (props.isPlaying === true) {
            /* alert("No puedes reproducir 2 audios al mismo tiempo") */
            return null;
        }
        if (intentos > 0) {
            audio.play();
            setIntentos(intentos-1);
            var segundos = 0;

            var interval = setInterval(() => {
                segundos = segundos + 1;
                document.getElementById("slideDuration"+props.obj.id).value = segundos;
                /* console.log(document.getElementById("slideDuration"+props.obj.id).value); */
                if (segundos > props.obj.duracion) {
                    clearInterval(interval);
                    document.getElementById("slideDuration"+props.obj.id).value = 0;
                    /* console.log(document.getElementById("slideDuration"+props.obj.id).value); */
                }
            }, "1000");
            
            
        }
        /*  */
    }

   
    const [selectedQ, setSelectedQ] = useState();

    return (
        <div  className="bg-white max-w-5xl mx-auto py-2 my-3">
            <div className="flex justify-between">
                <a
                    className="text-2xl font-extralight ml-6"
                >
                    {props.obj.pregunta}
                </a>
            </div>
            <br />
            <div className="flex gap-2 overflow-x-auto">
                <div className="mx-auto ">
                    <audio id={"audio"+props.obj.id} src={props.obj.audios} onPlay={()=>{setBtnPlay(false); props.handlePlayer(true);}} onEnded={()=>{setBtnPlay(true); props.handlePlayer(false);}}>
                    </audio>
                    <button 
                        id='btnPlay' 
                        disabled={(btnPlay === false || intentos === 0) ? true : false}  
                        className={`${(btnPlay === false || intentos === 0) ? "text-gray-500": "textColorCustom"}  text-5xl flex items-center`} 
                    >
                        <RiPlayFill onClick={()=>playAudio()}  />
                        <input disabled id={'slideDuration'+props.obj.id} type="range" max={Math.round(props.obj.duracion)} defaultValue={0} />
                    </button>


                </div>

            </div>
            <br />
            <div className="flex flex-col gap-2 pb-3 px-6">
                {props.obj.respuestas.map((res) =>
                    <button key={res} onClick={() => setSelectedQ(res)} className={`border ${selectedQ === res ? "bgColorCustom text-white" : "textColorCustom"} boderColorCustom  py-2 px-4 hover:bgColorCustom hover:text-white rounded-xl transition-colors text-center w-full lg:w-1/2 mx-auto`}>
                        {res}
                    </button>
                )}
            </div>
        </div>
    )
}
