import React from 'react';
import domtoimage from 'dom-to-image';
import {useState, useEffect} from 'react';




export const Timeline = ({activeScenes, setActiveScenes, selectedScene, setSelectedScene, activeObjects, setActiveObjects}) => {

  const [imageDataUrl,setImageDataUrl]=useState("");
  const [selectedPosition, setSelectedPosition]=useState(0);
 
  //If the selected Scene changes, the active Objects are changed
  useEffect(()=>{
    const p = Number(selectedPosition);
    activeScenes[p]? setActiveObjects(activeScenes[p].aOs) : console.error("activeScenes[p]is falsy");
  }, [selectedScene]); 

  //copying active Objects to Scene
  useEffect(() => {
    let newAS = [];
    newAS = activeScenes.map(scene => scene.id === selectedScene ? {...scene, aOs:activeObjects} : scene)
    setActiveScenes(newAS);
  }, [activeObjects]);


  //Calls the thumbnail maker, whenever active Objects are altered. Could probably be turned into its own component
                  useEffect(()=>{paintScene()},[activeObjects]);

                  var node = document.getElementById('canVas');

                  const paintScene = ()=>{
                  
                    domtoimage.toPng(node)
                    .then(function (dataUrl) {
                        setImageDataUrl(dataUrl);

                        let newAS = [];
                        newAS = activeScenes.map(scene => scene.id === selectedScene ? {...scene, thumbnail:dataUrl} : scene)
                        setActiveScenes(newAS);

                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                    });
                  }



  const handleSceneClick =(e) =>{ setSelectedScene(e.target.id); setSelectedPosition(e.target.dataset.position) }

  var activeObjectsTestdata = [
    {
      "templateId": 1,
      "name": "spotlight",
      "thumbnail": "https://images.ctfassets.net/vu8gu00g7wzj/6KcbZlBdfZjNksZlPxcrHl/47fc17619798e6d316a48d0b33f0688d/spotlight.png",
      "position": {
        "rx": 0.49379432624113473,
        "ry": 0.4193286361406014
      },
      "size": 0.3,
      "opacity": 0.9,
      "edgeHardness": 0.8,
      "color": "#ffffff",
      "controls": [
        {
          "type": "range",
          "property": "size",
          "label": "Size"
        },
        {
          "type": "range",
          "property": "opacity",
          "label": "Opacity"
        },
        {
          "type": "range",
          "property": "edgeHardness",
          "label": "edge Hardness"
        },
        {
          "type": "color",
          "property": "color",
          "label": "Color"
        }
      ],
      "elements": [
        {
          "css": {
            "backgroundColor": "#FFFEF5",
            "aspectRatio": "1",
            "borderRadius": "50%",
            "translate": "-50% -50%"
          },
          "size": 1
        }
      ],
      "id": "spotlight_3bcbc432-7e5b-436e-9d8d-5ad0dd6cf39b"
    }
  ]

  const addScene =() =>{
    const newId=crypto.randomUUID();
    setActiveScenes(prev => [...prev, {name:"New Scene", thumbnail:"https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg", aOs:activeObjectsTestdata, id: `${newId}`}]);
    setSelectedScene(newId);
  }

  const deleteScene =(e) =>{
    let aS=[];
    aS = activeScenes.filter(scene=>{!(scene.id===e.target.id)}).map(scene=>scene);
/*     aS.length<1 && addScene(); */
    setActiveScenes(aS);
  }

  return (
    <div className='fixed flex left-[30%] w-[70%] top-[70%] h-[30%] bg-black p-1 pt-0'>
 
      <div className='grow flex flex-col border-2 p-1 rounded       border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 text-gray-300'> 
        <h1 className='text-gray-600'>Scenes in this Show</h1>
        <div className='h-full max-h-full flex flex-row items-center first-letter:border-2 border-gray-950 bg-black rounded-lg p-3  text-gray-300 overflow-hidden '> 

          {activeScenes.length>0 && activeScenes.map((scene,iterator)=>{

            return (<>
                <div key={crypto.randomUUID()} className='h-full shrink items-center h-max-full flex flex-col border rounded m-px p-2 border-slate-800  bg-gradient-to-b from-gray-950 to-gray-900 w-64'
                    style={{
                      borderColor: scene.id === selectedScene ? "yellow": "black"
                    }}      
                >
                  <div className='shrink grow border border-black bg-black   overflow-hidden cursor-pointer'  onClick={handleSceneClick} id={scene.id}> <img id={scene.id} className="border border-px border-yellow-400 object-contain object-center" src={scene.thumbnail} data-position={iterator} alt="img" /> </div>
                  <h2 className='shrink-0 text-md truncate text-ellipsis cursor-pointer hover:rotate-[360deg] duration-1000' data-position={iterator} onClick={handleSceneClick} id={scene.id} >{iterator+1}: {scene.name}</h2>
                  <button className='cursor-pointer' onClick={deleteScene} id={scene.id} >delete</button>
                </div>
                <p className="text-3xl text-gray-400">➞</p>
             </>
            )})}

          <div className='h-full shrink items-center h-max-full flex flex-col border rounded m-px p-2    border-slate-800  bg-gradient-to-b from-gray-950 to-gray-900 w-64' onClick={addScene}>

              <div className="flex justify-center content-center items-center shrink grow border border-black bg-black  w-full overflow-hidden text-7xl "><p >➕</p></div>
              <h2 className='shrink-0 text-md truncate text-ellipsis '>Add Scene</h2>

          </div>




              </div>

          </div>

</div>





  )
  
}
