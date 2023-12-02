import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import DrawComponent from "../Component/DrawComponent"


function DrawGuesser() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className=" flex flex-center m-auto m-8 mt-16">
                <h1 className="m-6 text-4xl font-bold text-textColor2">DrawGuesser</h1>
            </div>
            <div className="mb-auto flex flex-center m-auto">
                <DrawComponent />
            </div>
            <Footer className="w-screen fixed bottom-0" />
        </div>
    )
}
export default DrawGuesser