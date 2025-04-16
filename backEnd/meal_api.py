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
        else:
            return None

    def get_meal_by_id(self, meal_id):
        """
        Get a meal by its ID from the MealDB API.
        """
        url = f"{self.BASE_URL}/lookup.php?i={meal_id}"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            return None