import React, { useState } from 'react'

export default function QuizText(props) {

    return (
        <div  className=" bg-white max-w-5xl mx-auto py-2  my-3 ">
            <div className="flex justify-between">
                <a
                    className="invisible text-2xl font-extralight ml-6"
                >
                </a>
                
            </div>
            <br />
            <p
                className={`${props.obj.fontSize} font-extralight mx-6 text-justify`}>
                {props.obj.texto}
            </p>
        </div>
    )
}
