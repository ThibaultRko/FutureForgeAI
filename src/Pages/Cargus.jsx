import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import AlgoTest from "../Component/CargusComponent"

function Cargus() {
    return (
        <div className="flex flex-col min-h-screen bg-[url('public/_72884132-e8bf-4395-81d2-1e94c1353d71.jfif')] bg-cover bg-top">
            <Navbar />  
            <div className="mb-auto flex flex-center m-auto bg-background1 bg-opacity-80">
                <AlgoTest/>
            </div>
            <Footer className="w-screen fixed bottom-0"/>
        </div>
    )
}
export default Cargus