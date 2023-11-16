import { useEffect, useRef, useState } from "react";



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


 
function StagePlanner({ spotlight, setspotlight }) {
const stageContainer = useRef();
const [stageDimensions, setStageDimensions] = useState();

useEffect(() => {
    setStageDimensions(stageContainer.current.getBoundingClientRect());
}, []);

const dragLight = (e) => {
    e.target.classList.add('opacity-40');
};

const stopDrag = (e) => {
    e.target.classList.remove('opacity-40');
    let x = e.clientX;
    let y = e.clientY - stageDimensions.top;

    setspotlight({ x, y });

    localStorage.setItem(
    'light',
    JSON.stringify({
        x,
        y,
    })
    );
};

return (
    <div
    className='fixed bg-black top-[3vh] h-[67vh] left-[30vw] w-[70vw] border-2 overflow-hidden group/canvas'
    ref={stageContainer}
    onDragOver={(e) => {
        e.preventDefault();
    }}
    >
    <h1 className='text-gray-700 p-2 text-xl'>StagePlanner</h1>
    <div
        className='bg-amber-200 w-20 aspect-square rounded-full cursor-grab absolute -translate-x-[50%] -translate-y-[50%]'
        style={{
        top: spotlight.y + 'px',
        left: spotlight.x + 'px',
        }}
        draggable
        onDragStart={dragLight}
        onDragEnd={stopDrag}
    ></div>
    </div>
);
}
