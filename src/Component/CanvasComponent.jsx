import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

function CanvasComponent() {
  const canvasRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [word, setWord] = useState('');
  const [monDictionnaire, setMonDictionnaire] = useState({});
  const [results, setResults] = useState('');


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
    fetch('http://127.0.0.1:5000/char', {
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
      let joinedWord = data.word.join("");
      setWord(joinedWord); // Mettez à jour l'état du tableau word avec la réponse du backend
      setResults(data.results);
    })

    .catch((error) => {
      console.error('Erreur:', error);
    });
  };

  return (
    <div>
        <div className='mt-4 border-2 shadow-xl'>
            <CanvasDraw ref={canvasRef} lazyRadius={0} brushRadius={5} brushColor='black' canvasWidth={600} canvasHeight={300} loadTimeOffset={0} />
        </div>
        <div className='flex flex-col align-middle'>
          <div className='ml-4 flex justify-between '>
            <button className='text-4xl text-green-500 drawStyle' onClick={() => {canvasRef.current.clear(); setWord([]);}}>Clear</button>
            <button className='text-4xl m-4 text-green-800 drawStyle' onClick={handleSubmit}>Submit</button>
          </div> 
          <div>
            <p className='flex ml-4 mb-4 text-4xl font-bold text-green-800 drawStyle'>Le mot est :<br /><span className='text-startCargus'>{typeof word === 'string' && word.split('').map((letter, index) => <button className='ml-2 text-green-800 drawStyle' key={index} onClick={() => console.log(letter)  }>{letter}</button>)}</span></p>
          </div>
        </div>
        
    </div>
  );
}

export default CanvasComponent;

