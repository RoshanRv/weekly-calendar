interface Props {
    time: string
    setTime: (time: string) => void
    setModal: (no: number) => void
}

const TimeDialog = ({ setTime, time: currTime, setModal }: Props) => {
    const timeSlot = Array.from({ length: 24 }, (_, i) =>
        (i + 1).toString().length === 1 ? `0${i + 1}:00` : `${i + 1}:00`
    )

    return (
        <div className=" flex flex-col z-50  text-gray-700 items-center text-lg p-2 w-full rounded-lg absolute top-full h-60 overflow-y-auto shadow-lg bg-white font-disp">
            {timeSlot.map((time) => (
                <h1
                    onClick={() => {
                        setModal(0)
                        setTime(time)
                    }}
                    className={` cursor-pointer w-full py-2 text-center transition-all ${
                        time === currTime
                            ? "bg-pri-dark text-white"
                            : "hover:bg-pri-light"
                    } `}
                    key={time}
                >
                    {time}
                </h1>
            ))}
        </div>
    )
}

export default TimeDialog
