import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

function CanvasComponent() {
  const canvasRef = useRef();
  const [errorMessage, setErrorMessage] = React.useState('');

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
      // Traitez la réponse de votre backend ici
    })
    .catch((error) => {
      console.error('Erreur:', error);
    });
  };
  

  return (
    <div>
        <div className='m-4 border-2'>
            <CanvasDraw ref={canvasRef} lazyRadius={0} brushRadius={5} brushColor='black' canvasWidth={300} canvasHeight={300} />
        </div>
        <div className='m-4'>
            <button className='m-4 btn bg-borderAndSeparator1 hover:bg-borderAndSeparator2 text-background1' onClick={() => canvasRef.current.clear()}>Clear</button>
            <button className='m-4 btn bg-startCargus hover:bg-startCargusHover text-background1' onClick={handleSubmit}>Submit</button>
        </div> 
    </div>
  );
}

export default CanvasComponent;