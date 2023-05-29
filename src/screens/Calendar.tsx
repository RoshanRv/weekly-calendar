import { useEffect, useState } from "react"
import moment from "moment"
import type { Moment } from "moment"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { CgAddR } from "react-icons/cg"

const periods = [
    {
        name: "Period 1",
        startTime: "10:00",
        endTime: "12:00",
        repeatOn: [0, 1, 5, 3, 2],
        from: "2023/05/29",
        to: "2023/07/01",
        color: "red",
    },
    {
        name: "Period 2",
        startTime: "16:00",
        endTime: "17:00",
        repeatOn: [3, 2],
        from: "2023/05/29",
        to: "2023/07/01",
        color: "yellow",
    },
    {
        name: "Period 3",
        startTime: "13:00",
        endTime: "12:00",
        repeatOn: [1, 2],
        from: "2023/05/29",
        to: "2023/07/01",
        color: "blue",
    },
]

const Calendar = () => {
    const [startOfWeek, setStartOfWeek] = useState<Moment>()
    const [endOfWeek, setEndOfWeek] = useState<Moment>()
    const [today, setToday] = useState<Moment>()
    const [oneWeek, setOneWeek] = useState<Moment[]>()
    const timeSlots = Array.from({ length: 24 }, (_, i) => i + 1)

    const rows = Array.from({ length: timeSlots.length }, (_, i) => i)
    const columns = Array.from({ length: 8 }, (_, i) => i)

    useEffect(() => {
        const start = moment().startOf("isoWeek")
        const end = moment().endOf("isoWeek")
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
    }, [])

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
                        <div className="flex items-center gap-x-1">
                            <BiChevronLeft className="text-2xl" />
                            <h1 className="text-lg">Today</h1>
                            <BiChevronRight className="text-2xl" />
                        </div>
                    </div>
                    {/* Add Btn */}
                    <button className=" bg-pri-dark px-8 py-3 items-center text-white  rounded-full flex gap-x-3 font-light hover:bg-pri-light transition-all hover:text-pri-dark duration-500 ">
                        <CgAddR className="text-lg" />
                        <h1>Add Period</h1>
                    </button>
                </div>
                <div className="grid  divide-x divide-x-reverse  divide-y divide-y-reverse  bg-white grid-cols-[repeat(8,auto)] mt-10 border-b p-4 border-gray-300 divide-solid divie-x-2  divide-gray-300 ">
                    {/* weekly calendar header */}
                    {/* Placeholder Box */}
                    <div className=" w-20 sticky top-[17rem]  pb-6 pt-2 bg-white border-b border-r border-gray-300"></div>
                    {oneWeek?.map((day, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-y-2 justify-center items-center w-44 sticky top-[17rem] pb-6 pt-2 bg-white"
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
                            console.log(col)

                            if (col === 0) {
                                return (
                                    <div
                                        key={rowIndex * colIndex}
                                        className="p-4 text-center"
                                    >
                                        <h1 className="text-gray-500 text-xs border-0 bg-white mb-2">
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
                                        res.color === "red"
                                            ? "bg-pink-100 text-pink-400"
                                            : res.color === "blue"
                                            ? "text-indigo-400 bg-indigo-100"
                                            : res.color === "yellow"
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
                                <h1></h1>
                            )
                        })
                    )}
                </div>
            </section>
        </div>
    )
}

export default Calendar
