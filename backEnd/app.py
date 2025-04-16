from flask import Flask, request, jsonify
from flask_cors import CORS
from meal_api import MealDBClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
meal_client = MealDBClient()

@app.route('/api/generate-meals', methods=['POST'])
def api_generate_meals():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    dietary_tags = data.get('dietary_tags', [])

    print("✅ Received:", data)

    if isinstance(ingredients, list):
        ingredients_str = ','.join(ingredients)
    else:
        ingredients_str = ingredients

    if isinstance(dietary_tags, str):
        dietary_tags = [dietary_tags]

    meals = meal_client.get_filtered_meals(ingredients_str, dietary_tags)
    return jsonify({'meals': meals})

if __name__ == '__main__':
    app.run(debug=True)
