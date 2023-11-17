from flask import Flask, request, jsonify
import numpy as np
import joblib
import pandas as pd
from flask_cors import CORS
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

model = joblib.load('src/Backend/BestUsedCar2.pkl')

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

##################################### API REQUEST ################################################

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json(force=True)
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
    }
    response = requests.post('https://api.openai.com/v1/engines/davinci-codex/completions', headers=headers, json=data)
    return jsonify(response.json())


if __name__ == '__main__':
    app.run(debug=True)


if __name__ == '__main__':
    app.run(port=5000, debug=True)