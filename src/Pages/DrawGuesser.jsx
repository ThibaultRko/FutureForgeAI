import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import DrawComponent from "../Component/DrawComponent"


function DrawGuesser() {
    return (
        <div className="flex flex-col min-h-screen bg-yellow-50">
            <Navbar />
            <div className=" flex flex-center m-auto mt-16">
                <h1 className="mt-4 text-4xl font-bold text-yellow-800 drawStyle drop-shadow-lg">DrawGuesser</h1>
            </div>
            <div className="mb-auto flex flex-center m-auto">
                <DrawComponent />
            </div>
            <Footer className="w-screen fixed bottom-0" />
        </div>
    )
}
export default DrawGuesser