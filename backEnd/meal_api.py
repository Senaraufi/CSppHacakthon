import requests

class MealDBClient:
    """
    A client for the MealDB API.
    """
    BASE_URL = "https://www.themealdb.com/api/json/v1/1"

    def __init__(self):
        pass

    def get_random_meal(self):
        """
        Get a random meal from the MealDB API.
        """
        url = f"{self.BASE_URL}/random.php"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        return None

    def get_meal_by_id(self, meal_id):
        """
        Get a meal by its ID from the MealDB API.
        """
        url = f"{self.BASE_URL}/lookup.php?i={meal_id}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        return None

    def get_meals_by_ingredients(self, ingredients):
        """
        Get meals that include the given ingredients.
        Accepts a comma-separated string of ingredients.
        """
        url = f"{self.BASE_URL}/filter.php"
        response = requests.get(url, params={"i": ingredients})
        if response.status_code == 200:
            return response.json().get('meals', [])
        return []

    def get_meal_details(self, meal_id):
        """
        Return detailed info about a meal.
        """
        url = f"{self.BASE_URL}/lookup.php"
        response = requests.get(url, params={"i": meal_id})
        if response.status_code == 200:
            meals = response.json().get('meals', [])
            return meals[0] if meals else None
        return None

    def get_filtered_meals(self, ingredients, dietary_tags=[]):
        """
        Filter meals based on ingredients and dietary tags.
        dietary_tags should be a list of strings (e.g., ['vegetarian', 'gluten-free']).
        """
        meals = self.get_meals_by_ingredients(ingredients)
        if not dietary_tags:
            return meals

        filtered = []
        for meal in meals:
            details = self.get_meal_details(meal['idMeal'])
            tags = (details.get('strTags') or "").lower()
            if any(tag.lower() in tags for tag in dietary_tags):
                filtered.append(meal)
        return filtered
