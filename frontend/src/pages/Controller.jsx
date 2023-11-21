//This is the main app page. This file returns all the important components.

import { ObjectsMenu } from "../components/ObjectsMenu"
import { Timeline } from "../components/Timeline"
import { Workspace } from "../components/Workspace"
import { useEffect, useState } from "react";
import templateObjects from "../data/objectTemplates.json"



export const Controller = () => {

  // Active Objects: They are aaaaaaaall going to live here:
  const [activeObjects, setActiveObjects] = useState(/* templateObjects.json() */);

  useEffect(() => { console.log(templateObjects) }, []);

  return (
    <>
        <ObjectsMenu activeObjects={activeObjects} setActiveObjects={setActiveObjects}/>
        <Timeline/>
        <Workspace activeObjects={activeObjects} setActiveObjects={setActiveObjects}/> {/*  order matters for overlap, ignoring the set z-index. Yes. Really. I hate it as well. /LZ */}
    </>
          )
}
