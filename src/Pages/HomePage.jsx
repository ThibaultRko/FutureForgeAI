import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Card from "../Component/CardComponent";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mb-auto flex-col flex-center m-8">
        <div className="flex flex-row sm:flex justify-center">
          <h2 id="title1" className="text-6xl font-bold text-textColor2">
            FUTURE FORGE AI
          </h2>
        </div>
        <div className="flex flex-row sm:flex justify-center">
          <h2 id="title2" className="text-6xl font-bold text-textColor2">
            FORGE TON GROSCUL!
          </h2>
        </div>
        
        <img src="" alt="" />
        <br />
        <div className="flex flex-col sm:flex-row justify-center">
          <Card
            image="public/_72884132-e8bf-4395-81d2-1e94c1353d71.jfif"
            alt="car"
            text="“Cargus”, votre outil d’estimation pour les véhicules d’occasion."
            link="/cargus"
            buttonText="essayez"
          />
          <Card
            image="public/_491c57ef-4158-41ff-9bf6-99e067e29328.jfif"
            alt="car"
            text="“PenToPixel”, vos écrits manuscrits prennent une nouvelle dimension."
            link="/pentopixel"
            buttonText="essayez"
          />
        </div>
      </div>
      {/* <ChatBox /> */}
      <Footer className="w-screen fixed bottom-0" />
    </div>
  );
}

export default Home;
