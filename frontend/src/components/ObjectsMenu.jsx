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
          <h1 className='text-gray-600'>Beamer Window</h1>
          <button onClick={openBeamer} className="border-2 border-gray-800 bg-gradient-to-t from-gray-950 hover:from-gray-900 to-gray-900 hover:to-gray-800 rounded p-1 my-1 text-gray-300 hover:text-white cursor-pointer">open</button>
        </div>     
        <div className='grow border-2 border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 rounded p-1  text-gray-300 z-0'> 
        <h1 className='text-gray-600'>ObjectsMenu</h1>
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
