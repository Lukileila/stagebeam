import { useState } from "react";

export const Workspace = () => {
/* 
    const [spotlight, setSpotlight] = useState({
        x: 40,
        y: 40,
      });
    
      const onStorageUpdate = (e) => {
        const { key, newValue } = e;
        if (key === 'light') {
          setSpotlight(JSON.parse(newValue));
        }
      };
    
      useEffect(() => {
        setSpotlight(
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



    function StagePlanner({ spotlight, setSpotlight }) {
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
    
        setSpotlight({ x, y });
    
        localStorage.setItem(
        'light',
        JSON.stringify({
            x,
            y,
        })
        );
    };
 */

  return (
    <div className='fixed border-2 left-[30vw] h-[69vh] w-[70vw] bg-pink-500 p-2 text-white'> Workspace</div>
  )
}
