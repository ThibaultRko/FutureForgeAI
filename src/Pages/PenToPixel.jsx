import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import CanvasComponent from "../Component/CanvasComponent"


function PenToPixel() {
    return (
        <div className="flex flex-col min-h-screen bg-green-100">
            <Navbar />
            <div className="flex flex-center m-auto m-8 mt-16">
                <h1 className="m-6 text-4xl font-bold text-green-800 drawStyle">PenToPixel</h1>
            </div>
            <div className="mb-auto flex flex-center m-auto">
                <CanvasComponent />
            </div>
            <Footer className="w-screen fixed bottom-0" />
        </div>
    )
}
export default PenToPixel