import { useEffect, useRef, useState } from "react";

export const StagePlanner = ({ spotlight, setspotlight, projectionAspectRatio, relCoords, setrelCoords }) => {

    const [stageDimensions, setStageDimensions] = useState();
    const [aspectToggle, setAspectToggle]=useState(false);
    const stageContainer = useRef();
    const workspace = useRef();

    useEffect(() => {
        setStageDimensions(stageContainer.current.getBoundingClientRect());
        let x=workspace.current.getBoundingClientRect();
        if ((x.width/x.height)>projectionAspectRatio){setAspectToggle(true) }else setAspectToggle(false);

    }, [projectionAspectRatio]);

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
      }, [projectionAspectRatio]);

    
    
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
        <div className='fixed bg-black text-white top-[3vh] h-[67vh] left-[30vw] w-[70vw] border-2 overflow-visible /* group/canvas */ z-1  ' ref={workspace}>

            <h1 className='absolute text-gray-700 p-2 text-xl'>StagePlanner</h1>

            <div className={`relative bg-transparent border-2 border-pink-500 ${aspectToggle && 'h-full'} z-30`} style={{aspectRatio:projectionAspectRatio}} ref={stageContainer}>

            <div className="flex flex-wrap w-full h-full justify-end content-end"><p>relCoords.y:{parseFloat(relCoords.ry).toFixed(2)} relCoords.x:{parseFloat(relCoords.rx).toFixed(2)}| beamer aspect ratio: {parseFloat(projectionAspectRatio).toFixed(2)}</p></div>

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
                    
            </div>
        </div>
    );
}