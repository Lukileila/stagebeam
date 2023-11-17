import { useEffect, useRef, useState } from "react";
import { StagePlanner } from "./StagePlanner";


// Main function
export const Workspace = () => {

 //States
    const [spotlight, setspotlight] = useState({
        x: 40,
        y: 40,
    });

    const [ratioCoords, setRatioCoords] = useState({
        x: 0.5,
        y: 0.5,
    });

    const [projectionAspectRatio, setProjectionAspectRatio] = useState(1);


 // This function mirrors the localstorage contents of certain keys to states
    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === 'light') {
            setspotlight(JSON.parse(newValue));
        } else if (key === 'ratioCoords') {
            setRatioCoords(JSON.parse(newValue));
        } else if (key ==='projectionAspectRatio'){
            setProjectionAspectRatio(newValue);
        }
    };

 //Event Listener, listening to storage updates
    useEffect(() => {

        setspotlight(
            localStorage.getItem('light') ?? { x: 10, y: 90,}
        );
        setProjectionAspectRatio(
            localStorage.getItem('projectionAspectRatio') ?? 2
        );
        setRatioCoords(
            localStorage.getItem('ratioCoords') ?? { x: 0.5, y: 0.5,}
        );

        window.addEventListener('storage', onStorageUpdate);
        return () => {
        window.removeEventListener('storage', onStorageUpdate);
        };
    }, []);

 //Console logging a state as it changes
    useEffect(() => {
   console.log("projectionAspectRatio State is:",projectionAspectRatio)
    }, [projectionAspectRatio]); 


    return (
        <>
            <StagePlanner
                spotlight={spotlight}
                setspotlight={setspotlight}
                ratioCoords={ratioCoords}
                setRatioCoords={setRatioCoords}
                projectionAspectRatio={projectionAspectRatio}
                setProjectionAspectRatio={setProjectionAspectRatio}
            />
        </>

    );
}

