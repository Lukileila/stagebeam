import { useEffect, useState } from "react";
import { Beamer } from "./Beamer";


export const BeamerComponent = () => {


    const [spotlight, setspotlight] = useState({
        x: 40,
        y: 40,
    });

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
        <Beamer spotlight={spotlight} />
    );
}

 
