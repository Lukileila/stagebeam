import React from 'react'

export const Timeline = () => {
  return (
    <div className='fixed left-[30%] w-[70%] top-[70%] h-[30%] bg-black p-1'>
      <div className='w-full h-full border-2 border-gray-800 p-1 bg-gradient-to-t from-gray-950 to-gray-900 rounded text-gray-600'> Timeline</div>

      <div className='grow flex flex-col border-2 my-1 border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 rounded p-1  text-gray-300 z-0'> 
          <h1 className='text-gray-600'>Objects Palette</h1>
          <div className='grow border-2 my-1 border-gray-950 bg-black rounded-lg p-1  text-gray-300 z-0'> 
              <h3 className="text-gray-300 text-sm">Lights ⮟</h3>
              <div className='grow flex flex-row flex-wrap justify-start content-start'>
              </div>
          </div>
        </div>
    </div>
  )
}
