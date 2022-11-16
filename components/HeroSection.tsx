
const HeroSection = ({children} : any) => {
  return (
    <div className=" bg-amber-400 h-128 flex justify-around items-center px-6 lg:px-36 border-b border-black">
        <div className="w-full md:w-5/6 lg:w-8/12 space-y-10 font-sans">
            <h1 className="text-7xl font-serif">Stay curious.</h1>
            <p className="text-2xl font-medium text-gray-800 w-full lg:w-4/6">Discover stories, thinking, and expertise from writers on any topic.</p>
            <h3 className="text-white bg-black rounded-full px-12 py-2 hover:bg-transparent hover:bg-gray-900 cursor-pointer w-max text-xl">Start reading</h3>
        </div>
        <div className='hidden md:inline-flex md:h-48 lg:h-full w-3/12 md:w-4/12'>
            <img src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" />
        </div>
    </div>
  )
}

export default HeroSection