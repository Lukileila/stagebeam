import { useEffect, useState } from "react";
import { BeamerDisplay } from "./BeamerDisplay";


export const BeamerManager = () => {

    //States
    const [activeObjects, setActiveObjects] = useState([]);

    //updating function for Both
/*     const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === 'activeObject') {
        setspotlight(JSON.parse(newValue));
        }
    }; */


    useEffect(() => {
        setActiveObjects(
        localStorage.getItem('activeObjects') ?? []
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
        <BeamerDisplay /* spotlight={spotlight} */ /* relCoords={relCoords} *//>
    );
}

 
