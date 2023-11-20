import { useEffect, useRef, useState } from "react";

export const StagePlanner = ({ spotlight, setspotlight, projectionAspectRatio, ratioCoords, setRatioCoords }) => {

    const stageContainer = useRef();
    const [stageDimensions, setStageDimensions] = useState();
    
    useEffect(() => {
        setStageDimensions(stageContainer.current.getBoundingClientRect());
        console.log("stageDimension:",stageDimensions);  //returns undefined
    }, [projectionAspectRatio]);

    
    const dragLight = (e) => {
        e.target.classList.add('opacity-40');
    };
    
    const stopDrag = (e) => {
        e.target.classList.remove('opacity-40');

        let x = e.clientX  -stageDimensions.left ;
        let y = e.clientY  -stageDimensions.top ;
        setspotlight({ x, y });
        console.log("stageDimension from stopDrag:",stageDimensions); //returns valid getBoundingClientRect */

        localStorage.setItem(
        'light',
        JSON.stringify({
            x,
            y,
        })
        );

        // let relx = (e.clientX  -stageDimensions.left) ;
        // let rely = (e.clientY  -stageDimensions.top) ;
        let relx = (e.clientX  -stageDimensions.left)/stageDimensions.width ;
        let rely = (e.clientY  -stageDimensions.top)/stageDimensions.height ;
        setRatioCoords({ relx, rely });

        localStorage.setItem(
            'ratioCoords',
            JSON.stringify({
                x:relx,
                y:rely,
            })
            );

    
    };

    useEffect(() => {
        console.log("projectionAspectRatio State is:",projectionAspectRatio)
         }, [projectionAspectRatio]); 
    useEffect(() => {
        // console.log("ratioCoords are:",ratioCoords)
        }, [ratioCoords]); 
    useEffect(() => {
        console.log("stage dimensions are:",stageDimensions)
        }, [stageDimensions]); 
     
    
    return (
        <div className='fixed bg-black top-[3vh] h-[67vh] left-[30vw] w-[70vw] border-2 overflow-visible /* group/canvas */ z-1' 

             
       /*      onDragOver={(e) => { e.preventDefault(); }} If default is prevented, the coordinates get all messed up*/
        >

            <h1 className='absolute text-gray-700 p-2 text-xl'>StagePlanner</h1>

            <div className="bg-transparent border-2 border-pink-500 z-30 relative" style={{aspectRatio:projectionAspectRatio}} ref={stageContainer}>
                <div
                    className='bg-blue-500 w-20 aspect-square rounded-full cursor-grab absolute -translate-x-[50%] -translate-y-[50%] z-10'
                    style={{
                    // top: ratioCoords.y + '%',
                    // left: ratioCoords.x + '%',
                    top: spotlight.y + 'px',
                    left: spotlight.x + 'px',
                    }}
                    draggable
                    onDragStart={dragLight}
                    onDragEnd={stopDrag}
                ></div>               
                <div
                    className='bg-purple-500 w-20 aspect-square rounded-full cursor-grab absolute -translate-x-[50%] -translate-y-[50%] z-10'
                    style={{
                    top: spotlight.y +10+ 'px',
                    left: spotlight.x +10+ 'px',
                    }}
                    draggable
                    onDragStart={dragLight}
                    onDragEnd={stopDrag}
                ></div>    
            </div>
        </div>
    );
}