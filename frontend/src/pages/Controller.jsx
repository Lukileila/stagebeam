//This is the main app page. This file returns all the important components.

import { ObjectsMenu } from "../components/ObjectsMenu"
import { Timeline } from "../components/Timeline"
import { Workspace } from "../components/Workspace"
import { useEffect, useState } from "react";
import objectTemplates from "../data/objectTemplates.json"
import sceneTemplates from "../data/sceneTemplates.json"

export const Controller = () => {

  const [templateObjects, setTemplateObjects] = useState([]);

  const [activeObjects, setActiveObjects] = useState( 
    !localStorage.getItem('activeObjects')?[]:                    //Creates the State, loads from localStorage. If activeObjects doesn't exist yet on local Storage, an empty array is written.
    JSON.parse(localStorage.getItem('activeObjects') )) 

  const [activeScenes, setActiveScenes] = useState( 
    !localStorage.getItem('activeScenes')?sceneTemplates:
    JSON.parse(localStorage.getItem('activeScenes') ));

  const [selected, setSelected] = useState(NaN);                  //Selected Object, mostly for expanding it on the menu
  const [selectedScene, setSelectedScene] = useState(0);

      //copying active Objects to Scene
   useEffect(() => {
    console.log("copy aO to aS fired");
    let newAS = activeScenes.map(scene => scene.id === selectedScene ? {...scene, aOs:activeObjects} : scene);
    console.log("newAS",newAS)
    setActiveScenes(newAS);
  }, [activeObjects]); 

  //Loading Palette Objects from file to State. Might as well not have a state since palette Objects don't change right now.
  useEffect(() => { setTemplateObjects(objectTemplates); }, []); 

 // Copying from file to state this is only for testing purposes!! Activate to write fake User data to localstorage! Don't forget to comment it out after loading!
  /*  useEffect(() => { setActiveScenes(sceneTemplates); }, []);    */

  // LOCALSTORAGE interaction lives here:
  // Copying states to localstorage
  useEffect(() => {console.log("activeObjects",activeObjects);  localStorage.setItem('activeObjects',JSON.stringify(activeObjects)); }, [activeObjects]);
  useEffect(() => {console.log("activeScenes",activeScenes);    localStorage.setItem('activeScenes',JSON.stringify(activeScenes)); },   [activeScenes]);

  //Maybe change overall layout to grid at some point
  return (
    <>
        <ObjectsMenu  activeObjects={activeObjects} setActiveObjects={setActiveObjects}  templateObjects={templateObjects} selected={selected} setSelected={setSelected}/>
        <Timeline     activeObjects={activeObjects} setActiveObjects={setActiveObjects}  activeScenes={activeScenes} setActiveScenes={setActiveScenes} selectedScene={selectedScene} setSelectedScene={setSelectedScene}/>
        <Workspace    activeObjects={activeObjects} setActiveObjects={setActiveObjects}  selected={selected} setSelected={setSelected}  /> {/*  order matters for overlap, ignoring the set z-index. Yes. Really. I hate it as well. /LZ */}
    </>
  )
}
