import { useState } from "react"
import { IoMdClose } from "react-icons/io"
import { LuTrash } from "react-icons/lu"
import { AiOutlineClockCircle } from "react-icons/ai"
import { RxCalendar } from "react-icons/rx"
import { CgAddR } from "react-icons/cg"
import { BsCheck2 } from "react-icons/bs"
import TimeDialog from "./TimeDialog"
import MiniCal from "./MiniCal"
import { Period } from "../App"

interface Props {
    setShowModal: (show: boolean) => void
    setPeriods: React.Dispatch<React.SetStateAction<Period[]>>
}

const Modal = ({ setShowModal, setPeriods }: Props) => {
    const [name, setName] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [repeatOn, setRepeatOn] = useState<number[]>([])
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [color, setColor] = useState<string>("bg-pink-100")

    const [showTimeModal, setShowTimeModal] = useState(0)
    const [showCalModal, setShowCalModal] = useState(false)

    return (
        <main className="fixed flex justify-center  h-full w-full bg-black/30 backdrop-blur-sm font-disp top-0 left-0">
            {/* Modal */}
            <div className="p-6 shadow-md bg-white rounded-lg mt-12 h-max flex flex-col gap-y-3">
                <div className="flex  justify-between items-center">
                    <h1 className="font-semibold text-xl">Add Period</h1>
                    <button onClick={() => setShowModal(false)}>
                        <IoMdClose className="text-3xl" />
                    </button>
                </div>
                {/* name */}
                <div>
                    <p className="font-semibold py-2">Period Name</p>
                    <input
                        type="text"
                        className="p-3 rounded-lg border-2 border-gray-300 text-lg w-full outline-0"
                        placeholder="Enter Period Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {/* start - end */}
                <div className="flex gap-4 ">
                    <div className="relative">
                        <p className="font-semibold py-2">Start Time</p>
                        <div
                            onClick={() => setShowTimeModal((e) => (e ? 0 : 1))}
                            className="flex gap-x-4 items-center p-3 rounded-lg border-2 border-gray-300 text-lg w-full"
                        >
                            <AiOutlineClockCircle className="text-xl" />
                            <input
                                value={startTime}
                                readOnly
                                type="text"
                                className="outline-0 cursor-pointer"
                                placeholder="Enter Start Time"
                            />
                        </div>
                        {showTimeModal === 1 && (
                            <TimeDialog
                                setModal={setShowTimeModal}
                                setTime={setStartTime}
                                time={startTime}
                            />
                        )}
                    </div>
                    <div className="relative">
                        <p className="font-semibold py-2">End Time</p>
                        <div
                            onClick={() => setShowTimeModal((e) => (e ? 0 : 2))}
                            className="flex gap-x-4 items-center p-3 rounded-lg border-2 border-gray-300 text-lg w-full"
                        >
                            <AiOutlineClockCircle className="text-xl" />
                            <input
                                value={endTime}
                                readOnly
                                type="text"
                                className="outline-0 cursor-pointer"
                                placeholder="Enter End Time"
                            />
                        </div>
                        {showTimeModal === 2 && (
                            <TimeDialog
                                setModal={setShowTimeModal}
                                setTime={setEndTime}
                                time={endTime}
                            />
                        )}
                    </div>
                </div>
                {/* Repeat on  */}
                <div>
                    <p className="font-semibold py-2">Repeat on days</p>
                    <div className="flex gap-3">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    let repeats = [...repeatOn]

                                    repeats.find((num) => num === i) !=
                                    undefined
                                        ? (repeats = repeats.filter(
                                              (num) => num !== i
                                          ))
                                        : repeats.push(i)

                                    setRepeatOn(repeats)
                                }}
                                className={`p-2 px-4  transition-all rounded-full ${
                                    repeatOn.find((num) => num === i) !=
                                    undefined
                                        ? "bg-pri-dark text-white"
                                        : "bg-gray-200 hover:bg-pri-light "
                                }  `}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
                {/* from - to  */}
                <div>
                    <p className="font-semibold py-2">From</p>
                    <div className="flex gap-x-4 items-center p-3 relative rounded-lg border-2 border-gray-300 text-lg w-full">
                        <RxCalendar className="text-xl" />
                        <input
                            onClick={() => setShowCalModal((e) => !e)}
                            type="text"
                            className=" cursor-pointer outline-0 w-full"
                            value={`${
                                from
                                    ? new Date(from).toDateString().slice(4) +
                                      " - "
                                    : ""
                            }${to ? new Date(to).toDateString().slice(4) : ""}`}
                            readOnly
                            placeholder="Enter From - To"
                        />
                        {/* 2-Cal */}
                        {showCalModal && (
                            <div className="grid grid-cols-2 p-2 rounded-lg bg-white  shadow-xl border border-gray-300 translate-y-1 left-0 items-center absolute w-full top-full divide-x-2 divide-gray-300 ">
                                <MiniCal
                                    fromDate={from}
                                    setDate={setFrom}
                                    endDate={to}
                                    type="from"
                                    setModal={setShowCalModal}
                                />
                                <MiniCal
                                    endDate={to}
                                    setDate={setTo}
                                    fromDate={from}
                                    type="end"
                                    setModal={setShowCalModal}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* color and add */}
                <div className="flex justify-between items-center mt-4">
                    {/* Colors */}
                    <div className="flex gap-4 ">
                        {[
                            "bg-pink-100",
                            "bg-indigo-100",
                            "bg-yellow-100",
                            "bg-emerald-100",
                        ].map((col, i) => (
                            <div
                                onClick={() => setColor(col)}
                                key={i}
                                className={`h-8 w-8 rounded-full flex justify-center items-center ${col} cursor-pointer `}
                            >
                                {color === col && <BsCheck2 />}
                            </div>
                        ))}
                    </div>
                    {/* trash ,  */}
                    <div className="flex gap-4">
                        <button onClick={() => setShowModal(false)}>
                            <LuTrash className="text-2xl text-gray-500 hover:text-red-400 transition-all cursor-pointer " />
                        </button>
                        {/* btn */}
                        <button
                            onClick={() => {
                                setShowModal(false)
                                const period = {
                                    name,
                                    startTime,
                                    endTime,
                                    repeatOn,
                                    from,
                                    to,
                                    color,
                                }

                                setPeriods((e) => [...e, period])
                            }}
                            className=" bg-pri-dark px-8 py-3 items-center text-white  rounded-full flex gap-x-3 font-light hover:bg-pri-light transition-all hover:text-pri-dark duration-500 "
                        >
                            <CgAddR className="text-lg" />
                            <h1>Add Period</h1>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Modal
