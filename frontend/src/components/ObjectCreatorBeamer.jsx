export const ObjectCreatorBeamer = ({activeObjects}) => {

  return (<>
  
    {activeObjects.length>0 && activeObjects.map((x,i)=>{
      return (
          
          <div key={x.id} id={x.id}
            className="absolute block cursor-grab mix-blend-screen" 
            style={{
              top: x.position.ry*100 + '%',
              left: x.position.rx*100 + '%',
            }}>
            
            {x.elements.length>0 && x.elements.map((element,j)=>{ 

              let elementBackgroundColor = x.color ? x.color :  element.css.backgroundColor;
              console.log(elementBackgroundColor);
              const elementBackground = (x.edgeHardness === NaN)? elementBackgroundColor : `radial-gradient(circle, ${elementBackgroundColor} ${x.edgeHardness*100*0.7071068+'%'}, rgba(0,0,0,0) 70.71068%)`;

              return (
                <div
                  key={j}
                  className="absolute block text-white mix-blend-screen cursor-grab"  
                  style={{
                    width:element.size*x.size*screen.width+'px',
                    aspectRatio:element.css.aspectRatio,
                    borderRadius:element.css.borderRadius,
                    background: elementBackground,
                    translate:element.css.translate,
                    opacity: x.opacity,
                  }}
                ></div>
              )
            })}
          </div>
        


      )     
    })}

  </>);
}
