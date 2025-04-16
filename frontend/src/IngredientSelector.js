import React, { useState } from 'react';
import {
  Box, Typography, ToggleButtonGroup, ToggleButton, Autocomplete, TextField, Chip, Stack,
} from '@mui/material';

const INGREDIENTS = [
  'Eggs', 'Milk', 'Chicken', 'Tomato', 'Cheese', 'Bread', 'Onion',
  'Potato', 'Rice', 'Pasta', 'Apple', 'Banana', 'Carrot', 'Spinach',
  'Beef', 'Fish', 'Beans', 'Corn', 'Peas', 'Butter',
];

// Ingredient to dietary tags mapping
const INGREDIENT_DIET_MAP = {
  Eggs:         ['vegetarian', 'dairyfree', 'glutenfree', 'nutfree'],
  Milk:         ['vegetarian', 'glutenfree', 'nutfree'], // Not dairy-free
  Chicken:      ['dairyfree', 'glutenfree', 'nutfree'],
  Tomato:       ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Cheese:       ['vegetarian', 'glutenfree', 'nutfree'], // Not dairy-free
  Bread:        ['vegetarian'], // Usually not gluten-free, may contain nuts
  Onion:        ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Potato:       ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Rice:         ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Pasta:        ['vegetarian'], // Usually not gluten-free, may contain eggs or nuts
  Apple:        ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Banana:       ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Carrot:       ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Spinach:      ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Beef:         ['dairyfree', 'glutenfree', 'nutfree'],
  Fish:         ['glutenfree', 'dairyfree', 'nutfree'],
  Beans:        ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Corn:         ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Peas:         ['vegetarian', 'vegan', 'glutenfree', 'dairyfree', 'nutfree'],
  Butter:       ['vegetarian', 'glutenfree', 'nutfree'], // Not dairy-free
};

const RANDOM_RECIPES = [
  "https://www.bbcgoodfood.com/recipes/chicken-curry",
  "https://www.allrecipes.com/recipe/24074/alysias-basic-meat-lasagna/",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/classic-deviled-eggs-recipe-1973516",
  "https://www.seriouseats.com/recipes/2011/02/perfect-chocolate-chip-cookies-recipe.html",
  "https://www.delish.com/cooking/recipe-ideas/a19665918/easy-chicken-parmesan-recipe/",
  "https://www.bonappetit.com/recipe/the-ultimate-veggie-burger",
  "https://www.tasteofhome.com/recipes/best-ever-potato-salad/",
  "https://www.simplyrecipes.com/recipes/banana_bread/",
  "https://www.jamieoliver.com/recipes/chicken-recipes/chicken-tikka-masala/",
  "https://www.loveandlemons.com/vegan-brownies/"
];

