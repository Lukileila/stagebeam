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
      const value=e.target.value;
      const property=e.target.dataset.property;
      aO = activeObjects.map(object=>{

        if (!(id===object.id)){  //checks, whether it is the Object which is to be altered
          return (object)         //returns unaltered Object, if it is not the Object to be altered

        }else{

          const alteredObject=object;

          alteredObject[property]=e.target.dataset.type==="range"?(value/100):value;

   /*        console.log("hippety, hoppety, this is the property:",property) */
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

                        {activeObject.controls && activeObject.controls.map((x,index)=>{ 


                          let newValue = x.type === "range" ? (activeObject[x.property]*100):activeObject[x.property];
                          return (
                            <div key={index}
                              className=" block text-white" style={{ backgroundColor:"transparent"}}n> 

                              <input type={x.type} value={newValue} id={activeObject.id} data-property={x.property} data-type={x.type} min="0" max="100" onChange={(e)=>handleForm(e)}/>

                            <p>{x.label} {activeObject[x.property]}</p>
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
