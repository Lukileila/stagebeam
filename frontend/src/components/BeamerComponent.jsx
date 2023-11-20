import { useEffect, useState } from "react";
import { Beamer } from "./Beamer";


export const BeamerComponent = () => {

    //absolute Coordinates
    const [spotlight, setspotlight] = useState({
        x: 40,
        y: 40,
    });

    //relative Coordinates
    const [relCoords, setRelCoords] = useState({
        x: 0.8,
        y: 0.8,
    });

    //updating function for Both
    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === 'light') {
        setspotlight(JSON.parse(newValue));
        } else if (key === 'ratioCoords') {
        setRatioCoords(JSON.parse(newValue));}
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
            x:0.1,
            y:0.1,
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
        <Beamer spotlight={spotlight} />
    );
}

 
