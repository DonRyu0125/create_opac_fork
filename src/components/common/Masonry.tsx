const Masonry = () => {
  return (
    <div className='w-full masonry sm:masonry-sm md:masonry-md column-gap-4'>
      <div className='rounded-lg h-24 bg-gray-500 p-4 break-inside'>
        <p> lorem100 </p>
      </div>
      <div className='rounded-lg h-72 bg-gray-500 p-4 break-inside'>
        <p> lorem150 </p>
      </div>
      <div className='rounded-lg h-35 bg-gray-500 p-4 break-inside'>
        <p> lorem50 </p>
      </div>
      <div className='rounded-lg h-48 bg-gray-500 p-4 break-inside'>
        <p> lorem200 </p>
      </div>
      <div className='rounded-lg h-54 bg-gray-500 p-4 break-inside'>
        <p> lorem100 </p>
      </div>
      <div className='rounded-lg h-40 bg-gray-500 p-4 break-inside'>
        <p> lorem150 </p>
      </div>
      <div className='rounded-lg bg-gray-500 p-4 break-inside'>
        <p> lorem50 </p>
      </div>
      <div className='rounded-lg bg-gray-500 p-4 break-inside'>
        <p> lorem200 </p>
      </div>
    </div>
  );
};

export default Masonry;
