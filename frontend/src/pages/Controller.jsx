//This is the main app page. This file returns all the important components.

import { ObjectsMenu } from "../components/ObjectsMenu"
import { Timeline } from "../components/Timeline"
import { Workspace } from "../components/Workspace"
import { useEffect, useState } from "react";
import objectTemplates from "../data/objectTemplates.json"



export const Controller = () => {

  // Active Objects: They are aaaaaaaall going to live here:
  const [templateObjects, setTemplateObjects] = useState([]);
  const [activeObjects, setActiveObjects] = useState([
    JSON.parse(localStorage.getItem('activeObjects') ?? [])
    ]);

  // Copying from file to state:
  useEffect(() => { setTemplateObjects(objectTemplates) }, []);

  // Copying localstorage to state once:
  useEffect(()=>{ 
    const aOstring= localStorage.getItem('activeObjects') ?? [];
    const aOparsed= JSON.parse(aOstring);
    setActiveObjects(aOparsed);},[]);

  // Copying state to localstorage
  useEffect(() => { localStorage.setItem('activeObjects',JSON.stringify(activeObjects)); }, [activeObjects]);

  return (
    <>
        <ObjectsMenu  activeObjects={activeObjects} setActiveObjects={setActiveObjects}  templateObjects={templateObjects} />
        <Timeline/>
        <Workspace    activeObjects={activeObjects} setActiveObjects={setActiveObjects}   /> {/*  order matters for overlap, ignoring the set z-index. Yes. Really. I hate it as well. /LZ */}
    </>
          )
}
