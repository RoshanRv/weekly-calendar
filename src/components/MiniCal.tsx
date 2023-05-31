import { useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

type Props = {
    fromDate: string
    endDate: string
    setDate: (date: string) => void
    type: "from" | "end"
    setModal: (val: boolean) => void
}

const MiniCal = ({ setDate, endDate, fromDate, type, setModal }: Props) => {
    const [currentDate, setCurrentDate] = useState(new Date())

    const month = currentDate.toLocaleString("default", { month: "long" })
    const year = currentDate.getFullYear()
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]

    const getDaysInMonth = () => {
        const firstDayOfMonth = new Date(year, currentDate.getMonth(), 1)
        const lastDayOfMonth = new Date(year, currentDate.getMonth() + 1, 0)
        const daysInMonth = lastDayOfMonth.getDate()

        const days = []

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
            days.push(null)
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i)
        }

        return days
    }

    const handlePrevMonth = () => {
        const prevMonth = new Date(year, currentDate.getMonth() - 1, 1)
        setCurrentDate(prevMonth)
    }

    const handleNextMonth = () => {
        const nextMonth = new Date(year, currentDate.getMonth() + 1, 1)
        setCurrentDate(nextMonth)
    }

    const handlePrevYear = () => {
        const prevMonth = new Date(
            currentDate.getFullYear() - 1,
            new Date(`${month} 1,2000`).getMonth(),
            1
        )
        setCurrentDate(prevMonth)
    }

    const handleNextYear = () => {
        const nextMonth = new Date(
            currentDate.getFullYear() + 1,
            new Date(`${month} 1,2000`).getMonth(),
            1
        )
        setCurrentDate(nextMonth)
    }

    return (
        <div className="p-3 bg-white  font-disp text-xs">
            {/* Month & Year*/}
            <div className="flex justify-between">
                <div className="flex gap-x-4 items-center justify-center  mb-4  text-gray-500">
                    <BiChevronLeft
                        onClick={handlePrevMonth}
                        className="text-xl"
                    />
                    {<p>{month}</p>}
                    <BiChevronRight
                        onClick={handleNextMonth}
                        className="text-xl"
                    />
                </div>
                <div className="flex gap-x-4 items-center justify-center  mb-4  text-gray-500">
                    <BiChevronLeft
                        onClick={handlePrevYear}
                        className="text-xl"
                    />
                    {<p>{year}</p>}
                    <BiChevronRight
                        onClick={handleNextYear}
                        className="text-xl"
                    />
                </div>
            </div>
            {/* Cal */}
            <div className="grid grid-cols-7  items-center justify-center">
                {/* Days */}
                {daysOfWeek.map((day) => (
                    <h1 className="p-1 px-2 text-pri-dark font-semibold">
                        {day}
                    </h1>
                ))}
                {/* Dates */}
                {getDaysInMonth().map((day, index) => (
                    <h1
                        onClick={() => {
                            setDate(
                                new Date(`${year}/${month}/${day! + 1}`)
                                    .toISOString()
                                    .split("T")[0]
                                    .replace(/-/g, "/")
                            )
                            if (type === "end" && fromDate) {
                                setModal(false)
                            }
                        }}
                        key={index}
                        className={`text-center p-1 px-2  transition-all cursor-pointer rounded-full  w-max ${
                            day ===
                                new Date(
                                    type === "from" ? fromDate : endDate
                                ).getDate() &&
                            new Date(
                                type === "from" ? fromDate : endDate
                            ).getMonth() ===
                                new Date(`${month} 1,2000`).getMonth() &&
                            year ===
                                new Date(
                                    type === "from" ? fromDate : endDate
                                ).getFullYear()
                                ? "bg-pri-dark text-white"
                                : "hover:bg-pri-light"
                        }   `}
                    >
                        {day}
                    </h1>
                ))}
            </div>
        </div>
    )
}

export default MiniCal
