export const ActiveCard = ({templateObjects, setTemplateObjects, activeObjects, setActiveObjects}) => {


    const addToActive = (Object) => {
        setActiveObjects(prev => [...prev, {...Object, id: `${Object.name}_${crypto.randomUUID()}`}]);
      };

    const deleteFromActive = (e, elId) => {
        let aO=[];
        aO = activeObjects.filter(object=>!(object.id===elId)).map(object=>object)
        setActiveObjects(aO);
      };

    return (

    



    <>


      {activeObjects.length>0 && activeObjects.map((activeObject,it)=>{
          return <div key={it}  className="cursor-pointer">
                      <div className='flex justify-between border border-slate-800 bg-gray-950 rounded m-px'>
                        <div className='flex'>
                          <img className="w-5 h-5"src={`${activeObject.thumbnail}`} alt="img" />
                          <p className='text-xs truncate text-ellipsis '>{activeObject.name}</p>
                        </div>

                        <div>
                          <button onClick={()=>addToActive(activeObject)} className='m-px border outline outline-1 outline-black border-gray-900 hover:border-gray-950 bg-gray-950  hover:bg-gray-black rounded px-1 h-'>
                          <p className='text-gray-700 hover:translate-y-px'>copy 🧱</p>  </button>
                          <button onClick={(e)=>deleteFromActive(e, activeObject.id)}  className='m-px border outline outline-1 outline-black border-gray-900 hover:border-gray-950 bg-gray-950  hover:bg-gray-black rounded px-1 h-'>
                          <p className='text-gray-700 hover:translate-y-px'>delete 🗑️</p>  </button>
                      </div>
                      </div>
              </div>
      })}


    
    </>
  )
}
