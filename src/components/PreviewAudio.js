import React, { useState } from 'react'

export default function PreviewAudio(props) {

    

    return (
        <div className=" bg-white max-w-5xl mx-auto py-2   my-3 ">
            <div className="flex justify-between">
                <a
                    className="invisible text-2xl font-extralight ml-6"
                >
                </a>
               
            </div>
            <br />
            <div className="flex gap-2 overflow-x-auto">
                <div className="mx-auto">
                    <audio src={props.obj.audios} controls></audio>
                </div>
            </div>
        </div>
    )
}
