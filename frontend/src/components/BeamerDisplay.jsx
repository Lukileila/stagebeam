import { useEffect, useRef, useState } from "react";

export const Beamer = ({ spotlight, relCoords }) => {

    const [projectionAspectRatio, setProjectionAspectRatio] = useState(1);

    console.log("screen.height",screen.height);
    console.log("screen.width",screen.width);

    const getScreenAspectRatio = (e) => {

        let ratio = screen.width / screen.height;
        console.log("ratio",ratio);
        setProjectionAspectRatio(ratio);
    
        localStorage.setItem('projectionAspectRatio',ratio);
    };

    useEffect(() => { getScreenAspectRatio() }, []);

 //Event Listener
//not working yet
/*     useEffect(() => {
            addEventListener("fullscreenchange",(e)=>getScreenAspectRatio);
        return () => {
            removeEventListener("fullscreenchange",(e)=>getScreenAspectRatio);
        };
    }, []);
 */

    return (
   
        <div className='bg-black h-[97vh] relative overflow-hidden border-2'>
        <h1 className='text-white text-xl'>I&apos;m just a beaaaaamer</h1>
        <div
            className='bg-amber-200 w-20 aspect-square rounded-full absolute -translate-x-[50%] -translate-y-[50%]'
            style={{
            top: spotlight.y + 'px',
            left: spotlight.x + 'px',
            }}
        >
        </div>

        <div
            className='bg-purple-900 w-20 aspect-square rounded-full absolute -translate-x-[50%] -translate-y-[50%]'
            style={{
            top: relCoords.y + 'px',
            left: relCoords.x + 'px',
            }}
        >
        </div>

        </div>
    );
}