import Calendar from "./screens/Calendar"
import Header from "./components/Header"
import Menubar from "./components/Menubar"
import { useState } from "react"

export type Period = typeof test

const test = {
    name: "Period 1",
    startTime: "10:00",
    endTime: "12:00",
    repeatOn: [0, 1, 5, 3, 2],
    from: "2023/05/29",
    to: "2023/07/01",
    color: "bg-pink-100",
}

function App() {
    const [periods, setPeriods] = useState<Period[]>([
        {
            name: "Period 1",
            startTime: "10:00",
            endTime: "12:00",
            repeatOn: [0, 1, 5, 3, 2],
            from: "2023/05/26",
            to: "2023/07/01",
            color: "bg-pink-100",
        },
        {
            name: "Period 2",
            startTime: "16:00",
            endTime: "17:00",
            repeatOn: [3, 2],
            from: "2023/05/29",
            to: "2023/07/01",
            color: "bg-yellow-100",
        },
        {
            name: "Period 3",
            startTime: "13:00",
            endTime: "12:00",
            repeatOn: [1, 2],
            from: "2023/05/29",
            to: "2023/07/01",
            color: "bg-indigo-100",
        },
    ])

    console.log(periods)

    return (
        <>
            <div className="fixed top-0 w-full font-disp">
                <Header />
                <Menubar />
            </div>
            <Calendar periods={periods} setPeriods={setPeriods} />
        </>
    )
}

export default App
