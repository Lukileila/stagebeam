import { useEffect, useRef, useState } from 'react';
import { ObjectCreatorBeamer } from './ObjectCreatorBeamer';
import fullscreenSvg from  '../assets/icons/fullscreenSvg.svg';

export const BeamerDisplay = ({activeObjects, setActiveObjects}) => {

    //Declaring States
    const [projectionAspectRatio, setProjectionAspectRatio] = useState(1);
    const [fullscreen, setFullscreen] = useState(false);
    const [exitNotice, setExitNotice] = useState(false);



    // Declaring Functions
    const getScreenAspectRatio = (e) => {

        let ratio = screen.width / screen.height;
        setProjectionAspectRatio(ratio);
        
        localStorage.setItem('projectionAspectRatio',ratio);
        };

    const toggleFullScreen=()=>{
        if (!document.fullscreenElement) {
            document.body.requestFullscreen();
            setFullscreen(true);
            console.log('requestfullscreen')
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreen(false);
            console.log('exitfullscreen')
        }
        }

    

    //useEffects
    useEffect(() => { getScreenAspectRatio() }, []);
    
    //event Listeners  
    useEffect(() => {
                document.body.addEventListener('fullscreenchange',getScreenAspectRatio);
                document.body.addEventListener('mouseenter',()=>{setExitNotice(true)});
                document.body.addEventListener('mouseleave',()=>{setExitNotice(false)});
            return () => {
                document.body.removeEventListener('fullscreenchange',getScreenAspectRatio);
                document.body.removeEventListener('mouseenter',()=>{setExitNotice(true)});
                document.body.removeEventListener('mouseleave',()=>{setExitNotice(false)});
            };
        }, []);

    const displayInstruction = ()=>{
        if (!fullscreen) {return(
            <>
            <div className='absolute flex flex-col flex-wrap w-full h-full p-2 justify-center justify-items-center items-center content-center z-60'>
                <div className='border-2 border-gray-800 p-2 bg-gradient-to-t from-gray-950 to-gray-900 rounded
                flex flex-col flex-wrap  justify-center justify-items-center items-center content-center max-w-sm'>
                <p className='  text-gray-300 text-xl'>Drag this window onto the beamer screen and go fullscreen:</p>
                <button onClick={toggleFullScreen} className=' border-2 rounded border-gray-950 opacity-100 bg-yellow-500 hover:bg-yellow-400 box-shadow p-2 m-2 aspect-square'>
                    <img src={fullscreenSvg} alt="go fullscreen" className="w-10 aspect-square fill-white"></img>
                </button>
                <p className=' text-gray-300 text-md w-full'>⚙️ Display settings must be: <br></br> Multiple screens: Extend these displays.</p>
                </div>
            </div>
            </>
    
           )}}

    const displayExitNotice = ()=>{
        if (exitNotice&&fullscreen) {return(
            <div className='absolute  flex text-red-500 flex-wrap w-full h-full justify-end content-start'><button onClick={toggleFullScreen} className=' border-2 rounded-bl border-gray-950 opacity-100 bg-yellow-500 hover:bg-yellow-400 box-shadow p-2 w-16 h-16 aspect-square text-4xl'>❌</button></div>

        )}}

    return (
        <>
            <div className='bg-black h-[100vh] relative overflow-hidden '>

                <div className='absolute p-2 flex text-gray-800 flex-wrap w-full h-full justify-end content-end'><p>free version of StageBeam.live</p></div>
                <div className=' h-full w-full absolute' style={{filter: !fullscreen ?'blur(16px)':'none'}}>
                <ObjectCreatorBeamer activeObjects={activeObjects}/>
                </div>
                {displayInstruction()}
                {displayExitNotice()}

            </div>


        </>
    );
}