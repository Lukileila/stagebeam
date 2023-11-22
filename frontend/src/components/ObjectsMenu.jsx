import React from 'react';
import { useEffect, useState } from "react";

export const ObjectsMenu = ({templateObjects, setTemplateObjects, activeObjects, setActiveObjects}) => {
  

  useEffect(() => { console.log("Hi from Menu Component! templateObjects",templateObjects) }, [ templateObjects]);
  useEffect(() => { console.log("Hi from Menu Component! activeObjects",activeObjects) }, [ activeObjects]); 

  const addToActive = (object) => {
    setActiveObjects([...activeObjects, object]);
  };


  return (
    <>
      <div className='fixed top-[3vh] border-2 h-[97vh] w-[30vw] bg-slate-800 p-5 text-white z-0'> <h1>ObjectsMenu</h1>
      <ul className='list-disc'>
        {templateObjects.length>0 && templateObjects.map((x,i)=>{
          return <li key={i} onClick={()=>addToActive(x)} className="cursor-pointer">{x.name}</li>
        })}
      </ul>
      </div>
    </>
  )
}
