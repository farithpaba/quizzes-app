import React, { useEffect, useRef, useState } from 'react'


export default function QuizQuestionSpeaking(props) {

    const [recordBtn, setRecordBtn] = useState(false);

    useEffect(() => {
        getMicrophonePermission();
    }, [])

    const [stream, setStream] = useState(null);
    const [permission, setPermission] = useState(false);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const mimeType = "audio/webm";

    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState([]);
    const [record1, setRecord1] = useState(null);

    const startRecording = async () => {
        console.log("RECORDING");
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);

    };

    const stopRecording = () => {
        setRecordingStatus("inactive");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecord1(audioUrl);
            setAudioChunks([]);
        };
    };



    return (
        <div className="bg-white max-w-5xl mx-auto py-2 my-3">
            <div className="flex justify-between">
                <a
                    className="text-2xl font-extralight ml-6"
                >
                    {props.obj.pregunta}
                </a>

            </div>
            <br />
            <div className='mx-6'>
                <p className='text-center text-gray-500'>Pulsa el botón para grabar tu respuesta. </p>
                <br />
                <p className='text-center text-gray-500'>Recuerda, tienes solo {props.obj.intentos} {props.obj.intentos === 1 ? "intento permitido" : "intentos permitidos"}  y el tiempo máximo por intento es de {props.obj.tiempoMax} min.</p>
                <br />
                {!permission ? (
                    <button className='mb-3 mx-auto flex hover:cursor-pointer hover:underline hover:textColorCustom ' onClick={getMicrophonePermission} type="button">
                        Get Microphone
                    </button>
                ) : null}

                <button
                    onClick={() => {
                        if (recordBtn === false && permission && recordingStatus === "inactive") {
                            setRecordBtn(!recordBtn);
                            startRecording();
                        } else if(recordingStatus === "recording"){
                            setRecordBtn(!recordBtn);
                            stopRecording();
                        }
                    }}
                    className={recordBtn === false ? "flex gap-1 mx-auto text-2xl rounded-full p-2 bg-red-500 text-white font-extralight" : "flex gap-1 mx-auto text-2xl rounded-full p-2 border text-red-500 border-red-500"}
                >
                    {recordBtn === false ? "Grabar" : "Detener"}
                    <p>{recordBtn === false ? "●" : "■"}</p>
                </button>
                {recordBtn && <p className='text-sm text-gray-500 text-center animate-pulse'>grabando...</p>}

                <br />
            </div>

            {/* <div className="audio-controls">
                {!permission ? (
                    <button  onClick={getMicrophonePermission} type="button">
                        Get Microphone
                    </button>
                ) : null}
                {permission && recordingStatus === "inactive" ? (
                    <button   onClick={startRecording} type="button">
                        Start Recording
                    </button>
                ) : null}
                {recordingStatus === "recording" ? (
                    <button  onClick={stopRecording} type="button">
                        Stop Recording
                    </button>
                ) : null}
            </div> */}

            {/* {record1 ? (
                <div className="audio-container">
                    <audio src={record1} controls></audio>
                    <a download href={record1}>
                        Download Recording
                    </a>
                    <p>{record1}</p>
                </div>
            ) : null} */}


        </div>
    )
}