export default function IngredientSelector() {
  const [selected, setSelected] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dietary, setDietary] = useState([]);
  const [surpriseMeal, setSurpriseMeal] = useState(null);
  const [surpriseLoading, setSurpriseLoading] = useState(false);

  const DIETARY_OPTIONS = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'glutenfree', label: 'Gluten-Free' },
    { value: 'dairyfree', label: 'Dairy-Free' },
    { value: 'nutfree', label: 'Nut-Free' },
  ];

  // Filter ingredients by dietary requirements
  const filteredIngredients = dietary.length === 0
    ? INGREDIENTS
    : INGREDIENTS.filter(ingr =>
        dietary.every(tag => (INGREDIENT_DIET_MAP[ingr] || []).includes(tag))
      );

  // Restore the meal search button and API logic
  const getApiUrl = (ingredients) =>
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients.map(encodeURIComponent).join(',')}`;

  const findMeals = async () => {
    setLoading(true);
    setError(null);
    setMeals([]);
    setSurpriseMeal(null);
    try {
      if (selected.length === 0) {
        setMeals([]);
        setLoading(false);
        return;
      }
      const url = getApiUrl(selected);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch meals');
      const data = await response.json();
      let foundMeals = [];
      if (data.meals) {
        foundMeals = data.meals.map(meal => ({
          name: meal.strMeal,
          image: meal.strMealThumb,
          id: meal.idMeal
        }));
      }
      setMeals(foundMeals);
    } catch (err) {
      setError('Could not fetch meals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Surprise Me: Pick a random recipe from the MealDB API
  const handleSurprise = async () => {
    setSurpriseLoading(true);
    setMeals([]);
    setError(null);
    try {
      await new Promise(res => setTimeout(res, 800)); // Add suspense
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      const meal = data.meals[0];
      setSurpriseMeal({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        instructions: meal.strInstructions,
        link: meal.strSource || `https://www.themealdb.com/meal/${meal.idMeal}`
      });
    } catch (err) {
      setError('Failed to fetch a surprise meal.');
    } finally {
      setSurpriseLoading(false);
    }
  };

  return (
    <Box sx={{ my: 6, p: 4, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Any dietary requirements?
      </Typography>
      <ToggleButtonGroup
        value={dietary}
        onChange={(_, newDiet) => setDietary(newDiet)}
        aria-label="dietary requirements"
        sx={{ mb: 3, flexWrap: 'wrap' }}
      >
        {DIETARY_OPTIONS.map(opt => (
          <ToggleButton key={opt.value} value={opt.value} aria-label={opt.label} sx={{ mr: 1, mb: 1 }}>
            {opt.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        What ingredients do you have?
      </Typography>
      <Autocomplete
        multiple
        options={filteredIngredients}
        value={selected}
        onChange={(_, val) => setSelected(val)}
        renderTags={(value, getTagProps) => {
          const chipColors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
          const hash = str => str.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
          return value.map((option, index) => (
            <Chip
              variant="filled"
              color={chipColors[hash(option) % chipColors.length]}
              label={option}
              {...getTagProps({ index })}
              key={option}
              sx={{ fontWeight: 500 }}
            />
          ));
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Select Ingredients" placeholder="Type to search..." />
        )}
        sx={{ mb: 2, maxWidth: 500 }}
      />

      <Stack direction="row" spacing={2}>
        <button onClick={findMeals} disabled={selected.length === 0 || loading} style={{padding: '8px 16px', fontWeight: 600, borderRadius: 6, background: '#8BA870', color: 'white', border: 'none', cursor: 'pointer'}}>
          {loading ? 'Finding...' : 'Find Meals'}
        </button>
        <button onClick={handleSurprise} style={{padding: '8px 16px', fontWeight: 600, borderRadius: 6, background: '#FFB347', color: 'white', border: 'none', cursor: 'pointer'}}>
          Surprise Me
        </button>
      </Stack>

      <Box sx={{ mt: 4 }}>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && meals.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', gap: 2, py: 1 }}>
            {meals.map((meal, idx) => (
              <Box key={idx} sx={{ minWidth: 240, maxWidth: 280, flex: '0 0 auto', border: '1px solid #eee', borderRadius: 2, p: 2, bgcolor: '#fff', m: 1 }}>
                <Typography variant="h6">{meal.name}</Typography>
                {meal.image && (
                  <img src={meal.image} alt={meal.name} style={{ width: '100%', maxWidth: 200, borderRadius: 8, marginBottom: 8 }} />
                )}
                <button style={{marginTop: 8, padding: '6px 12px', borderRadius: 4, background: '#FFB347', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer'}} onClick={() => window.open(`https://www.themealdb.com/meal/${meal.id}`, '_blank')}>Get Recipe</button>
              </Box>
            ))}
          </Box>
        ) : (!loading && !error && selected.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No matching meals found.
          </Typography>
        ))}
      </Box>

      {surpriseMeal && (
        <Box sx={{ my: 4, maxWidth: 600, border: '1px solid #eee', borderRadius: 2, p: 2, bgcolor: '#fff' }}>
          <Typography variant="h5" gutterBottom>
            Surprise Meal
          </Typography>
          <Typography variant="h6">{surpriseMeal.name}</Typography>
          {surpriseMeal.image && (
            <img src={surpriseMeal.image} alt={surpriseMeal.name} style={{ width: '100%', maxWidth: 200, borderRadius: 8, marginBottom: 8 }} />
          )}
          <Typography variant="body1" sx={{ mb: 2 }}>{surpriseMeal.instructions}</Typography>
          <a href={surpriseMeal.link} target="_blank" rel="noopener noreferrer" style={{fontWeight: 600, color: '#8BA870', fontSize: 18}}>
            Click here to view your surprise meal!
          </a>
        </Box>
      )}
    </Box>
  );
}
