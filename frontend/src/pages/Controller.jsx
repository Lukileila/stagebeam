//This is the main app page. This file returns all the important components.

import { ObjectsMenu } from "../components/ObjectsMenu"
import { Timeline } from "../components/Timeline"
import { Workspace } from "../components/Workspace"
import { useEffect, useState } from "react";
import objectTemplates from "../data/objectTemplates.json"



export const Controller = () => {

  // Active Objects: They are aaaaaaaall going to live here:
  const [templateObjects, setTemplateObjects] = useState([]);
  const [activeObjects, setActiveObjects] = useState([]);
  useEffect(() => { setTemplateObjects(objectTemplates) }, []);

  return (
    <>
        <ObjectsMenu  activeObjects={activeObjects} setActiveObjects={setActiveObjects}  templateObjects={templateObjects} setTemplateObjects={setTemplateObjects}  />
        <Timeline/>
        <Workspace    activeObjects={activeObjects} setActiveObjects={setActiveObjects}   /> {/*  order matters for overlap, ignoring the set z-index. Yes. Really. I hate it as well. /LZ */}
    </>
          )
}
