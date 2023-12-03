import React, { useRef, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';

function DrawComponent() {
  const canvasRef = useRef();
  const [drawArray, setDrawArray] = useState(['The Eiffel Tower', 'airplane', 'angel', 'apple', 'banana', 'baseball bat', 'bear', 'bee', 'bicycle', 'birthday cake', 'brain', 'broccoli','cookie','cow','dragon','horse','ladder','monkey','motorbike','square','star','sun','train','tree','wine_glass']);
  const [selectedDraws, setSelectedDraws] = useState([]);
  const [currentDraw, setCurrentDraw] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [draw, setDraw] = useState([]);
  const [results, setResults] = useState('');
  const [counter, setCounter] = useState(0);
  const [showDraw, setShowDraw] = useState(false);

  // Sélectionnez 10 éléments aléatoires de drawArray lorsque le composant est monté
  useEffect(() => {
    const shuffled = [...drawArray].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    setSelectedDraws(selected);
    setCurrentDraw(selected[0]); // Définir le premier élément comme le dessin actuel
  }, []);

  const handleSubmit = () => {
    // Assurez-vous que vos coordonnées sont correctement définies
    const data = JSON.parse(canvasRef.current.getSaveData());
    const lines = data.lines;
    const coordinates = lines.map(line => line.points.map(point => ({ x: point.x, y: point.y })));
  
    if (!coordinates || coordinates.length === 0) {
      setErrorMessage('Veuillez dessiner quelque chose sur le canvas.');
      return;
    } else {
      setErrorMessage('aaaaaaaaarg');
    }
  
    const dataToSend = {
      coordinates,
    };
  
    const jsonData = JSON.stringify(dataToSend);
  
    console.log(dataToSend);
    fetch('http://127.0.0.1:5000/draw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Réponse du backend :', data);
      setPrediction(JSON.stringify(data.prediction)); // Mettez à jour l'état de la prédiction avec la réponse du backend
      setDraw(data.draw); // Mettez à jour l'état de draw avec data.draw
      console.log("contenu data.draw :", data.draw);
      setShowDraw(true); // Afficher draw
      setTimeout(() => setShowDraw(false), 2000);
      setResults(data.results); // Mettez à jour l'état de results avec data.results
      console.log("contenu selectedDraws :", selectedDraws);
      console.log("currentDraw :", currentDraw);

      // Si la prédiction correspond à un élément de selectedDraws, retirez cet élément de selectedDraws
      if (selectedDraws.includes(data.draw[0])) {
        setSelectedDraws(prevDraws => {
            const newDraws = prevDraws.filter(draw => draw !== data.draw[0]);
            setCurrentDraw(newDraws[0]); // Mettre à jour le dessin actuel avec le prochain dessin
            return newDraws;
          });
        console.log('Element retiré de selectedDraws :', data.draw);
        console.log("test4");
        canvasRef.current.clear();
        setCounter(counter + 1);
      }
    })

    .catch((error) => {
      console.error('Erreur:', error);
    });
  };
  if (counter === 2) {
    return (
      <div className='flex flex-col centera mb-24 drawStyle text-xl text-green-500 bold'>
        Bravo ! Vous avez terminé le jeu !
        <button onClick={() => window.location.reload()}>Recommencer</button>
        <Link to="/">Quitter</Link>
      </div>
    );
  }

  return (
    <div>
        <div className='flex flex-col'>
            <div>
                <h2 className='flex text-textColor2 absolute ml-8 mt-6 drawStyle'>
                    Mot à faire deviner : {currentDraw ? currentDraw : 'Game Over'}
                </h2>
            </div>
            <div className='flex absolute bottom-16 ml-8'>
                <p className='drawStyle ml-36 text-textColor2'>Score : {counter}/3</p>
            </div>  
            <div className='m-4 border-2'>
                <CanvasDraw ref={canvasRef} lazyRadius={0} brushRadius={5} brushColor='black' canvasWidth={400} canvasHeight={400} loadTimeOffset={0} hideGrid={true} hideInterface={true} false/>
            </div>
        </div>
        <div className='flex absolute bottom-16 ml-8'>
            <button className='text-textColor2 drawStyle' onClick={() => {canvasRef.current.clear(); setDraw([]);}}>Clear</button>
            <button className='drawStyle ml-72 text-textColor2' onClick={handleSubmit}>Submit</button>
        </div>
        {showDraw && <div className='flex absolute bottom-24 ml-48 drawStyle text-xl text-textColor2'>{draw}</div>}
    </div>
  );
}

export default DrawComponent;
