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
        <div ref={workspace} className='fixed bg-black text-white h-[70%] left-[30%] w-[70%] border-2 overflow-visible /* group/canvas */ z-1  ' >

            <h1 className='absolute text-gray-700 p-2 text-xl'>Workspace</h1>

            <div  ref={stageContainer} className={`relative bg-transparent border-2 border-pink-500 ${aspectToggle && 'h-full'} z-30`} style={{aspectRatio:projectionAspectRatio}}>
                <div className="relative flex flex-wrap w-full h-full justify-end content-end text-gray-500 p-1"><p> beamer aspect ratio: {parseFloat(projectionAspectRatio).toFixed(2)}</p></div>
                <ObjectCreator activeObjects={activeObjects} setActiveObjects={setActiveObjects} stageDimensions={stageDimensions}/>          
                  
            </div>
        </div>
    );
}

