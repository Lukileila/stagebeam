import { useEffect, useRef, useState } from "react";
import { ObjectCreator } from "./ObjectCreator";

export const StagePlanner = ({ spotlight, setspotlight, projectionAspectRatio, relCoords, setrelCoords }) => {


  // Declaring all the states and references
    const [stageDimensions, setStageDimensions] = useState();
    const [aspectToggle, setAspectToggle]=useState(false);
    const stageContainer = useRef();
    const workspace = useRef();

  // Toggling aspectToggle depending on whether the pink border box (stage) fits in the black box (workspace)
    useEffect(() => {
        setStageDimensions(stageContainer.current.getBoundingClientRect());
        let x=workspace.current.getBoundingClientRect();
        if ((x.width/x.height)>projectionAspectRatio){setAspectToggle(true) }else setAspectToggle(false);

    }, [projectionAspectRatio, aspectToggle]);

  // manages Beamer size / aspect ratio display    
  
    useEffect(() => {
        const handleResize = () => {
            let x=workspace.current.getBoundingClientRect();
            if ((x.width/x.height)>projectionAspectRatio){setAspectToggle(true) }else setAspectToggle(false);
            setStageDimensions(stageContainer.current.getBoundingClientRect());
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [projectionAspectRatio, aspectToggle]);

    
    
    const dragLight = (e) => {
        e.target.classList.add('opacity-40');
    };
    
    const stopDrag = (e) => {
        e.target.classList.remove('opacity-40');

        let x = e.clientX  -stageDimensions.left ;
        let y = e.clientY  -stageDimensions.top ;
        setspotlight({ x, y });

        localStorage.setItem(
            'light',
            JSON.stringify({
                x,
                y,
            })
            );

        let rx = (e.clientX  -stageDimensions.left)/stageDimensions.width ;
        let ry = (e.clientY  -stageDimensions.top)/stageDimensions.height ;
        setrelCoords({ rx, ry });

        localStorage.setItem(
            'relCoords',
            JSON.stringify({
                rx,
                ry,
            })
            );    
    };
        
    
    return (
        <div ref={workspace} className='fixed bg-black text-white top-[3vh] h-[67vh] left-[30vw] w-[70vw] border-2 overflow-visible /* group/canvas */ z-1  ' >

            <h1 className='absolute text-gray-700 p-2 text-xl'>StagePlanner</h1>

            <div  ref={stageContainer} className={`relative bg-transparent border-2 border-pink-500 ${aspectToggle && 'h-full'} z-30`} style={{aspectRatio:projectionAspectRatio}}>

            <div className="flex flex-wrap w-full h-full justify-end content-end text-gray-500"><p> rx: {parseFloat(relCoords.rx).toFixed(2)} ry: {parseFloat(relCoords.ry).toFixed(2)} | beamer aspect ratio: {parseFloat(projectionAspectRatio).toFixed(2)}</p></div>


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


{/* 
              <ObjectCreator/> */}
                    
            </div>
        </div>
    );
}