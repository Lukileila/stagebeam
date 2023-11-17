import { useEffect, useRef, useState } from "react";

export const StagePlanner = ({ spotlight, setspotlight }) => {

    const stageContainer = useRef();
    const [stageDimensions, setStageDimensions] = useState();
    
    useEffect(() => {
        setStageDimensions(stageContainer.current.getBoundingClientRect());
        console.log("stageDimension:",stageDimensions);  //returns undefined
    }, []);

    
    const dragLight = (e) => {
        e.target.classList.add('opacity-40');
    };
    
    const stopDrag = (e) => {
        e.target.classList.remove('opacity-40');
        let x = e.clientX  -stageDimensions.left ;
        let y = e.clientY  - stageDimensions.top ;
        console.log("stageDimension from stopDrag:",stageDimensions); //returns valid getBoundingClientRect
    
        setspotlight({ x, y });
    
        localStorage.setItem(
        'light',
        JSON.stringify({
            x,
            y,
        })
        );
    };
    
    return (
        <div
        className='fixed bg-black top-[3vh] h-[67vh] left-[30vw] w-[70vw] border-2 overflow-visible /* group/canvas */ z-1'
        ref={stageContainer}

     /*    onDragOver={(e) => {
            e.preventDefault();
        }} */
        >
                                <div className="absolute bg-tansparent border-2 border-pink-500 h-10 w-10 z-30"></div>
        <h1 className='text-gray-700 p-2 text-xl'>StagePlanner</h1>
        <div
            className='bg-blue-500 w-20 aspect-square rounded-full cursor-grab absolute -translate-x-[50%] -translate-y-[50%] z-10'
            style={{
            top: spotlight.y + 'px',
            left: spotlight.x + 'px',
            }}
            draggable
            onDragStart={dragLight}
            onDragEnd={stopDrag}
        ></div>
        </div>
    );
}