
import { useEffect, useState } from "react";

export const ObjectCreator = ({activeObjects, setActiveObjects}) => {



  useEffect(() => { console.log("Hi from ObjectCreator! activeObjects",activeObjects) }, [ activeObjects]);
  return (
    <>
    {activeObjects.length>0 && activeObjects.map((x,i)=>{
              return <div key={i} className="absolute text-green-400">{x.name}</div>
            })}
    </>
  )
}
