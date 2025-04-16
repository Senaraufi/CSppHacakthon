from flask import Flask, render_template, request
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
