import { useEffect, useState } from "react";
import { BeamerDisplay } from "./BeamerDisplay";
import objectTemplates from "../data/objectTemplates.json"


export const BeamerManager = () => {

    //States
    const [activeObjects, setActiveObjects] = useState([]);

    const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === 'activeObjects') {
        setActiveObjects(JSON.parse(newValue));
        }
    };

    useEffect(() => {
        const aOstring= localStorage.getItem('activeObjects') ?? objectTemplates;
        const aOparsed= JSON.parse(aOstring);
        setActiveObjects(aOparsed);
        
        window.addEventListener('storage', onStorageUpdate);
        return () => {
        window.removeEventListener('storage', onStorageUpdate);
        };
    }, []);

    return (
        <BeamerDisplay  activeObjects={activeObjects} setActiveObjects={setActiveObjects}  /* relCoords={relCoords} *//>
    );
}

 
