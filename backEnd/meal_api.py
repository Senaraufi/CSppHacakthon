import requests

class MealDBClient:
    BASE_URL = "https://www.themealdb.com/api/json/v1/1"

    def get_random_meal(self):
        url = f"{self.BASE_URL}/random.php"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        return None

    def get_meal_by_id(self, meal_id):
        url = f"{self.BASE_URL}/lookup.php?i={meal_id}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        return None

    def get_meals_by_ingredients(self, ingredients):
        url = f"{self.BASE_URL}/filter.php"
        response = requests.get(url, params={"i": ingredients})
        if response.status_code == 200:
            return response.json().get('meals', [])
        return []

    def get_meal_details(self, meal_id):
        url = f"{self.BASE_URL}/lookup.php"
        response = requests.get(url, params={"i": meal_id})
        if response.status_code == 200:
            meals = response.json().get('meals', [])
            return meals[0] if meals else None
        return None

    def get_filtered_meals(self, ingredients, dietary_tags=[]):
        meals = self.get_meals_by_ingredients(ingredients)
        print(f"🔍 Meals returned from ingredient search: {len(meals)}")
        print("🧪 Dietary tags to filter:", dietary_tags)

        if not dietary_tags:
            return meals

        filtered = []
        for meal in meals:
            meal_id = meal.get('idMeal')
            if not meal_id:
                continue

            details = self.get_meal_details(meal_id)
            if not details:
                continue

            tags = (details.get('strTags') or "").lower()
            if any(tag.lower() in tags for tag in dietary_tags):
                filtered.append(meal)

        print(f"📦 Returning {len(filtered)} filtered meals")
        return filtered

