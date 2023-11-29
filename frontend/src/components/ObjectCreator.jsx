export const ObjectCreator = ({activeObjects, setActiveObjects, stageDimensions, selected, setSelected}) => {


  const startDrag = (e) => {
  };

  const stopDrag = (e, elId) => {

    setSelected(elId);
    console.log("sydfgsdfg",elId);
 
    let rx = (e.clientX  -stageDimensions.left) /stageDimensions.width ;
    let ry = (e.clientY  -stageDimensions.top)  /stageDimensions.height ;
    let aO=[];

    //if within screen or 10% outside, add new position, else delete object 
    if (rx>-0.05 && rx<1.05  && ry>-0.05 && ry<1.05){
      aO = activeObjects.map(eachObj => eachObj.id === elId ? {...eachObj, position: { rx, ry }} : eachObj)
    }else{
      aO = activeObjects.filter(object=>!(object.id===elId)).map(object=>object)
    }
    setActiveObjects(aO);
  };

  
  return (<>
  
    {activeObjects.length>0 && activeObjects.map((x,i)=>{
      return (
          
          <div key={x.id} id={x.id} draggable onDragStart={startDrag} onDragEnd={(e) => stopDrag(e, x.id)}
            className="absolute block cursor-grab mix-blend-screen" 
            style={{
              top: x.position.ry*100 + '%',
              left: x.position.rx*100 + '%',
            }}>
            
            {x.elements.length>0 && x.elements.map((element,j)=>{ return (
            <div key={j}
              className="absolute block text-white mix-blend-screen cursor-grab"  
              style={{
                width:element.size*x.size*stageDimensions.width+'px',
                aspectRatio:element.css.aspectRatio,
                borderRadius:element.css.borderRadius,
                backgroundColor:element.css.backgroundColor,
                translate:element.css.translate,
                opacity: x.opacity,
              }}
            ></div>
            )})}

            
            <div className="centerIndicator  absolute block b-4 border-black border-4 rounded-full text-white mix-blend-normal cursor-grab w-10 h-10 -translate-x-[50%] -translate-y-[50%] opacity-100"></div>
            <div className="centerIndicator  absolute block b-2 border-yellow-500 border-2 rounded-full text-white mix-blend-normal cursor-grab w-10 h-10 -translate-x-[50%] -translate-y-[50%] opacity-100"></div>

          </div>
        


      )     
    })}

  </>);
}
