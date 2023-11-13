


// implementer une modale

import React, { useState } from 'react';
import Modal from 'react-modal';

// Assurez-vous d'appeler cette fonction au début de votre application
Modal.setAppElement('#root');

function AlgoTest() {
  // ... vos autres hooks d'état ici ...

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ... votre logique de soumission ici ...

    // Ouvrez la fenêtre modale à la fin
    setModalIsOpen(true);
  };

  return (
    <div className='flex flex-col'>
      {/* ... votre formulaire ici ... */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            color: 'lightsteelblue'
          }
        }}
      >
        <h2>Résultat de la prédiction</h2>
        {prediction && <p>Votre voiture est estimée à <br /><span>{prediction}€</span></p>}
        <button onClick={() => setModalIsOpen(false)}>Fermer</button>
      </Modal>
    </div>
  );
}

export default AlgoTest;
