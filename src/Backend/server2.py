from flask import Flask, request, jsonify
import numpy as np
import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from keras.models import load_model
import cv2
import math

def distance(point1, point2):
    return math.sqrt((point1['x'] - point2['x'])**2 + (point1['y'] - point2['y'])**2)

def separate_letters(coordinates, threshold):
    letters = []
    current_letter = [coordinates[0]]

    for i in range(1, len(coordinates)):
        if distance(coordinates[i], coordinates[i-1]) > threshold:
            letters.append(current_letter)
            current_letter = [coordinates[i]]
        else:
            current_letter.append(coordinates[i])

    letters.append(current_letter)
    return letters



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

    # Création un tableau de dimension 300x300 rempli de 1
    tableau = np.ones((300, 600),np.uint8)

    # coodinates est la liste de coordonnées reçues par l'application web
    for sublist in coordinates:
        for point in sublist:
            x = int(float(point['x']))
            y = int(float(point['y']))

        # vérificationque les coordonnées sont dans les limites du tableau
            if 0 <= x < 600 and 0 <= y < 300:
                # épaissir le trait
                cv2.circle(tableau, (x, y), radius=8, color=(0,0,0), thickness=-1) 

   
    
    # Appliquer un seuillage adaptatif
    _, tableau = cv2.threshold(tableau, 128, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    # Appliquer une opération morphologique de fermeture
    kernel = np.zeros((1,1), np.uint8)
    tableau = cv2.morphologyEx(tableau, cv2.MORPH_CLOSE, kernel)

    # Trouver les contours dans l'image
    contours, _ = cv2.findContours(tableau, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Créer une liste de rectangles englobants
    bounding_boxes = [cv2.boundingRect(contour) for contour in contours]

    # Trier les rectangles de gauche à droite
    bounding_boxes = sorted(bounding_boxes, key=lambda x: x[0])

    word = []

    for box in bounding_boxes:
        x, y, w, h = box
        # Ignorez les boîtes qui sont trop grandes pour être des lettres
        if w < tableau.shape[1] * 0.9 and h < tableau.shape[0] * 0.9:
            # Extraire la lettre de l'image
            letter_image = tableau[y:y+h, x:x+w]

            # Inverser les couleurs
            letter_image = cv2.bitwise_not(letter_image)

            # Définir la largeur du contour
            border_width = 80

            # Ajouter un contour blanc autour de l'image
            letter_image = cv2.copyMakeBorder(letter_image, border_width, border_width, border_width, border_width, cv2.BORDER_CONSTANT, value=[255, 255, 255])

            # cv2.imshow('Image', letter_image)
            # cv2.waitKey(0)
            # cv2.destroyAllWindows()
            
            # # Normaliser les valeurs de pixel entre 0 et 1
            letter_image = letter_image / 255.0
            # debug_image = letter_image

            # print("Image : ", debug_image)

            # Assurez-vous que votre image a la forme (192, 256)
            letter_image = cv2.resize(letter_image, (256, 192))
            
            # Ajoutez une dimension pour le canal de couleur
            letter_image = np.expand_dims(letter_image, axis=-1)

            # Ajoutez une dimension pour la taille du lot
            letter_image = np.expand_dims(letter_image, axis=0)


            predictions = model2.predict(letter_image)

            class_labels = np.argmax(predictions, axis=1)

            # Si vous avez une liste de labels correspondant à vos indices, vous pouvez les obtenir comme ceci :
            labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C',
                'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c',
                'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']  # Remplacez par votre liste de labels
        
            # Obtenir le label de la meilleure prédiction
            best_label = labels[np.argmax(predictions[0])]
            
            top_5_indices = np.argsort(predictions[0])[-5:][::-1]
            top_5_labels = [labels[i] for i in top_5_indices]
            # print(top_5_labels)

            # Probabilités des 5 meilleurs labels
            top_5_probabilities = predictions[0][top_5_indices]

            # Conversion des probabilités en pourcentages
            top_5_percentages = top_5_probabilities * 100

            results = []

            # Affichage des labels et leurs pourcentages correspondants
            for label, percentage in zip(top_5_labels, top_5_percentages):
                results.append(f"{label}: {percentage:.2f}%")
                print(f"{label}: {percentage:.2f}%")


            # Ajouter le meilleur label à votre mot
            word.append(best_label)

    print("results : ", results)
    

    print("le mot est : ", word)

    # Retourner la prédiction comme sélection JSON
    return jsonify({'prediction': predictions.tolist(), 'word': word, 'results': results})
##################################### DRAW REQUEST ################################################

model3 = load_model('src\Backend\drawModel2.h5')

@app.route('/draw', methods=['POST'])
def draw():
    data3 = request.get_json(force=True)
    coordinates2 = data3['coordinates']

    # Création un tableau de dimension 300x300 rempli de 1
    tableau = np.zeros((400, 400),np.uint8)

    # coodinates est la liste de coordonnées reçues par l'application web
    for sublist in coordinates2:
        for point in sublist:
            x = int(float(point['x']))
            y = int(float(point['y']))

            # vérificationque les coordonnées sont dans les limites du tableau
            if 0 <= x < 400 and 0 <= y < 400:
                # épaissir le trait
                cv2.circle(tableau, (x, y), radius=16, color=(255,255,255), thickness=-1) 

    # Après avoir dessiné tous les points, redimensionnez l'image
    resized_draw = cv2.resize(tableau, (28,28))
    resized_draw = resized_draw.astype(np.uint8)
    resized_draw = resized_draw / 255.0
    resized_draw = np.expand_dims(resized_draw, axis=-1)
    resized_draw = np.expand_dims(resized_draw, axis=0)

    draw = []
    
    # Faites la prédiction du modèle
    predictions = model3.predict(resized_draw)

    # Traitez les résultats de la prédiction
    class_labels = np.argmax(predictions, axis=1)
    top_5_indices = np.argsort(predictions[0])[-5:][::-1]
    labels = ['The Eiffel Tower', 'airplane', 'angel', 'apple', 'banana', 'baseball bat', 'bear', 'bee', 'bicycle', 'birthday cake', 'brain', 'broccoli','cookie','cow','dragon','horse','ladder','monkey','motorbike','square','star','sun','train','tree','wine_glass']

    top_5_labels = [labels[i] for i in top_5_indices]
    top_5_probabilities = predictions[0][top_5_indices]
    top_5_percentages = top_5_probabilities * 100
    for label, percentage in zip(top_5_labels, top_5_percentages):
        print(f"{label}: {percentage:.2f}%")

    # Retourner la prédiction comme sélection JSON
    best_label = labels[np.argmax(predictions[0])]
    draw.append(best_label)
    return jsonify({'prediction': predictions.tolist(), 'draw': draw})

if __name__ == '__main__':
    app.run(port=5000, debug=True)




