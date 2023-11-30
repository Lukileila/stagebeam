import React from 'react'

export const Timeline = () => {
  return (
    <div className='fixed flex left-[30%] w-[70%] top-[70%] h-[30%] bg-black p-1 pt-0'>



      <div className='grow flex flex-col border-2 p-1 rounded       border-gray-800 bg-gradient-to-t from-gray-950 to-gray-900 text-gray-300'> 
        <h1 className='text-gray-600'>Timeline</h1>
        <div className='h-full max-h-full flex flex-row items-center first-letter:border-2 border-gray-950 bg-black rounded-lg p-3  text-gray-300 overflow-hidden '> 
                                <div className='h-full shrink items-center h-max-full flex flex-col border rounded m-px p-2    border-slate-800  bg-gradient-to-b from-gray-950 to-gray-900 w-64'>

                                    <div className="shrink grow border border-black bg-black   overflow-hidden "><img  className="object-contain object-center" src="https://placehold.co/600x400" alt="img" /></div>
                                    <h2 className='shrink-0 text-md truncate text-ellipsis '>Scene 1</h2>

                                </div>
                                <p className="text-3xl text-gray-400">➞</p>
                                <div className='h-full shrink items-center h-max-full flex flex-col border rounded m-px p-2    border-slate-800  bg-gradient-to-b from-gray-950 to-gray-900 w-64'>

                                                <div className="shrink grow border border-black bg-black  overflow-hidden "><img  className="object-contain object-center" src="https://placehold.co/600x400" alt="img" /></div>
                                                <h2 className='shrink-0 text-md truncate text-ellipsis '>Scene 1</h2>

                                                </div>
                                                <p className="text-3xl text-gray-400">➞</p>
                                                <div className='h-full shrink items-center h-max-full flex flex-col border rounded m-px p-2    border-slate-800  bg-gradient-to-b from-gray-950 to-gray-900 w-64'>

                                                <div className="shrink grow border border-black bg-black   overflow-hidden "><img  className="object-contain object-center" src="https://placehold.co/600x400" alt="img" /></div>
                                                <h2 className='shrink-0 text-md truncate text-ellipsis '>Scene 1</h2>

                                                </div>

                                                <p className="text-3xl text-gray-400">➞</p>
                                                <div className='h-full shrink items-center h-max-full flex flex-col border rounded m-px p-2    border-slate-800  bg-gradient-to-b from-gray-950 to-gray-900 w-64'>

                                                <div className="flex justify-center content-center items-center shrink grow border border-black bg-black  w-full overflow-hidden text-7xl "><p >➕</p></div>
                                                <h2 className='shrink-0 text-md truncate text-ellipsis '>Scene 1</h2>

                                                </div>

                                </div>

      </div>



    </div>

  )
  
}
