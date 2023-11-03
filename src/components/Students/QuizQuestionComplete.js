import React, { useState } from 'react'

import SelectAnswersAdmin from '../SelectAnswersAdmin';

export default function QuizQuestionComplete(props) {

 
 
    return (
        <div className="bg-white max-w-5xl mx-auto py-2 my-3">
            <div className="flex justify-between">
                <a
                    className="text-2xl font-extralight ml-6"
                >
                    {props.obj.textoPrevio}
                </a>
                
            </div>
            <br />
            <p className='text-justify mx-6'>
                {props.obj.array.map((palabra) => {
                    if (palabra === "@@")
                        return <br key={props.obj.id + props.obj.array.indexOf(palabra)} />
                    if (typeof palabra === "object")
                        return <SelectAnswersAdmin key={props.obj.id + props.obj.array.indexOf(palabra)} indice={props.obj.id + props.obj.array.indexOf(palabra)} obj={palabra}  />
                    else {
                        return " " + palabra + " "
                    }
                })}
            </p>
            <br/>
        </div>
    )
}
