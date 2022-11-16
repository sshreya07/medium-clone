import Link from "next/link"

const Nav = () => {
return (
    <div>
        <nav className="fixed bg-amber-400 will-change-scroll scroll-m-10 w-full items-center p-4 border-b border-black">
            <div className="max-w-7xl flex justify-between mx-auto">
                <div className="flex space-x-5">
                <Link href="/">
                    <img className="w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" alt="medium Icon" />
                </Link>
                <div className="hidden md:inline-flex space-x-5 items-center">
                    <Link href="/about"><h3>About</h3></Link>
                    <h3>Contact</h3>
                    <h3 className="text-white bg-green-600 rounded-full px-4 py-1 hover:bg-transparent hover:text-green-600 hover:border-2 border-green-600 cursor-pointer" >Follow</h3>
                </div>
            </div>
            <div className="w-6/12 flex justify-end text-black space-x-5 items-center">
                <h3>Sign In</h3>
                <h3 className="rounded-full px-4 py-1 border border-black bg-black text-white cursor-pointer">Get Started</h3>
            </div>
            </div>
        </nav>
    </div>
)
}

export default Nav