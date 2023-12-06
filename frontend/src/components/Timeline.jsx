import { useState, useEffect } from 'react';

export const Timeline = ({
  activeScenes,
  setActiveScenes,
  selectedScene,
  setSelectedScene,
  activeObjects,
  setActiveObjects,
  generateThumbnail,
}) => {
  const [selectedPosition, setSelectedPosition] = useState(0);

  //If the selected Scene changes, the active Objects are changed
  useEffect(() => {
    activeScenes[selectedPosition]
      ? setActiveObjects(activeScenes[selectedPosition].aOs)
      : console.error('activeScenes[selectedPosition]is falsy');
  }, [selectedScene]);

  //from element properties on the DOM to State.
  const handleSceneClick = (e) => {
    setActiveObjects(
      activeScenes.find((scene) => scene.id === e.target.id).aOs
    );
    setSelectedScene(e.target.id);
    setSelectedPosition(+e.target.dataset.position);
  };

  const addScene = async () => {
    try {
      const newId = crypto.randomUUID();
      const dataUrl = await generateThumbnail();
      setActiveScenes((prev) => [
        ...prev,
        {
          name: 'New Scene',
          thumbnail: dataUrl,
          aOs: activeObjects,
          id: `${newId}`,
        },
      ]);
      setSelectedScene(newId);
    } catch (error) {
      console.error('Error adding a scene', error);
    }
  };

  const deleteScene = async (e) => {
    try {
      const newId = crypto.randomUUID();

      const findSceneI = activeScenes.findIndex(
        (scene) => scene.id === e.target.id
      );

      const aS = activeScenes.filter((scene) => {
        return !(scene.id === e.target.id);
      });
      // .map((scene) => scene);

      if (aS.length < 1) {
        const dataUrl = await generateThumbnail();
        setActiveScenes([
          {
            name: 'New Scene',
            thumbnail: dataUrl,
            aOs: activeObjects,
            id: `${newId}`,
          },
        ]);
      }

      if (aS.length === 1) {
        setSelectedScene(newId);
        setSelectedPosition(0);
      }

      setSelectedScene(activeScenes[findSceneI - 1].id);
      setActiveScenes(aS);
    } catch (error) {
      console.error('Error deleting a scene', error);
    }
  };

  return (
    <div className='fixed flex left-[30%] w-[70%] top-[70%] h-[30%] bg-black p-1 pt-0'>
      <div className='grow flex flex-col border-2 p-1 rounded       border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 text-gray-300'>
        <h1 className='text-gray-600'>Scenes in this Show</h1>
        <div className='h-full max-h-full flex flex-row items-center first-letter:border-2 border-gray-950 bg-black rounded-lg p-3  text-gray-300 overflow-hidden '>
          {activeScenes.length > 0 &&
            activeScenes.map((scene, iterator) => {
              return (
                <div
                  key={scene.id}
                  className='h-full shrink items-center h-max-full flex flex-col border rounded m-px p-2 border-slate-800  bg-gradient-to-b from-gray-950 to-gray-900 w-64'
                  style={{
                    borderColor:
                      scene.id === selectedScene ? 'yellow' : 'black',
                  }}
                >
                  <div
                    className='shrink grow border border-black bg-black overflow-hidden cursor-pointer'
                    onClick={handleSceneClick}
                    id={scene.id} // remove either this id or the one of the image.
                    data-position={iterator}
                  >
                    {' '}
                    <img
                      id={scene.id}
                      data-position={iterator}
                      className='border border-px border-yellow-400 object-contain object-center'
                      src={scene.thumbnail}
                      alt='img'
                    />{' '}
                  </div>
                  <h2
                    className='shrink-0 text-md truncate text-ellipsis cursor-pointer hover:rotate-[360deg] duration-1000'
                    data-position={iterator}
                    onClick={handleSceneClick}
                    id={scene.id}
                  >
                    {iterator + 1}: {scene.name}
                  </h2>
                  <button
                    className='cursor-pointer'
                    onClick={deleteScene}
                    id={scene.id}
                  >
                    delete
                  </button>
                </div>
              );
            })}

          <div
            className='h-full shrink items-center h-max-full flex flex-col border rounded m-px p-2    border-slate-800  bg-gradient-to-b from-gray-950 to-gray-900 w-64 hover:cursor-pointer'
            onClick={addScene}
          >
            <div className='flex justify-center content-center items-center shrink grow border border-black bg-black  w-full overflow-hidden text-7xl '>
              <p>➕</p>
            </div>
            <h2 className='shrink-0 text-md truncate text-ellipsis '>
              Add Scene
            </h2>
          </div>
        </div>
      </div>
  {/*   {KeyPressElement} */}
    </div>
  );
};