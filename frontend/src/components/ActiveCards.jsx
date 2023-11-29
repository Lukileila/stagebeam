import {useState, useEffect} from 'react';

export const ActiveCards = ({templateObjects, setTemplateObjects, activeObjects, setActiveObjects, selected, setSelected}) => {



    const addToActive = (Object) => {
        setActiveObjects(prev => [...prev, {...Object, id: `${Object.name}_${crypto.randomUUID()}`}]);
      };

    const deleteFromActive = (elId) => {
        let aO=[];
        aO = activeObjects.filter(object=>!(object.id===elId)).map(object=>object)
        setActiveObjects(aO);
      };
    
    const handleForm=(e)=>{
      let aO=activeObjects;
      const id=e.target.id;
   ;
      const value=e.target.value;
      aO = activeObjects.map(object=>{
        if (!(id===object.id)){    console.log("TRUE:  id from target: ",id, "id from object", object.id)
          return (object)
        }else{  console.log("FALSE:  id from target: ",id, "id from object", object.id)
          const alteredObject=object;
          alteredObject.elements[0].size=value/100;
          return (alteredObject)
        }});
      setActiveObjects(aO);
    };

    return (

    <>
      {activeObjects.length>0 && activeObjects.map((activeObject,it)=>{
          return <div key={it}  className="">
                      <div className='border border-slate-800 bg-gray-950 rounded m-px' >  {/* onMouseLeave={()=>{setselected(NaN)} */}

                        <div className='flex flex-wrap content-end items-end justify-end'>

                          <div onClick={()=>{setSelected(activeObject.id)}}  className='cursor-pointer grow flex'>
                            <img className="  block w-5 h-5 text-xs"src={`${activeObject.thumbnail}`} alt="img" />
                            <p className='block mx-1 text-gray-400 h-min'>{activeObject.name}</p>
                          </div>

                          <div className="flex content-end">
                            <button onClick={()=>addToActive(activeObject)} className='m-px border outline outline-1 outline-black border-gray-900 hover:border-gray-950 bg-gray-950  hover:bg-gray-black rounded px-1 h-'>
                            <p className='text-gray-700 hover:translate-y-px'>copy 🧱</p>  </button>
                            <button onClick={()=>deleteFromActive(activeObject.id)}  className='m-px border outline outline-1 outline-black border-gray-900 hover:border-gray-950 bg-gray-950  hover:bg-gray-black rounded px-1 h-'>
                            <p className='text-gray-700 hover:translate-y-px'>delete 🗑️</p>  </button>
                           </div>

                        </div>

                      {selected===activeObject.id && 
                        <div className='px-1'>
                        <p>x: {activeObject.position.rx.toFixed(3)} y: {activeObject.position.ry.toFixed(3)}</p>

                        {activeObject.controls && Object.keys(activeObject.controls).map((x,index)=>{ 
                          console.log("called", activeObject.name);
                          return (

                            <div key={index}
                              className=" block text-white mix-blend-screen cursor-grab"  
                              style={{
                                backgroundColor:"transparent",
                                                      }}
                            >                            
                            <form >
                              <label form="size">Size: </label>
                              <input type={x} value={activeObject.controls.x} id={activeObject.id} onChange={(e)=>handleForm(e)} min="0" max="100"/>
                            </form> 
                            <p>size: {activeObject.elements[0].size}</p>

                          </div>
                          

                          )
                        })}


                        </div>
                      }
                      </div>

              </div>
      })}


    
    </>
  )
}
