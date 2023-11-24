from flask import Flask, request, jsonify
import numpy as np
import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from keras.models import load_model
import cv2


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

model = joblib.load('src\Backend\BestUsedCar2.pkl')


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
model2 = load_model('src\Backend\mon_modele.h5')

@app.route('/char', methods=['POST'])
def char():
    data2 = request.get_json(force=True)
    coordinates = data2['coordinates']
    print("coordinates : ", coordinates)

    # Création un tableau de dimension 300x300 rempli de 1
    tableau = np.ones((300, 300))

    # coodinates est la liste de coordonnées reçues par l'application web
    for sublist in coordinates:
        for point in sublist:
            x = int(float(point['x']))
            y = int(float(point['y']))

        # vérificationque les coordonnées sont dans les limites du tableau
            if 0 <= x < 300 and 0 <= y < 300:
                # épaissir le trait
                cv2.circle(tableau, (x, y), radius=12, color=(0,0,0), thickness=-1) 

# adaptation du tableau pour l'entrée attendue par notre modèle
    resized_tableau = cv2.resize(tableau, (256,192))  # Largeur x Hauteur

# si le tableau est en niveaux de gris, on ajoute une dimension supplémentaire pour représenter le canal de couleur
    if len(resized_tableau.shape) == 2:  # évaluer si niveau de gris
        resized_tableau = np.expand_dims(resized_tableau, axis=-1)


# notre modèle attend une entrée de forme (256, 192, 1), nous devons donc ajouter une dimension supplémentaire au tableau pour représenter le batch size
    resized_tableau = np.expand_dims(resized_tableau, axis=0)

#  Prédiction avec notre modèle
    predictions = model2.predict(resized_tableau)

    print("predictions : ", predictions)

    class_labels = np.argmax(predictions, axis=1)

    # top 5 des meilleurs labels
    top_5_indices = np.argsort(predictions[0])[-5:][::-1]

    print("top_5_indices : ", top_5_indices)

#  liste de labels correspondant aux indices
    labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C',
        'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c',
        'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] 
    top_5_labels = [labels[i] for i in top_5_indices]

    print("top_5_labels : ", top_5_labels)

# Probabilités des 5 meilleurs labels
    top_5_probabilities = predictions[0][top_5_indices]

# Conversion des probabilités en pourcentages
    top_5_percentages = top_5_probabilities * 100

# Affichage des labels et leurs pourcentages correspondants
    for label, percentage in zip(top_5_labels, top_5_percentages):
        print(f"{label}: {percentage:.2f}%")

    # Retourner la prédiction comme sélection JSON
    return jsonify({'prediction': predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True)


if __name__ == '__main__':
    app.run(port=5000, debug=True)