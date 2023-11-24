export const ObjectCreatorBeamer = ({activeObjects}) => {
  console.log("activeObjects",activeObjects);

  return (<>
  
  
    {activeObjects.length>0 && activeObjects.map((x,i)=>{
      return (
          
          <div key={x.id} id={x.id}
            className="absolute block cursor-grab animate-spin mix-blend-screen" 
            style={{
              top: x.position.ry*100 + '%',
              left: x.position.rx*100 + '%',
            }}>
            

            {x.elements.length>0 && x.elements.map((x,j)=>{ return (
            <div key={j}
              className="absolute block text-white mix-blend-screen cursor-grab"  
              style={{
                width:x.css.width,
                height:x.css.height,
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
