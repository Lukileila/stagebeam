import React from 'react';
import { useEffect, useState } from "react";

export const ObjectsMenu = ({templateObjects, activeObjects, setActiveObjects}) => {

  const addToActive = (templateObject) => {
    setActiveObjects(prev => [...prev, {...templateObject, id: `${templateObject.name}_${crypto.randomUUID()}`}]);
  };

  const openBeamer = ()=> {
    window.open("/beamer")
  }

  return (
    <>
      <div className='flex flex-col fixed w-[30%] h-full bg-black p-1 pr-0'>
        <div   className='flex justify-between border-2 border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900  rounded p-1 my-1 text-gray-300  cursor-pointer' > 
          <h1 className='text-gray-600'>Beamer window<span> is open</span></h1>
          <div className="border-2 border-gray-700 bg-gray-800   rounded p-1 my-1 text-gray-600 cursor-pointer"> 
          <p>test element</p></div>
          <button onClick={openBeamer} className="border-2 border-gray-800 bg-gradient-to-b from-gray-700 hover:from-gray-900 to-gray-600 hover:to-gray-800 rounded p-1 my-1">
            <img src="./src/assets/icons/popoutSvg.svg" alt="popout" className="w-5 aspect-square fill-white"></img>
          </button>
        </div>     
        <div className='grow border-2 border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 rounded p-1  text-gray-300 z-0'> 
        <h1 className='text-gray-600'>Objects</h1>
        <ul className='list-disc p-5'>
          {templateObjects.length>0 && templateObjects.map((templateObject,it)=>{
            return <li key={it} onClick={()=>addToActive(templateObject)} className="cursor-pointer">{templateObject.name}</li>
          })}
        </ul>
      </div>
 
      </div>
    </>
  )
}
