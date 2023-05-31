import { useEffect, useState } from "react"
import moment from "moment"
import type { Moment } from "moment"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { CgAddR } from "react-icons/cg"
import Modal from "../components/Modal"
import { Period } from "../App"

interface Props {
    periods: Period[]
    setPeriods: React.Dispatch<React.SetStateAction<Period[]>>
}

const Calendar = ({ periods, setPeriods }: Props) => {
    const [startOfWeek, setStartOfWeek] = useState<Moment>()
    const [endOfWeek, setEndOfWeek] = useState<Moment>()
    const [today, setToday] = useState<Moment>()
    const [oneWeek, setOneWeek] = useState<Moment[]>()
    const timeSlots = Array.from({ length: 24 }, (_, i) => i + 1)
    const [weekIndex, setWeekIndex] = useState(0)

    const [showModal, setShowModal] = useState(false)

    const rows = Array.from({ length: timeSlots.length }, (_, i) => i)
    const columns = Array.from({ length: 8 }, (_, i) => i)

    useEffect(() => {
        const start = moment().clone().add(weekIndex, "week").startOf("isoWeek")
        const end = moment().clone().add(weekIndex, "week").endOf("isoWeek")
        const days = []
        let day = start

        while (day <= end) {
            days.push(day)
            day = day.clone().add(1, "day")
        }

        setToday(moment())
        setStartOfWeek(start)
        setEndOfWeek(end)
        setOneWeek(days)
    }, [weekIndex])

    return (
        <div className="px-10 py-8 mt-[5.5rem] font-disp">
            {/* Calendar -  */}
            <section className="py-10 bg-white">
                {/*  */}
                <div className="flex items-center justify-between sticky top-[11.1rem] py-2 pb-10 bg-white ">
                    {/* Date Details */}
                    <div className="flex gap-4">
                        <h1 className="font-semibold text-lg capitalize">{`${startOfWeek?.format(
                            "MMMM"
                        )} ${startOfWeek?.format("DD")} - ${endOfWeek?.format(
                            "MMMM"
                        )} ${endOfWeek?.format("DD")}`}</h1>
                        <div className="flex items-center gap-x-1 ">
                            <BiChevronLeft
                                onClick={() => setWeekIndex((e) => e - 1)}
                                className="text-2xl cursor-pointer hover:text-pri-dark"
                            />
                            <h1
                                onClick={() => setWeekIndex(0)}
                                className="text-lg cursor-pointer hover:text-pri-dark"
                            >
                                Today
                            </h1>
                            <BiChevronRight
                                className="text-2xl cursor-pointer hover:text-pri-dark"
                                onClick={() => setWeekIndex((e) => e + 1)}
                            />
                        </div>
                    </div>
                    {/* Add Btn */}
                    <button
                        onClick={() => setShowModal(true)}
                        className=" bg-pri-dark px-8 py-3 items-center text-white  rounded-full flex gap-x-3 font-light hover:bg-pri-light transition-all hover:text-pri-dark duration-500 "
                    >
                        <CgAddR className="text-lg" />
                        <h1>Add Period</h1>
                    </button>
                </div>
                <div className="grid  divide-x divide-x-reverse divide-y divide-y-reverse  bg-white grid-cols-[repeat(8,auto)] g mt-10 border-b p-4 border-gray-300 divide-solid divie-x-2  divide-gray-300 ">
                    {/* weekly calendar header */}
                    {/* Placeholder Box */}
                    <div className=" sticky top-[17rem] pb-6 pt-2 bg-white border-b border-r border-gray-300"></div>
                    {oneWeek?.map((day, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-y-2 justify-center items-center  sticky top-[17rem] pb-6 pt-2 bg-white"
                        >
                            {/* Day */}
                            <h1
                                className={` ${
                                    today?.format("DD/MM/YYYY") ==
                                        day.format("DD/MM/YYYY") &&
                                    "text-pri-dark"
                                } tracking-wider uppercase text-xs`}
                            >
                                {day.format("ddd")}
                            </h1>
                            <h1
                                className={`text-xl font-semibold  ${
                                    today?.format("DD/MM/YYYY") ==
                                        day.format("DD/MM/YYYY") &&
                                    "text-white bg-pri-dark w-max p-2 px-[.6rem] rounded-full"
                                }  `}
                            >
                                {day.format("DD")}
                            </h1>
                        </div>
                    ))}
                    {/* Calendar Body */}
                    {rows.map((row, rowIndex) =>
                        columns.map((col, colIndex) => {
                            // Time Slots

                            if (col === 0) {
                                return (
                                    <div
                                        key={rowIndex * colIndex}
                                        className="p-4 text-center "
                                    >
                                        <h1 className="text-gray-500 text-xs border-0 mb-2">
                                            {timeSlots[row].toString()
                                                .length === 1
                                                ? `0${timeSlots[row]}:00`
                                                : `${timeSlots[row]}:00`}
                                        </h1>
                                    </div>
                                )
                            }

                            let flag = 0
                            let res = {} as (typeof periods)[0]

                            periods.map((period) => {
                                const currColumn = oneWeek
                                    ? oneWeek[colIndex - 1].format("YYYY/MM/DD")
                                    : ""

                                if (
                                    moment(currColumn).isBetween(
                                        period.from,
                                        period.to,
                                        undefined,
                                        "[]"
                                    )
                                ) {
                                    period.repeatOn.map((day) => {
                                        if (day == colIndex - 1) {
                                            const currTime =
                                                timeSlots[row].toString()
                                                    .length === 1
                                                    ? `0${timeSlots[row]}:00`
                                                    : `${timeSlots[row]}:00`

                                            if (period.startTime === currTime) {
                                                flag = 1
                                                res = period
                                            }
                                        }
                                    })
                                }
                            })

                            return flag >= 1 ? (
                                <div
                                    className={`py-1 px-2 cursor-pointer rounded-lg  w-full shadow-sm ${
                                        res.color === "bg-pink-100"
                                            ? "bg-pink-100 text-pink-400"
                                            : res.color === "bg-indigo-100"
                                            ? "text-indigo-400 bg-indigo-100"
                                            : res.color === "bg-yellow-100"
                                            ? "bg-yellow-100 text-yellow-500"
                                            : "text-emerald-400 bg-emerald-100"
                                    }  `}
                                >
                                    <h1 className=" font-semibold">
                                        {res.name}
                                    </h1>
                                    <p className="pt-1 text-xs">{`${
                                        res.startTime.length == 1
                                            ? "0" + res.startTime
                                            : res.startTime
                                    } - ${
                                        res.endTime.length == 1
                                            ? "0" + res.endTime
                                            : res.endTime
                                    }`}</p>
                                </div>
                            ) : (
                                <h1 className="  "></h1>
                            )
                        })
                    )}
                </div>
            </section>

            {/* Modal */}
            {showModal && (
                <Modal setPeriods={setPeriods} setShowModal={setShowModal} />
            )}
        </div>
    )
}

export default Calendar
