import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"

function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="mb-auto flex flex-center m-auto">
                <h1>About Page</h1>
            </div>
            <Footer className="w-screen fixed bottom-0" />
        </div>
    )
}
export default About