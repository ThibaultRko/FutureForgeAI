import React, { useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';

function CanvasComponent() {
  const canvasRef = useRef();

  const handleSubmit = () => {
    const data = JSON.parse(canvasRef.current.getSaveData());
    const lines = data.lines;
    const coordinates = lines.map(line => line.points.map(point => ({ x: point.x, y: point.y })));
    console.log(coordinates);
  };

  return (
    <div>
        <div className='m-4 border-2'>
            <CanvasDraw ref={canvasRef} lazyRadius={0} brushRadius={2} brushColor='black' canvasWidth={300} canvasHeight={300} />
        </div>
        <div className='m-4'>
            <button className='m-4 btn bg-borderAndSeparator1 hover:bg-borderAndSeparator2 text-background1' onClick={() => canvasRef.current.clear()}>Clear</button>
            <button className='m-4 btn bg-startCargus hover:bg-startCargusHover text-background1' onClick={handleSubmit}>Submit</button>
        </div> 
    </div>
  );
}

export default CanvasComponent;

