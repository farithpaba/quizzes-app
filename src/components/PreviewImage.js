import React, { useState } from 'react'

export default function PreviewImage(props) {

    return (
        <div  className=" bg-white max-w-5xl mx-auto py-2   my-3 ">
            <div className="flex justify-between">
                <a
                    className="invisible text-2xl font-extralight ml-6"
                >
                </a>
                
            </div>
            <br />
            <div className="flex flex-col md:flex-row items-center  gap-2 overflow-x-auto mx-6 mb-5 justify-center">
                {props.obj.imgs &&
                    props.obj.imgs.map((image, index) => {
                        return (
                            <div key={image} className="md:w-1/4 h-max ">
                                <img src={image}  alt="upload" />
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}
