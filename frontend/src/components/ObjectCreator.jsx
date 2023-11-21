export const ObjectCreator = () => {
  return (
<>
    <div
    className='bg-blue-500 w-20 aspect-square rounded-full cursor-grab absolute -translate-x-[50%] -translate-y-[50%] z-10'
    style={{
    top: spotlight.y + 'px',
    left: spotlight.x + 'px',
    }}
    draggable
    onDragStart={dragLight}
    onDragEnd={stopDrag}
  >
  </div>  

<div
    className='bg-purple-500 w-20 aspect-square rounded-full cursor-grab absolute -translate-x-[50%] -translate-y-[50%] z-10'
    style={{
     top: relCoords.ry*100 + '%',
     left: relCoords.rx*100 + '%',
    }}
    draggable
    onDragStart={dragLight}
    onDragEnd={stopDrag}
  >
  </div>  
    <div>ObjectCreator</div>
</>
  )
}
