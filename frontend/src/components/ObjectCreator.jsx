import { useEffect, useState } from "react";

export const ObjectCreator = ({activeObjects, setActiveObjects, stageDimensions}) => {


  const startDrag = (e) => {
    e.target.classList.add('opacity-40');
  };

  const stopDrag = (e, elId) => {
    e.target.classList.remove('opacity-40');
 
    let rx = (e.clientX  -stageDimensions.left) /stageDimensions.width ;
    let ry = (e.clientY  -stageDimensions.top)  /stageDimensions.height ;
    // const aO = [...activeObjects]; /* shallow clone */
    const aO = activeObjects.map(eachObj => eachObj.id === elId ? {...eachObj, position: { rx, ry }} : eachObj)

    // console.log("aO:",aO,"e.target.id:",e.target.id,"aO[e.target.id].position.rx",aO[e.target.id].position.rx,"aO[e.target.id].position.ry",aO[e.target.id].position.ry)

    // aO[elIndex].position.rx=rx;
    // aO[elIndex].position.ry=ry;


    /* 
    aO[2].position.rx=rx;
    aO[2].position.ry=ry; */
    setActiveObjects(aO);


 /*    localStorage.setItem(
        'activeObjects',
        JSON.stringify({aO})
        ); */
  };

  return (<>
  
    {activeObjects.length>0 && activeObjects.map((x,i)=>{
      return (
          
          <div key={x.id} id={x.id} draggable onDragStart={startDrag} onDragEnd={(e) => stopDrag(e, x.id)}
            className="absolute block cursor-grab animate-spin opacity-50 mix-blend-screen" 
            style={{
              top: x.position.ry*100 + '%',
              left: x.position.rx*100 + '%',
            }}>
            

            {x.elements.length>0 && x.elements.map((x,j)=>{ return (
            <div key={j}
              className="absolute block text-white mix-blend-screen cursor-grab"  
              style={{
                width:x.css.width,
                height:x.css.width,
                borderRadius:x.css.borderRadius,
                backgroundColor:x.css.backgroundColor,
                translate:x.css.translate
              }}
            >{x.name}</div>
            )})}

            
            <div className="centerIndicator  absolute block b-2 border-black border-2 rounded-full text-white mix-blend-normal cursor-grab w-10 h-10 -translate-x-[50%] -translate-y-[50%] "></div>

          </div>
        


      )     
    })}

  </>);
}
