import { IoMdArrowDropdown } from "react-icons/io"
import { BiCategory } from "react-icons/bi"
import { TbEdit } from "react-icons/tb"
import { HiOutlineDocumentText } from "react-icons/hi"
import { FiSearch } from "react-icons/fi"
import { LuBell } from "react-icons/lu"

const Header = () => {
    return (
        <header className="flex items-center justify-between px-10 py-3 shadow-lg  sticky top-0 bg-white ">
            {/*  Left*/}
            <div className="flex flex-col gap-1">
                <div className="flex items-center">
                    <h1 className="font-ligh">Educator</h1>
                    <IoMdArrowDropdown />
                </div>
                <p className="text-gray-600 text-xs">Arthshala</p>
            </div>
            {/* Center */}
            <div className="flex items-center gap-1">
                <div className="flex items-center gap-2 cursor-pointer   transition-all px-4  border-b-2 py-2 border-pri-dark">
                    <BiCategory />
                    <h1 className="font-">Planning</h1>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-pri-light rounded-md transition-all px-4 py-2">
                    <TbEdit />
                    <h1 className="font-">Documentation</h1>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-pri-light rounded-md transition-all px-4 py-2">
                    <HiOutlineDocumentText />
                    <h1 className="font-">Housekeeping</h1>
                </div>
            </div>
            {/* Right */}
            <div className="flex items-center gap-x-4 text-xl">
                <FiSearch />
                <LuBell />
                <img
                    className="w-16 h-16 rounded-full"
                    src={
                        "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                    }
                    alt=""
                />
                <IoMdArrowDropdown className="-ml-4" />
            </div>
        </header>
    )
}

export default Header
