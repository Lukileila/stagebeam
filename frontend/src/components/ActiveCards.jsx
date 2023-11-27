import {useState, useEffect} from 'react';

export const ActiveCards = ({templateObjects, setTemplateObjects, activeObjects, setActiveObjects}) => {

    const [expanded, setExpanded] = useState(NaN);

    const addToActive = (Object) => {
        setActiveObjects(prev => [...prev, {...Object, id: `${Object.name}_${crypto.randomUUID()}`}]);
      };

    const deleteFromActive = (elId) => {
        let aO=[];
        aO = activeObjects.filter(object=>!(object.id===elId)).map(object=>object)
        setActiveObjects(aO);
      };
    
    useEffect(()=>console.log("expanded",expanded),[expanded])

    return (

    <>
      {activeObjects.length>0 && activeObjects.map((activeObject,it)=>{
          return <div key={it}  className="">
                      <div className='border border-slate-800 bg-gray-950 rounded m-px' onMouseLeave={()=>{setExpanded(NaN)}}>

                        <div className=' flex flex-wrap content-end items-end justify-end'>

                          <div onClick={()=>{setExpanded(activeObject.id)}}  className='cursor-pointer grow flex'>
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

                      {expanded===activeObject.id && 
                        <p>x: {activeObject.position.rx.toFixed(3)} y: {activeObject.position.ry.toFixed(3)}</p>
                      }
                      </div>

              </div>
      })}


    
    </>
  )
}
