import React from 'react';
import { useEffect, useState } from "react";

export const ObjectsMenu = ({templateObjects, activeObjects, setActiveObjects}) => {

  const addToActive = (templateObject) => {
    setActiveObjects(prev => [...prev, {...templateObject, id: `${templateObject.name}_${crypto.randomUUID()}`}]);
  };

  return (
    <>
      <div className='fixed top-[3vh] border-2 h-[97vh] w-[30vw] bg-slate-800 p-5 text-white z-0'> <h1>ObjectsMenu</h1>
      <ul className='list-disc'>
        {templateObjects.length>0 && templateObjects.map((templateObject,it)=>{
          return <li key={it} onClick={()=>addToActive(templateObject)} className="cursor-pointer">{templateObject.name}</li>
        })}
      </ul>
      </div>
    </>
  )
}
