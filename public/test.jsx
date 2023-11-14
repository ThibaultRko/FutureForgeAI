import React, { useState } from 'react';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Ouvrir la modale</button>

      {modalIsOpen && (
        <div className="modal">
          <h2>Je suis une modale</h2>
          <button onClick={() => setModalIsOpen(false)}>Fermer la modale</button>
        </div>
      )}
    </div>
  );
}

export default App;
