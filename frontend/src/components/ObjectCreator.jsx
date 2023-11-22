import { useEffect, useState } from "react";

export const ObjectCreator = ({activeObjects, setActiveObjects, stageDimensions}) => {


  const startDrag = (e) => {
    e.target.classList.add('opacity-40');
  };

  const stopDrag = (e) => {
    e.target.classList.remove('opacity-40');
 
    let rx = (e.clientX  -stageDimensions.left) /stageDimensions.width ;
    let ry = (e.clientY  -stageDimensions.top)  /stageDimensions.height ;
    let aO = activeObjects;
    console.log("aO:",aO,"e.target.id:",e.target.id,"aO[e.target.id].position.rx",aO[e.target.id].position.rx,"aO[e.target.id].position.ry",aO[e.target.id].position.ry)
    /* Codesketch, probably not working: */
    aO[e.target.id].position.rx=rx;
    aO[e.target.id].position.ry=ry;
    console.log("stageDimensions:",stageDimensions)
    setActiveObjects([...aO]);
    /* setrelCoords({ rx, ry }); */
    localStorage.setItem(
        'activeObjects',
        JSON.stringify({aO})
        );
  };

  return (<>
  
    {activeObjects.length>0 && activeObjects.map((x,i)=>{
      return (
        
          <div key={i} id={i} draggable onDragStart={startDrag} onDragEnd={stopDrag}
            className="absolute block text-white mix-blend-screen cursor-grab -translate-x-[50%] -translate-y-[50%]" 
            style={{
              top: x.position.ry*100 + '%',
              left: x.position.rx*100 + '%',
            }}>

            {x.elements.length>0 && x.elements.map((x,j)=>{ return (
            <div key={j} aeid={j}
              className="absolute block text-white mix-blend-screen cursor-grab "  
              style={{
                width:x.css.width,
                height:x.css.width,
                borderRadius:x.css.borderRadius,
                backgroundColor:x.css.backgroundColor,
                translate:x.css.translate
              }}
            >{x.name}</div>
            )})}


          </div>
        
      )     
    })}

  </>);
}
