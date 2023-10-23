import React, { useState } from 'react'
import { RiDragMove2Fill } from 'react-icons/ri'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ModalEditMultipleChoice from './ModalEditMultipleChoice';
import {DndContext, closestCenter } from "@dnd-kit/core"
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import SortableItem from './SortableItem'
import ModalEditDragandDRop from './ModalEditDrag&Drop';

export default function PreviewQuestionDragandDrop(props) {

    const [elements, setElements] = useState(props.obj.respuestas)

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
        <div  className="bg-white max-w-5xl mx-auto py-2 my-3">
            <div className="flex justify-between">
                <a
                    className="text-2xl font-extralight ml-6"
                >
                    {props.obj.textoPrevio}
                </a>
                
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
        </div>
    )
}
