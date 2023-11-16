import { useEffect, useRef, useState } from "react";


 




function Beamer({ spotlight }) {
    return (
        <div className='bg-black h-[97vh] relative overflow-hidden'>
        <h1 className='text-white text-xl'>I&apos;m just a beaaaaamer</h1>
        <div
            className='bg-amber-200 w-20 aspect-square rounded-full absolute -translate-x-[50%] -translate-y-[50%]'
            style={{
            top: spotlight.y + 'px',
            left: spotlight.x + 'px',
            }}
        ></div>
        </div>
    );
}





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

 
