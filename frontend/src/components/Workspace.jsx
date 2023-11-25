import { useEffect, useRef, useState } from "react";
import { ObjectCreator } from "./ObjectCreator";

// Main function
export const Workspace = ({ activeObjects, setActiveObjects}) => {

 //States
    // Aspect Ratio of the window the beamer is in
    const [projectionAspectRatio, setProjectionAspectRatio] = useState(1);
    // Pink box dimensions
    const [stageDimensions, setStageDimensions] = useState({width:100});
    // h-full active or not for the pink box
    const [aspectToggle, setAspectToggle]=useState(false);

 //References
      const stageContainer = useRef();
      const workspace = useRef();


 // This function mirrors the localstorage contents of certain keys to states
    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key ==='projectionAspectRatio'){
            setProjectionAspectRatio(newValue);
        }
    };

 //Sets up event listeners for storage updates
    useEffect(() => {
        setProjectionAspectRatio(
            localStorage.getItem('projectionAspectRatio') ?? 2
        );
        window.addEventListener('storage', onStorageUpdate);
        return () => {
        window.removeEventListener('storage', onStorageUpdate);
        };
    }, []);


  // Toggling aspectToggle depending on whether the pink border box (stage) fits in the black box (workspace). (Responsiveness)
    useEffect(() => {
        setStageDimensions(stageContainer.current.getBoundingClientRect());
        let x=workspace.current.getBoundingClientRect();
        if ((x.width/x.height)>projectionAspectRatio){setAspectToggle(true) } else setAspectToggle(false);
    }, [projectionAspectRatio, aspectToggle]);

  // Resize Handler, writing the new sizes and toggling AspectToggle
      useEffect(() => {
        const handleResize = () => {
            let x=workspace.current.getBoundingClientRect();
            if ((x.width/x.height)>projectionAspectRatio){setAspectToggle(true) } else setAspectToggle(false);
            setStageDimensions(stageContainer.current.getBoundingClientRect());
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [projectionAspectRatio, aspectToggle]);
   
    return (
        <div className='fixed left-[30%] w-[70%] h-[70%] bg-black p-1'>
            <div ref={workspace} className=' bg-black text-gray-300 h-full w-full p-5 /* group/canvas */ z-1 overflow-hidden rounded-sm' >

                <h1 className='absolute text-gray-700 p-2 text-md'>Beamer - aspect ratio: {parseFloat(projectionAspectRatio).toFixed(2)}</h1>
                
                {/* formerly the "pink box": */}
                <div  ref={stageContainer} className={`relative bg-transparent border-2 border-yellow-500 ${aspectToggle && 'h-full'} z-30 `} style={{aspectRatio:projectionAspectRatio}}>
                    <ObjectCreator activeObjects={activeObjects} setActiveObjects={setActiveObjects} stageDimensions={stageDimensions}/>
                </div>    
                {/* Masking elements cause issues, when objects are dragged into them */}
                <div className={'absolute left-0 top-0 w-6 h-full bg-gray-800 mix-blend-darken  z-40'} isDragDisabled={true}></div>   {/* left masking overlay */}
                <div className={'absolute left-0 top-0 h-6 w-full bg-gray-800 mix-blend-darken  z-40'}isDragDisabled={true}></div>    {/* top masking overlay */}
                <div className={'absolute top-0 h-full w-full bg-gray-800 mix-blend-darken  z-40'} style={{left:stageDimensions.width+1.25*20}}></div> {/* right masking overlay */}
                <div id={'bottomyjenkins'} className={'absolute bottom-0 w-full bg-gray-800 mix-blend-darken z-40'}  style={{height:(window.innerHeight*0.7 -stageDimensions.height-1.25*20 )}} ></div> {/* bottom masking overlay */}
            </div>
        </div>
    );
}

