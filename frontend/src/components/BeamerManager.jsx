import { useEffect, useState } from "react";
import { BeamerDisplay } from "./BeamerDisplay";


export const BeamerManager = () => {

    //absolute Coordinates
    const [spotlight, setspotlight] = useState({
        x: 40,
        y: 40,
    });

    //relative Coordinates
    const [relCoords, setRelCoords] = useState({
        rx: 0.8,
        ry: 0.8,
    });

    //updating function for Both
    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === 'light') {
        setspotlight(JSON.parse(newValue));
        } else if (key === 'relCoords') {
        setRelCoords(JSON.parse(newValue));}
    };


    useEffect(() => {
        setspotlight(
        localStorage.getItem('light') ?? {
            x: 10,
            y: 90,
        }
        );
        setRelCoords(
        localStorage.getItem('relCoords') ?? {
            rx:0.1,
            ry:0.1,
        }
        );
        window.addEventListener('storage', onStorageUpdate);
        return () => {
        window.removeEventListener('storage', onStorageUpdate);
        };
    }, []);




/* Duplicate? Check!

    useEffect(() => {
        setRelCoords(
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
 */


    return (
        <BeamerDisplay spotlight={spotlight} relCoords={relCoords}/>
    );
}

 
