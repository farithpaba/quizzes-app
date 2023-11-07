import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizText from "../../components/Students/QuizText";
import QuizAudio from "../../components/Students/QuizAudio";
import QuizQuestionMultipleChoice from "../../components/Students/QuizQuestionMultipleChoice";
import QuizQuestionComplete from "../../components/Students/QuizQuestionComplete";
import QuizQuestionDragandDrop from "../../components/Students/QuizQuestionDrag&Drop";
import QuizImage from "../../components/Students/QuizImage";
import dayjs from "dayjs";
import CountdownTimer from "../../components/CountdownTimer";
import ReviewQuestionMultipleChoice from "../../components/Students/ReviewQuestionMultipleChoice";
import QuizQuestionSpeaking from "../../components/Students/QuizQuestionSpeaking";


function Quiz() {
    /* useEffect(() => {
        
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };
        window.addEventListener("beforeunload", unloadCallback);
        return () => {
            window.addEventListener("popstate", confirmation());
            window.removeEventListener("beforeunload", unloadCallback);
        }
        
    }, []); */



    

    let navigate = useNavigate();
    var i = 0;

    const [elements, setElements] = useState([
        {
            id: "2",
            fontSize: "text-2xl",
            texto: "Este es un ejemplo de un hermoso y sensual texto",
            type: "texto"
        },
        {
            id: "1",
            pregunta: "How much ____ the train to Santiago cost? ",
            respuestas: ["does", "is", "do"],
            respuestaCorrecta: "does",
            type: "multipleChoice",
            respuestaSeleccionada: ""
        },
        {
            id: "3",
            fontSize: "text-2xl",
            texto: "Quisque et felis non tortor pellentesque pharetra vitae ut nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras vitae lacus pellentesque, lacinia nulla faucibus, ultricies mi. Cras varius velit vel viverra tristique. Praesent eu ultrices dui, non commodo leo. Pellentesque mattis aliquam mi. Nulla facilisi. Nam aliquam tincidunt nulla a cursus. Quisque viverra ante nunc, non iaculis enim aliquet sit amet. Phasellus at lacus at sapien dignissim placerat. Aliquam a ultricies orci.",
            type: "texto"
        },
        {
            id: "4",
            pregunta: "Esta es una pregunta dificil de responder? ",
            respuestas: ["Esta no es", "Esta tampoco", "Soy tu padre"],
            respuestaCorrecta: "Esta no es",
            type: "multipleChoice",
            respuestaSeleccionada: ""
        },
        {
            id: "5",
            pregunta: "How much ____ the train to Santiago cost? ",
            respuestas: ["does", "is", "do"],
            respuestaCorrecta: "does",
            type: "multipleChoice",
            respuestaSeleccionada: ""
        },
        {
            id: "6",
            pregunta: "How much ____ the train to Santiago cost? ",
            respuestas: ["does", "is", "do"],
            respuestaCorrecta: "does",
            type: "multipleChoice",
            respuestaSeleccionada: ""
        },
        {
            id: "7",
            pregunta: "How much ____ the train to Santiago cost? ",
            respuestas: ["does", "is", "do"],
            respuestaCorrecta: "does",
            type: "multipleChoice",
            respuestaSeleccionada: ""
        },
        {
            id: "aa9b08cf-7661-42b3-821d-05c6184a59b9",
            array: [
                "vc",
                "",
                "gcfx",
                "fg",
                "ddfg",
                {
                    opcion1: "1",
                    opcion2: "2",
                    opcion3: "3",
                    respuestaCorrecta: "2"
                }
            ],
            textoPrevio: "asddasda",
            type: "complete",
            textoCompletar: "vc  gcfx fg ddfg @"
        },
        {
            id: "7c670b91-51ad-433d-9db1-dc36e7025f16",
            textoPrevio: "asddasda",
            respuestas: [
                "does",
                "fsd",
                "edas",
                "a",
                "dsaddd"
            ],
            ordenCorrecto: [
                "does",
                "fsd",
                "edas",
                "dsaddd",
                "a"
            ],
            type: "drag&drop"
        },
        {
            id: "d2b48b93-75eb-4cd6-a249-ee7e91db563f",
            pregunta: "cxasd",
            type: "speaking",
            intentos: 1,
            tiempoMax: 1
        }

    ])

    function handleSelection(e) {
        if (e !== null) {
            var newArray = elements.map((element) => {
                if (element.id === e.id) {
                    return e
                } else {
                    return element
                }
            });
            setElements(newArray);
        }
    }


    const itemIds = useMemo(() => elements.map((item) => item.id), [elements]);

    const [duracionExamen, setDuracionExamen] = useState(dayjs(Date.now() + 2100000));
    const [quiz, setQuiz] = useState(true);
    const [summary, setSummary] = useState(false);
    const [review, setReview] = useState(false);

    const [nota, setNota] = useState()
    const [numQuestions, setnumQuestions] = useState()
    const [correctas, setCorrectas] = useState()

    function calificar() {
        var numPreguntas = 0;
        var preguntasCorrectas = 0;
        elements.map((element) => {
            if (element.type === "multipleChoice") {
                numPreguntas = numPreguntas + 1;
            }
        })
        var valorPunto = 100 / numPreguntas;
        var total = 0;
        elements.map((element) => {
            if (element.type === "multipleChoice") {
                if (element.respuestaCorrecta === element.respuestaSeleccionada) {
                    total = total + valorPunto;
                    preguntasCorrectas = preguntasCorrectas + 1;
                }
            }
        });
        /* alert(total) */
        setNota(total);
        setnumQuestions(numPreguntas);
        setCorrectas(preguntasCorrectas)
        setSummary(false);
        setReview(true);
    }

    return (
        <>
            {quiz &&
                <div className=" bg-white min-h-screen">


                    {/* Content */}
                    <main className="p-8 ">

                        <header className="fixed left-0 top-0 w-full bgColorCustom p-3 flex justify-between border-b z-40">
                            <div className=' text-center '>
                                <h1 className='uppercase font-bold tracking-[4px] text-white text-lg'>Tu Logo</h1>
                            </div>
                            <ul className="flex items-center gap-4">
                                <li>
                                    <CountdownTimer text={"text-white text-2xl font-extralight"} countdownTimestampMS={duracionExamen}  />
                                </li>
                            </ul>
                        </header>

                        <div className="mt-[90px] ">

                            {itemIds && itemIds.map(elementId => {
                                if (elements.find(e => e.id === elementId).type === "multipleChoice")
                                    return <QuizQuestionMultipleChoice key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} handleSelection={handleSelection} />
                                if (elements.find(e => e.id === elementId).type === "complete")
                                    return <QuizQuestionComplete key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                                if (elements.find(e => e.id === elementId).type === "drag&drop")
                                    return <QuizQuestionDragandDrop key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                                if (elements.find(e => e.id === elementId).type === "speaking")
                                    return <QuizQuestionSpeaking key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                                    if (elements.find(e => e.id === elementId).type === "texto")
                                    return <QuizText key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                                if (elements.find(e => e.id === elementId).type === "imagen")
                                    return <QuizImage key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                                if (elements.find(e => e.id === elementId).type === "audio")
                                    return <QuizAudio key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                            })}

                            <button onClick={() => { setSummary(true); setQuiz(false) }} className="bgColorCustom rounded-full text-white p-2 flex mx-auto hover:scale-95 duration-100">Finalizar exámen</button>

                        </div>


                    </main>
                </div>
            }

            {summary &&
                <div className=" bg-white min-h-screen">


                    {/* Content */}
                    <main className="p-8 ">

                        <header className="fixed left-0 top-0 w-full bgColorCustom p-3 flex justify-center border-b z-40">
                            <div className=' text-center '>
                                <h1 className='uppercase font-bold tracking-[4px] text-white text-lg'>Tu Logo</h1>
                            </div>
                        </header>

                        <div className="mt-[90px] ">


                            {elements.map(element => {

                                if (element.type === "multipleChoice") {
                                    i = i + 1;
                                    if (element.respuestaSeleccionada !== "") {
                                        return <div className="flex gap-2 justify-between w-52 mx-auto border-y text-gray-600">
                                            <p>{i}</p>
                                            <p>Respuesta guardada</p>
                                        </div>
                                    } else {
                                        return <div className="flex gap-2 justify-between w-52 mx-auto border-y text-gray-600">
                                            <p>{i}</p>
                                            <p>Sin responder</p>
                                        </div>
                                    }

                                }

                            })}
                            <br />
                            <div className="flex flex-col gap-2">
                                <button onClick={() => { i = 0; setSummary(false); setQuiz(true); }} className="bg-slate-800 rounded-full  text-white p-2 flex mx-auto hover:scale-95 duration-100">Volver al exámen</button>
                                <div className="flex gap-2 justify-center">
                                    <p>Tiempo restante:</p>
                                    <p className="font-bold"><CountdownTimer text={"text-black"} countdownTimestampMS={duracionExamen} /></p>
                                </div>
                                <button onClick={() => calificar()} className="bgColorCustom rounded-full  text-white p-2 flex mx-auto hover:scale-95 duration-100">Finalizar exámen</button>
                            </div>



                        </div>


                    </main>
                </div>
            }

            {review &&
                <div className=" bg-white min-h-screen">


                    {/* Content */}
                    <main className="p-8 ">

                        <header className="fixed left-0 top-0 w-full bgColorCustom p-3 flex justify-center border-b z-40">
                            <div className=' text-center '>
                                <h1 className='uppercase font-bold tracking-[4px] text-white text-lg'>Tu Logo</h1>
                            </div>
                        </header>

                        <div className="mt-[90px] ">

                            <p className="text-center text-6xl font-extralight text-gray-500">Revision</p>
                            <br />
                            <div className="mx-40 bg-gray-200 p-2 rounded-xl">
                                <div className="flex gap-2 justify-between px-5">
                                    <p className="font-normal text-2xl">Calificación:</p>
                                    <p className="font-extralight text-2xl ">{correctas} de {numQuestions} ({nota}%)</p>
                                </div>
                            </div>

                            {itemIds && itemIds.map(elementId => {
                                if (elements.find(e => e.id === elementId).type === "multipleChoice")
                                    return <ReviewQuestionMultipleChoice key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} handleSelection={handleSelection} />
                                if (elements.find(e => e.id === elementId).type === "texto")
                                    return <QuizText key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                                if (elements.find(e => e.id === elementId).type === "imagen")
                                    return <QuizImage key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                                if (elements.find(e => e.id === elementId).type === "audio")
                                    return <QuizAudio key={elementId} id={elementId} obj={elements.find(e => e.id === elementId)} />
                            })}
                            <br />
                            <div className="flex flex-col gap-2">
                                <button onClick={() => navigate("/preExam")} className="bgColorCustom rounded-full  text-white p-2 flex mx-auto hover:scale-95 duration-100">Finalizar revisión</button>
                            </div>



                        </div>


                    </main>
                </div>
            }
        </>

    );
}

export default Quiz;