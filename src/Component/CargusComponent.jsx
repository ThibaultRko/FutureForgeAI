import React, { useState, useEffect } from 'react';

function AlgoTest() {
  // Initialisation du tableau de véhicules avec un tableau vide
  let [vehicules, setVehicules] = useState([]);

  // Utilisation du hook useEffect pour charger le fichier JSON au montage du composant
  useEffect(() => {
    fetch('/vehicules.json')
        .then(response => response.json())
        .then(data => setVehicules(data));
}, []);

    // Utilisation du hook useState pour gérer l'état de la marque et du modèle sélectionnés
    const [brand, setBrand] = useState('');
    const [model, setModele] = useState('');
    const [year, setAnnee] = useState('');
    const [engineSize, setEngineSize] = useState('');
    const [kilometrage, setKilometrage] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [transmission, setTransmission] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    // Création d'un tableau des marques uniques à partir du tableau de véhicules
    const brandUniques = [...new Set(vehicules.map(vehicule => vehicule.brand))];
    
    // Filtrage du tableau de véhicules pour obtenir seulement ceux qui correspondent à la marque sélectionnée
    const modelesFiltres = vehicules.filter(vehicule => vehicule.brand === brand);

    // Création d'un tableau des modèles uniques à partir du tableau de véhicules
    const modelesUniques = [...new Set(modelesFiltres.map(vehicule => vehicule.model))];

    // Filtrage du tableau de véhicules pour obtenir seulement ceux qui correspondent au modèle sélectionné
    const anneesFiltres = vehicules.filter(vehicule => vehicule.model === model);

    // Création d'un tableau des modèles uniques à partir du tableau de véhicules
    const anneesUniques = [...new Set(anneesFiltres.map(vehicule => vehicule.year))];

    const moteursFiltres = vehicules.filter(vehicule => vehicule.model === model);
    const moteursUniques = [...new Set(moteursFiltres.map(vehicule => vehicule.engineSize))];
    
    const fuelTypeFiltres = vehicules.filter(vehicule => vehicule.model === model);
    const fuelTypeUniques = [...new Set(fuelTypeFiltres.map(vehicule => vehicule.fuelType))];
    
    const transmissionFiltres = vehicules.filter(vehicule => vehicule.model === model);
    const transmissionUniques = [...new Set(transmissionFiltres.map(vehicule => vehicule.transmission))];

    const brandDict = {
      'audi': 0,
      'bmw': 1,
      'ford': 2,
      'hyundi': 3,
      'mercedes': 4,
      'skoda': 5,
      'toyota': 6,
      'vauxhall': 7,
      'vw': 8
    };

    const yearDict = {
      2005: 0,
      2006: 1,
      2007: 2,
      2008: 3,
      2009: 4,
      2010: 5,
      2011: 6,
      2012: 7,
      2013: 8,
      2014: 9,
      2015: 10,
      2016: 11,
      2017: 12,
      2018: 13,
      2019: 14,
      2020: 15
    }

    const modelDict = {
      ' 1 Series': 0,
      ' 2 Series': 1,
      ' 3 Series': 2,
      ' 4 Series': 3,
      ' 5 Series': 4,
      ' A Class': 5,
      ' A1': 6,
      ' A3': 7,
      ' A4': 8,
      ' A5': 9,
      ' A6': 10,
      ' Adam': 11,
      ' Arteon': 12,
      ' Astra': 13,
      ' Auris': 14,
      ' Avensis': 15,
      ' Aygo': 16,
      ' B Class': 17,
      ' B-MAX': 18,
      ' C Class': 19,
      ' C-HR': 20,
      ' C-MAX': 21,
      ' CL Class': 22,
      ' CLS Class': 23,
      ' Citigo': 24,
      ' Combo Life': 25,
      ' Corolla': 26,
      ' Corsa': 27,
      ' Crossland X': 28,
      ' E Class': 29,
      ' EcoSport': 30,
      ' Edge': 31,
      ' Fabia': 32,
      ' Fiesta': 33,
      ' Focus': 34,
      ' GL Class': 35,
      ' GLA Class': 36,
      ' GLC Class': 37,
      ' GLE Class': 38,
      ' GTC': 39,
      ' Galaxy': 40,
      ' Golf': 41,
      ' Golf SV': 42,
      ' Grand C-MAX': 43,
      ' Grandland X': 44,
      ' I10': 45,
      ' I20': 46,
      ' I30': 47,
      ' I40': 48,
      ' I800': 49,
      ' IX20': 50,
      ' IX35': 51,
      ' Insignia': 52,
      ' Ioniq': 53,
      ' KA': 54,
      ' Ka+': 55,
      ' Kamiq': 56,
      ' Karoq': 57,
      ' Kodiaq': 58,
      ' Kona': 59,
      ' Kuga': 60,
      ' Meriva': 61,
      ' Mokka': 62,
      ' Mokka X': 63,
      ' Mondeo': 64,
      ' Octavia': 65,
      ' Passat': 66,
      ' Polo': 67,
      ' Prius': 68,
      ' Q2': 69,
      ' Q3': 70,
      ' Q5': 71,
      ' Q7': 72,
      ' RAV4': 73,
      ' Rapid': 74,
      ' S-MAX': 75,
      ' SL CLASS': 76,
      ' Santa Fe': 77,
      ' Scala': 78,
      ' Scirocco': 79,
      ' Sharan': 80,
      ' Superb': 81,
      ' T-Cross': 82,
      ' T-Roc': 83,
      ' TT': 84,
      ' Tiguan': 85,
      ' Touareg': 86,
      ' Touran': 87,
      ' Tucson': 88,
      ' Up': 89,
      ' V Class': 90,
      ' Verso': 91,
      ' Viva': 92,
      ' X1': 93,
      ' X2': 94,
      ' X3': 95,
      ' X4': 96,
      ' X5': 97,
      ' Yaris': 98,
      ' Yeti': 99,
      ' Yeti Outdoor': 100,
      ' Zafira': 101
    }

    const transmissionDict = {
      'Automatic': [true, false, false],
      'Manual': [false, true, false],
      'Semi-Auto': [false, false, true]
    }
    
    const fuelDict = {
      'Diesel': [true, false, false],
      'Hybrid': [false, true, false],
      'Essence': [false, false, true]
    }

    const handleSubmit = () => {
        if (brand === '' || model === '' || year === '' || engineSize === '' || kilometrage === '' || fuelType === '' || transmission === '') {
          setErrorMessage('Veuillez remplir tous les champs du formulaire.');
          return;

        } else {
          setErrorMessage('');
        }
      
        let data = {
          brand,
          model,
          year,
          kilometrage,
          engineSize,
          transmission,
          fuelType,
        };
        data = transformValues(data, brandDict);
        data = transformValues(data, yearDict);
        data = transformValues(data, modelDict);
        data = transformValues(data, transmissionDict);
        data = transformValues(data, fuelDict);

        const jsonData = JSON.stringify(data);

        console.log(data);
        fetch('http://127.0.0.1:5000/process', {
          method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Prédiction :', data.prediction);
            setPrediction(Math.round(data.prediction));
            setModalIsOpen(true);
          })
          .catch((error) => {
            console.error('Erreur:', error);
          });
        };

    
    const handleKilometrageChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value) || value < 1 || value > 300000) {
        setErrorMessage('Le kilométrage doit être compris entre 1 et 250 000.');
    } else {
        setErrorMessage('');
        setKilometrage(value);
    }
};


    function transformValues(obj, dict) {
      const newObj = { ...obj };
      for (let key in newObj) {
        if (dict.hasOwnProperty(newObj[key])) {
          newObj[key] = dict[newObj[key]];
        }
      }
      return newObj;
    }
    
    
    return (
        <div className='flex flex-col mt-16 shadow-xl'>
          <h1 className='m-2 text-4xl font-bold text-textColor1 drop-shadow-xl'>Estimation du véhicule <br />
          en une seule étape</h1>
          <select className='m-4 border-2 rounded text-textColor2 bg-background1' value={brand} onChange={e => setBrand(e.target.value)}>
            <option value="">Sélectionnez une marque...</option>
            {brandUniques.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
          <select className='m-4 border-2 rounded text-textColor2 bg-background1' value={model} onChange={e => setModele(e.target.value)} disabled={!brand}>
            <option value="">Sélectionnez un modèle...</option>
            {modelesUniques.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>
          <select className='m-4 border-2 rounded text-textColor2 bg-background1' value={year} onChange={e => setAnnee(e.target.value)} disabled={!model}>
            <option value="">Sélectionnez une année de mise en circulation...</option>
            {anneesUniques.sort().map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
          <select className='m-4 border-2 rounded text-textColor2 bg-background1' value={engineSize} onChange={e => setEngineSize(e.target.value)} disabled={!year}>
            <option value="">Sélectionnez un type de moteur...</option>
            {moteursUniques.sort().map((engineSize, index) => (
              <option key={index} value={engineSize}>{engineSize} litres</option>
            ))}
          </select>
          <select className='m-4 border-2 rounded text-textColor2 bg-background1' value={fuelType} onChange={e => setFuelType(e.target.value)} disabled={!engineSize}>
            <option value="">Sélectionnez un type de carburant...</option>
            {fuelTypeUniques.map((fuelType, index) => (
              <option key={index} value={fuelType}>{fuelType}</option>
            ))}
          </select>
          <select className='m-4 border-2 rounded text-textColor2 bg-background1' value={transmission} onChange={e => setTransmission(e.target.value)} disabled={!fuelType}>
            <option value="">Sélectionnez un type transmission...</option>
            {transmissionUniques.map((transmission, index) => (
              <option key={index} value={transmission}>{transmission}</option>
            ))}
          </select>
          <p className='font-bold text-textColor1'>Kilométrage actuel : {kilometrage} km</p>
          <input
            className='m-4 border-2 rounded text-startCargus'
            type="range"
            value={kilometrage}
            onChange={handleKilometrageChange}
            min="10000"
            max="250000"
            step="1000"
            disabled={!transmission}
          />
          <button className='m-4 btn bg-startCargus text-background1 hover:bg-startCargusHover' onClick={handleSubmit} disabled={!kilometrage}>Voir l'estimation</button>
          {errorMessage && <p className='m-4 text-textColor2'>{errorMessage}</p>}
          <div>
          {modalIsOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-interactiveComponent3 bg-opacity-75 transition-opacity">
              <div className="bg-background2 p-6 rounded shadow-lg">
                {prediction && <p className='m-4 text-4xl text-textColor2'>Votre voiture est estimée à <br /><span className='text-8xl font-bold text-startCargus'>{prediction}€</span></p>}
                <p>Notez l'estimation</p>
                <div className="rating">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                </div>
                <br />
                <button className='text-textColor2 items-center mt-2' onClick={() => setModalIsOpen(false)}>Fermer</button>
              </div>
            </div>
          )}

        </div>
      </div>
      );
    }
    
    export default AlgoTest;
