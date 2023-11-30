import React from 'react';
import { useEffect, useState } from "react";
import { PaletteCards } from "./PaletteCards";
import { ActiveCards } from "./ActiveCards";
import popoutSvg from  '../assets/icons/popoutSvg.svg';

export const ObjectsMenu = ({templateObjects, activeObjects, setActiveObjects, selected, setSelected}) => {

  
  const [beamerOnline, setBeamerOnline] = useState( JSON.parse(localStorage.getItem('beamerOnline'))) 


  useEffect(() => {
    const onStorageUpdate=()=>{ setBeamerOnline(JSON.parse(localStorage.getItem('beamerOnline')) ?? false)}
    
    window.addEventListener('storage', onStorageUpdate);
    return () => {
    window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);




  const openBeamer = ()=> {
    window.open("/beamer")
  }
  const clearActiveObjects = ()=>{
    setActiveObjects([])
  }


  return (
    <>
      <div className='flex flex-col fixed w-[30%] h-full bg-black p-1 pr-0'>
        <div   className='flex flex-col justify-between border-2 border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 rounded p-1 text-gray-300  cursor-pointer' > 
          <h1 className='text-gray-600'>Beamer window</h1>

          <button onClick={openBeamer} className='flex hover:translate-y-px border-2 border-gray-800  rounded p-1 ' style={{backgroundColor:beamerOnline?'#FACC15':"#6B7280"}}>
            <p className=' text-gray-900 '>{beamerOnline?"beamer window is open ":'pop out the beamer window '}</p><img src={popoutSvg} alt="popout" className=" w-5 aspect-square "></img>
          </button>
        </div>     

        <div className='grow flex flex-col border-2 my-1 border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 rounded p-1  text-gray-300 z-0'> 
          <h1 className='text-gray-600'>Objects Palette</h1>
          <div className='grow border-2 my-1 border-gray-950 bg-black rounded-lg p-1  text-gray-300 z-0'> 
              <h3 className="text-gray-300 text-sm">Lights ⮟</h3>
              <div className='grow flex flex-row flex-wrap justify-start content-start'>
              <PaletteCards templateObjects={templateObjects} activeObjects={activeObjects} setActiveObjects={setActiveObjects}/>
              </div>
          </div>
        </div>


        <div className='grow flex flex-col border-2  border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 rounded p-1  text-gray-300 z-0'> 
          <div className="flex flex-row justify-between">
          <h1 className='text-gray-600'>Active Objects</h1>
          <button onClick={clearActiveObjects} className=' border outline outline-1 outline-black border-gray-800 hover:border-gray-950 bg-gray-900  hover:bg-gray-900 rounded px-1 mr-1'>
            <p className='text-black hover:translate-y-px'>clear all 🗑️</p>  </button>
          </div>

          <div className='grow border-2 border-gray-950 bg-black  rounded-lg  overflow-auto text-gray-300 z-0'> 
            <ActiveCards activeObjects={activeObjects} setActiveObjects={setActiveObjects} selected={selected} setSelected={setSelected}/>
          </div>
          
        </div>
 
      </div>
    </>
  )
}
