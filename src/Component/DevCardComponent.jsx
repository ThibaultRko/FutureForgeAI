import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function DevCardComponent({image, alt, job, name, location, text, link1, link2}) {
    return(
        <div>
            <div className="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full flex justify-center">
                            <div className="relative">
                                <img src={image} alt={alt} className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                            </div>
                        </div>
                        <div className="w-full text-center mt-20">
                            <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                <div className="p-3 text-center">
                                    <p className="text-textColor1">{job}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1 text-textColor2">{name}</h3>
                        <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75 text-textColor1"></i>{location}
                        </div>
                    </div>
                    <div className="mt-6 py-6 border-t border-slate-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4">
                                <p className="font-light leading-relaxed mb-4 text-textColor1">{text}</p>
                                <div className="flex flex-row">
                                    <a href={link1} className="w-20 h-20 hover:text-slate-400"><FaGithubSquare className="w-10 h-10"/></a>
                                    <a href={link2} className="w-20 h-20 hover:text-slate-400"><FaLinkedin className="w-10 h-10"/></a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DevCardComponent