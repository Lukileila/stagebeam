
import { useRef, useEffect } from 'react';

export const Modal = ({ setOpenModal }) => {
  const dialogRef = useRef();

  const saveScene = () => {
    // request to the database goes in here
  };

  useEffect(() => {
    dialogRef.current.showModal();
    return () => dialogRef.current?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className='fixed top-[10vh] left-[30vh] translate-x-[-50%] translate-y-[-50%] z-10 p-6 rounded bg-yellow-500 flex flex-col items-center gap-4 backdrop:bg-[rgba(0, 0, 0, 1)]'
    >
      <label htmlFor='showname' className='text-center font-semibold'>
        Add your scene name
      </label>
      <input
        id='showname'
        placeholder='Add show name'
        className='rounded py-1 px-2'
        autoFocus
      />
      <div className='flex gap-4'>
        <button
          className='text-bold p-2 bg-black text-yellow-500 font-semibold rounded w-fit block'
          onClick={() => {
            setOpenModal(false);
            dialogRef.current.close();
          }}
        >
          Cancel
        </button>
        <button
          onClick={saveScene}
          className='text-bold p-2 bg-black text-yellow-500 font-semibold rounded w-fit block'
        >
          Save scene
        </button>
      </div>
    </dialog>
  );
};
