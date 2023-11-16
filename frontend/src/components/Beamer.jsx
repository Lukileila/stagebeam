export const Beamer = ({ spotlight }) => {
    return (
        <div className='bg-black h-[97vh] relative overflow-hidden border-2'>
        <h1 className='text-white text-xl'>I&apos;m just a beaaaaamer</h1>
        <div
            className='bg-amber-200 w-20 aspect-square rounded-full absolute -translate-x-[50%] -translate-y-[50%]'
            style={{
            top: spotlight.y + 'px',
            left: spotlight.x + 'px',
            }}
        ></div>
        </div>
    );
}