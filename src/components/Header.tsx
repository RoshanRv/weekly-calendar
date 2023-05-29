import { IoMdArrowDropdown } from "react-icons/io"
import { BiCategory } from "react-icons/bi"
import { TbEdit } from "react-icons/tb"
import { HiOutlineDocumentText } from "react-icons/hi"
import { FiSearch } from "react-icons/fi"
import { LuBell } from "react-icons/lu"

const Header = () => {
    return (
        <header className="flex items-center justify-between px-10 py-3 shadow-lg  ">
            {/*  Left*/}
            <div className="flex flex-col gap-1">
                <div className="flex items-center">
                    <h1 className="font-light">Educator</h1>
                    <IoMdArrowDropdown />
                </div>
                <p className="text-gray-600 text-xs">Arthshala</p>
            </div>
            {/* Center */}
            <div className="flex items-center gap-1">
                <div className="flex items-center gap-2 cursor-pointer   transition-all px-4  border-b-2 py-1 border-blue-500">
                    <BiCategory />
                    <h1 className="font-light">Planning</h1>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-blue-200 rounded-md transition-all px-4 py-1">
                    <TbEdit />
                    <h1 className="font-light">Documentation</h1>
                </div>
                <div className="flex items-center gap-2 cursor-pointer hover:bg-blue-200 rounded-md transition-all px-4 py-1">
                    <HiOutlineDocumentText />
                    <h1 className="font-light">Housekeeping</h1>
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
