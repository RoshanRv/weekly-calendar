import { FiSearch } from "react-icons/fi"

const Menubar = () => {
    return (
        <nav className="flex items center justify-between border-b borde-gray-500 py-6  bg-white mx-10">
            {/* left */}
            <div className="flex gap-12 font-">
                <h1 className="text-gray-500 px-4 py-2 transition-all rounded-md cursor-pointer hover:bg-pri-light ">
                    Project Planning
                </h1>
                <h1 className="px-4 py-2 cursor-pointer rounded-md bg-pri-light">
                    Weekly Planning
                </h1>
                <h1 className="text-gray-500 px-4 py-2 transition-all rounded-md cursor-pointer hover:bg-pri-light  ">
                    Weekly Insights
                </h1>
            </div>
            {/* right -search */}
            <div className="rounded-full p-2  px-3 items-center flex border border-gray-300 text-gray-400  gap-4">
                <FiSearch className="text-xl" />
                <input
                    type="text"
                    placeholder="Search for projects"
                    className="text-sm w-64 placeholder:text-gray-300 outline-0"
                />
            </div>
        </nav>
    )
}

export default Menubar
