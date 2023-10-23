import React, { useState } from 'react'
import { RiDragMove2Fill } from 'react-icons/ri'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ModalEditMultipleChoice from './ModalEditMultipleChoice';
import {DndContext, closestCenter } from "@dnd-kit/core"
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import SortableItem from './SortableItem'
import ModalEditDragandDRop from './ModalEditDrag&Drop';

export default function QuestionDragandDrop(props) {

    const [options, setOptions] = useState(false);
    const [modalEdit, setModalEdit] = useState(null);
    const [elements, setElements] = useState(props.obj.respuestas)

    const CloseModalMultipleChoice = () => setModalEdit(null);

    function handleObj(e) {
        if (e !== null) {
            props.edit(e);
        }
    }

    const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    function handle(event) { 
        const {active, over} = event;
    
        if (active.id !== over.id) {
          setElements((items)=>{
            const activeIndex = items.indexOf(active.id)
            const overIndex = items.indexOf(over.id)
    
            return arrayMove(items, activeIndex, overIndex);
          })
        }
      }

    return (
        <div ref={setNodeRef} style={style} className=" bg-white max-w-5xl mx-auto py-2  rounded-lg shadow-xl my-3 ">
            <div className="flex justify-between">
                <a
                    className="text-2xl font-extralight ml-6"
                >
                    {props.obj.textoPrevio}
                </a>
                <div className="flex text-xl text-gray-400 gap-2">
                    <RiDragMove2Fill {...attributes} {...listeners} className="touch-none hover:scale-95 duration-100 cursor-pointer hover:text-gray-300 outline-none" />
                    <div className="relative inline-block text-left">
                        <div>
                            <button onClick={() => setOptions(!options)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3  text-sm font-semibold text-gray-900  ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                                </svg>
                            </button>
                        </div>
                        {options === true &&
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
                                <div >
                                    <a onClick={() => { setModalEdit(true); setOptions(false); }} className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:text-gray-400" >Editar</a>
                                    <a onClick={() => { props.delete(props.obj.id); setOptions(false); }} className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer hover:bg-red-500 hover:text-white rounded-b-md " >Eliminar</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <br />
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handle}
            >

                <div className='px-5'>
                    <div className="flex flex-col gap-2 pb-3">
                        
                        <SortableContext
                            items={elements}
                            strategy={verticalListSortingStrategy}
                        >
                            {elements.map((obj) =>
                                <SortableItem key={obj} id={obj} />
                            )}
                        </SortableContext>


                    </div>
                </div>
                <br />

            </DndContext>
            {modalEdit && <ModalEditDragandDRop obj={props.obj} onClose={CloseModalMultipleChoice} handleValue={handleObj} />}
        </div>
    )
}
