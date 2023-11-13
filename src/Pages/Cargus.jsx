import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import AlgoTest from "../Component/CargusComponent"

function Cargus() {
    return (
        <div className="flex flex-col min-h-screen bg">
            <Navbar />  
            <div className="mb-auto flex flex-center m-auto">
                <AlgoTest/>
            </div>
            <Footer className="w-screen fixed bottom-0" />
        </div>
    )
}
export default Cargus