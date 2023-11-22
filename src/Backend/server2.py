from flask import Flask, request, jsonify
import numpy as np
import joblib
import pandas as pd
from flask_cors import CORS
from flask import Flask, request, jsonify
from keras.models import load_model
import tensorflow as tf

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

model = joblib.load('src/Backend/BestUsedCar2.pkl')
model2 = load_model('src/Backend/mon_model.keras')

@app.route('/process', methods=['POST'])
def process():
    data = request.get_json(force=True)
    data["engineSize"] = float(data["engineSize"])
    print("Contenu du Dictionnaire : ", data)
    data = pd.DataFrame.from_dict([data])
    data = data.rename(columns={'kilometrage': 'mileage'})
    

    # Créer trois nouvelles colonnes à partir de 'transmission'
    data[['transmission_Automatic', 'transmission_Manual', 'transmission_Semi-Auto']] = data['transmission'].apply(pd.Series)
    data[['fuelType_Diesel', 'fuelType_Essence' ,'fuelType_Hybrid']] = data['fuelType'].apply(pd.Series)
    # retirer les colonnes inutiles
    data = data.drop(['transmission','fuelType'], axis=1)
    
    print("DataFrame après transformation : ", data)



    # Faire une prédiction avec le modèle
    prediction = model.predict(data)
    print(prediction)

    # Retourner la prédiction comme réponse JSON
    return jsonify({'prediction': prediction.tolist()})

##################################### CHAR REQUEST ################################################

@app.route('/char', methods=['POST'])
def char():
    data = request.get_json(force=True)
    coordinates = data['coordinates']
    print("coordinates : ", coordinates)

if __name__ == '__main__':
    app.run(debug=True)


if __name__ == '__main__':
    app.run(port=5000, debug=True)