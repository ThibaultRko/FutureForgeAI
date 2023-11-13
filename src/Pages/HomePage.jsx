import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mb-auto flex-col flex-center m-8">
        <h1 className="text-6xl m-6 font-bold">Future Forge AI</h1>
        <h2 className="text-3xl px-24">
        "Future Forge AI est votre plateforme de service basée sur des technologies prédictives fondées sur l'intelligence artificielle. Découvrez nos services et forgez votre futur avec l'IA !"
        </h2>
        <br />
        <div className="flex justify-center">
        <div className="card card-side bg-base-100 shadow-xl flex space-x-4 m-4 w-2/5 h-max">
          <figure className="w-1/2">
            <img
              src="public/_72884132-e8bf-4395-81d2-1e94c1353d71.jfif"
              alt="car"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body w-1/2">
            <p className="text-textColor2">
              “Cargus”, votre outil d’estimation pour les véhicules d’occasion.
            </p>
            <div className="card-actions justify-end">
              <Link
                to="/cargus"
                className="btn bg-startCargus text-background1"
              >
                essayez
              </Link>
            </div>
          </div>
        </div>
        <div className="card card-side bg-base-100 shadow-xl flex space-x-4 m-4 w-2/5 h-max">
          <figure className="w-1/2">
            <img
              src="public/_72884132-e8bf-4395-81d2-1e94c1353d71.jfif"
              alt="car"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body w-1/2">
            <p className="text-textColor2">
              “Cargus”, votre outil d’estimation pour les véhicules d’occasion.
            </p>
            <div className="card-actions justify-end">
              <Link
                to="/cargus"
                className="btn bg-startCargus text-background1"
              >
                essayez
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer className="w-screen fixed bottom-0" />
    </div>
  );
}
export default Home;
