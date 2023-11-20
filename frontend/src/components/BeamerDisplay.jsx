import { useEffect, useRef, useState } from "react";

export const BeamerDisplay = ({ spotlight, relCoords }) => {

    const [projectionAspectRatio, setProjectionAspectRatio] = useState(1);

    console.log("screen.height",screen.height);
    console.log("screen.width",screen.width);

    const getScreenAspectRatio = (e) => {

        let ratio = screen.width / screen.height;
        console.log("ratio",ratio);
        setProjectionAspectRatio(ratio);
    
        localStorage.setItem('projectionAspectRatio',ratio);
    };

    useEffect(() => { getScreenAspectRatio() }, []); // Executed only on reload but should listen to a bunch of events like fullscreenchange

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
   
        <div className='bg-black h-[100vh] relative overflow-hidden'>
                        <div className="p-2 flex text-gray-800 flex-wrap w-full h-full justify-end content-end"><p>free version of StageBeam.live</p></div>

        <div
            className='bg-amber-100 w-[300px] aspect-square rounded-full absolute -translate-x-[50%] -translate-y-[50%]'
            style={{
                top: relCoords.ry*100   + '%',
                left: relCoords.rx*100  + '%',
            }}
        >
        </div>

        </div>
    );
}