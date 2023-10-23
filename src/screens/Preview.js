import { useMemo, useState } from "react";
import {  useNavigate } from "react-router-dom";
import PreviewText from "../components/PreviewText";
import PreviewQuestionMultipleChoice from "../components/PreviewQuestionMultipleChoice";
import PreviewImage from "../components/PreviewImage";
import PreviewAudio from "../components/PreviewAudio";
import { selectElements } from "../redux/newElementsSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import CountdownTimer from "../components/CountdownTimer";
import PreviewQuestionComplete from "../components/PreviewQuestionComplete";
import PreviewQuestionDragandDrop from "../components/PreviewQuestionDrag&Drop";
import PreviewQuestionListening from "../components/PreviewQuestionListening";
import PreviewQuestionSpeaking from "../components/PreviewQuestionSpeaking";

function Preview() {
    let navigate = useNavigate();


    const [elements, setElements] = useState(useSelector(selectElements))


    const itemIds = useMemo(() => elements.map((item) => item.id), [elements]);

    const [duracionExamen,setDuracionExamen] = useState(dayjs(Date.now() + 2100000));


    return (
        <div className=" bg-white min-h-screen">


            {/* Content */}
            <main className="p-8 ">
                {/* Header */}
                <header className="fixed left-0 top-0 w-full bg-white p-3 flex justify-between border-b z-40">
                    <div className='invisible text-center w-[30%]'>
                        <h1 className='uppercase font-bold tracking-[4px] textColorCustom'></h1>
                    </div>
                    <ul className="flex items-center gap-4">
                        <li>
                            <a onClick={()=>navigate(-1)} className="flex bg-blue-500 text-white p-2 rounded-2xl items-center gap-2 hover:cursor-pointer hover:scale-95 duration-100">
                                Editar
                            </a>
                        </li>
                    </ul>
                </header>

                <header className="fixed left-0 top-16 w-full bgColorCustom p-3 flex justify-between border-b z-40">
                    <div className=' text-center '>
                        <h1 className='uppercase font-bold tracking-[4px] text-white text-lg'>Tu Logo</h1>
                    </div>
                    <ul className="flex items-center gap-4">
                        <li>
                            <CountdownTimer text={"text-white text-2xl font-extralight"} countdownTimestampMS={duracionExamen}/>
                        </li>
                    </ul>
                </header>

                <div className="mt-[90px] ">
                 
                    {itemIds &&  itemIds.map(elementId => {
                        if (elements.find(e => e.id === elementId).type === "multipleChoice")
                            return <PreviewQuestionMultipleChoice key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                        if (elements.find(e => e.id === elementId).type === "complete")
                            return <PreviewQuestionComplete key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                        if (elements.find(e => e.id === elementId).type === "drag&drop")
                            return <PreviewQuestionDragandDrop key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                        if (elements.find(e => e.id === elementId).type === "listening")
                            return <PreviewQuestionListening key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                        if (elements.find(e => e.id === elementId).type === "speaking")
                            return <PreviewQuestionSpeaking key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                        if (elements.find(e => e.id === elementId).type === "texto")
                            return <PreviewText key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                        if (elements.find(e => e.id === elementId).type === "imagen")
                            return <PreviewImage key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                        if (elements.find(e => e.id === elementId).type === "audio")
                            return <PreviewAudio key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                    })}

                </div>

              
            </main>
        </div>
    );
}

export default Preview;