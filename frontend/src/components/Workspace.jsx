import { useEffect, useRef, useState } from "react";
import { StagePlanner } from "./StagePlanner";


// Main function
export const Workspace = () => {

 //States
    const [spotlight, setspotlight] = useState({
        x: 40,
        y: 40,
    });

 //Event Listener
    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === 'light') {
        setspotlight(JSON.parse(newValue));
        }
    };

    useEffect(() => {
        setspotlight(
        localStorage.getItem('light') ?? {
            x: 10,
            y: 90,
        }
        );
        window.addEventListener('storage', onStorageUpdate);
        return () => {
        window.removeEventListener('storage', onStorageUpdate);
        };
    }, []);


    return (

        <StagePlanner
            spotlight={spotlight}
            setspotlight={setspotlight}
        />

    );
}

