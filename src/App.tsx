import Calendar from "./screens/Calendar"
import Header from "./components/Header"
import Menubar from "./components/Menubar"

function App() {
    return (
        <>
            <div className="fixed top-0 w-full font-disp">
                <Header />
                <Menubar />
            </div>
            <Calendar />
            {/* <Cal /> */}
        </>
    )
}

export default App
