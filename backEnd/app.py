from flask import Flask, render_template, request, jsonify
from meal_api import MealDBClient

app = Flask(__name__)
meal_client = MealDBClient()

@app.route('/', methods=['GET', 'POST'])
def index():
    meals = []
    if request.method == 'POST':
        ingredients = request.form.get('ingredients')
        if ingredients:
            meals = meal_client.get_meals_by_ingredients(ingredients)
    return render_template('index.html', meals=meals)

@app.route('/meal/<int:meal_id>')
def meal_detail(meal_id):
    meal = meal_client.get_meal_details(meal_id)
    return render_template('meal_detail.html', meal=meal)

@app.route('/api/generate-meals', methods=['POST'])
def api_generate_meals():
    data = request.get_json()
    ingredients = data.get('ingredients', [])
    if not ingredients:
        return jsonify({'meals': []})
    # If ingredients is a list, join into comma-separated string for the client
    if isinstance(ingredients, list):
        ingredients_str = ','.join(ingredients)
    else:
        ingredients_str = ingredients
    meals = meal_client.get_meals_by_ingredients(ingredients_str)
    # Ensure meals is a list of dicts with at least 'name' and 'ingredients' fields
    meals_json = []
    for meal in meals:
        if isinstance(meal, dict):
            meals_json.append(meal)
        else:
            # fallback: just send meal name
            meals_json.append({'name': str(meal)})
    return jsonify({'meals': meals_json})
