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
      <div className='fixed w-[30%] h-full bg-black p-1 pr-0'>
        <div className=' border-2 border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 rounded h-full p-5  text-gray-300 z-0'> 
        <button onClick={openBeamer}>Open the beamer window 🔼</button>
        <h1>ObjectsMenu</h1>
        <ul className='list-disc'>
          {templateObjects.length>0 && templateObjects.map((templateObject,it)=>{
            return <li key={it} onClick={()=>addToActive(templateObject)} className="cursor-pointer">{templateObject.name}</li>
          })}
        </ul>
      </div>
      </div>
    </>
  )
}
