import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

function DrawComponent() {
  const canvasRef = useRef();
  const [drawArray, setDrawArray] = useState(['The Eiffel Tower', 'airplane', 'angel', 'apple', 'banana', 'baseball bat', 'bear', 'bee', 'bicycle', 'birthday cake', 'brain', 'broccoli','cookie','cow','dragon','horse','ladder','monkey','motorbike','square','star','sun','train','tree','wine_glass']);
  const [errorMessage, setErrorMessage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [draw, setDraw] = useState([]);
  const [monDictionnaire, setMonDictionnaire] = useState({});
  const [results, setResults] = useState('');
  const [selectedResult, setSelectedResult] = useState(null);
  const choosenResults = {};
  const [showResults, setShowResults] = useState(false);


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
      setResults(data.results); // Mettez à jour l'état de results avec data.results
    })

    .catch((error) => {
      console.error('Erreur:', error);
    });
  };

  return (
    <div>
        <div className=' m-4 flex flex-row'>
            <div className='m-4 border-2'>
                <CanvasDraw ref={canvasRef} lazyRadius={0} brushRadius={5} brushColor='black' canvasWidth={600} canvasHeight={600} loadTimeOffset={0} hideGrid={true} hideInterface={true} false/>
            </div>
            <div className='m-4'>
                    <h2 className='flex text-textColor1'>
                        mot a faire deviner
                    </h2>
                    {drawArray.map(draw => (
                        <li className='flex text-textColor2' key={draw}>{draw}</li>
                    ))}
                <ul>
                </ul>
            </div>
        </div>
        <div className='m-4'>
        <button className='m-4 btn bg-borderAndSeparator1 hover:bg-borderAndSeparator2 text-background1' onClick={() => {canvasRef.current.clear(); setDraw([]);}}>Clear</button>
            <button className='m-4 btn bg-startCargus hover:bg-startCargusHover text-background1' onClick={handleSubmit}>Submit</button>
        </div> 
        <div className='m-4'>
            <p>Draw: {draw}</p>
        </div>
    </div>
  );
}

export default DrawComponent;
