import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import DevCardComponent from "../Component/DevCardComponent"


function About() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="mb-auto flex flex-center justify-around items-stretch mt-16 m-4">
                <div>
                    <DevCardComponent
                        image="public/_d31081e1-769d-48c5-88d6-1ffcd8b196de.jfif"
                        alt="avatar"
                        job="Data Analyste"
                        name='Vincent Maton'
                        location="Belgique - Saint-Ghislain"
                        text="DATA Analyste de renom et co-auteur de la plateforme future forge AI."
                        link1="https://github.com/VinceM77"
                        link2="https://www.linkedin.com/in/vincent-maton-6b8b9b1b0/"
                    />
                </div>
                <div>
                    <DevCardComponent
                        image="public/_e7d0171d-36ed-48fe-8977-6fdb849a4432.jfif"
                        alt="avatar"
                        job="Developeur Web"
                        name='Thibault Hercod'
                        location="Belgique - Bruxelles"
                        text="Web developer et co-auteur de la plateforme future forge AI."
                        link1="https://github.com/ThibaultRko"
                        link2="https://www.linkedin.com/in/thibault-hercod"
                    />
                </div>
            </div>
            
            <Footer className="w-screen fixed bottom-0" />
        </div>
    )
}
export default About