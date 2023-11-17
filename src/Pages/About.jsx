import Navbar from "../Component/Navbar"
import Footer from "../Component/Footer"
import DevCardComponent from "../Component/DevCardComponent"
import { FaReact } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { SiFlask } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { SiNumpy } from "react-icons/si";
import { SiPandas } from "react-icons/si";
import { SiJavascript } from "react-icons/si";



function About() {
    return (
        <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="mb-auto sm:grid grid-cols-2 grid-rows-2 gap-4 mt-16 m-4 flex flex-col">
        <div className="p-8">
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
        <div className="pt-12 p-8 sm:grid hidden">
            <h2 className="flex justify-start text-4xl font-bold text-startCargusHover">EMPLOYED TECHNOLOGIES</h2>
            <div className="flex flex-row justify-between">
                <p className="flex flex-col content-start items-start text-4xl font-bold italic mt-4 text-textColor2">PYTHON</p>
                <p><FaPython className="w-10 h-10 mt-4 mr-32"/></p>
            </div>
            <div className="flex flex-row justify-between">
                <p className="flex flex-col content-start items-start text-4xl font-bold italic text-textColor2 mt-4">NUMPY</p>
                <p><SiNumpy className="w-10 h-10 mt-4 mr-32"/></p>
            </div>
            <div className="flex flex-row justify-between">
                <p className="flex flex-col content-start items-start text-4xl font-bold italic text-textColor2 mt-4">PANDAS</p>
                <p><SiPandas className="w-10 h-10 mt-4 mr-32"/></p>
            </div>
            <div className="flex flex-row justify-between">
                <p className="flex flex-col content-start items-start text-4xl font-bold italic text-textColor2 mt-4">FLASK</p>
                <p><SiFlask className="w-10 h-10 mt-4 mr-32"/></p>
            </div>
        </div>
        <div className="pt-12 p-8 sm:grid hidden">
            <h2 className="flex justify-end text-4xl font-bold text-startCargusHover">EMPLOYED TECHNOLOGIES</h2>
            <div className="flex flex-row justify-between">
                <p><SiJavascript className="w-10 h-10 mt-4 ml-32"/></p>
                <p className="flex flex-col content-end items-end text-4xl font-bold italic mt-4 text-textColor2">JAVASCRIPT</p>
            </div>
            <div className="flex flex-row justify-between">
                <p><FaReact className="w-10 h-10 mt-4 ml-32"/></p>
                <p className="flex flex-col content-end items-end text-4xl font-bold italic mt-4 text-textColor2">REACT</p>
            </div>
            <div className="flex flex-row justify-between">
                <p><SiVite className="w-10 h-10 mt-4 ml-32"/></p>
                <p className="flex flex-col content-end items-end text-4xl font-bold italic text-textColor2 mt-4">VITE</p>
            </div>
            <div className="flex flex-row justify-between">
                <p><SiFlask className="w-10 h-10 mt-4 ml-32"/></p>
                <p className="flex flex-col content-end items-end text-4xl font-bold italic text-textColor2 mt-4">FLASK</p>
            </div>
        </div>
        <div className="p-8">
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