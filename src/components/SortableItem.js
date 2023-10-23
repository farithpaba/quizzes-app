import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from 'react'

function SortableItem(props) {

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: props.id})

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

  return (
    <div className="bgColorCustom p-1 rounded-full touch-none" ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <p className="text-center text-white" >{props.id}</p>
    </div>
  )
}

export default SortableItem