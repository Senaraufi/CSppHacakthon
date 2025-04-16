import React, { useState } from 'react';
import {
  Box, Typography, Button, Chip, TextField, Autocomplete, Stack,
  Card, CardContent, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const INGREDIENTS = [
  'Eggs', 'Milk', 'Chicken', 'Tomato', 'Cheese', 'Bread', 'Onion',
  'Potato', 'Rice', 'Pasta', 'Apple', 'Banana', 'Carrot', 'Spinach',
  'Beef', 'Fish', 'Beans', 'Corn', 'Peas', 'Butter',
];

const getApiUrl = (ingredients) =>
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients.map(encodeURIComponent).join(',')}`;

export default function IngredientSelector() {
  const [selected, setSelected] = useState([]);
  const [meals, setMeals] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [dietary, setDietary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const DIETARY_OPTIONS = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'glutenfree', label: 'Gluten-Free' },
    { value: 'dairyfree', label: 'Dairy-Free' },
    { value: 'nutfree', label: 'Nut-Free' },
  ];

  const toggleFavorite = (meal) => {
    setFavorites((prev) =>
      prev.find((fav) => fav.id === meal.id)
        ? prev.filter((fav) => fav.id !== meal.id)
        : [...prev, meal]
    );
  };

  const findMeals = async () => {
    setLoading(true);
    setError(null);
    setMeals([]);
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
      if (data.meals) {
        setMeals(data.meals.map(meal => ({
          name: meal.strMeal,
          image: meal.strMealThumb,
          id: meal.idMeal
        })));
      } else {
        setMeals([]);
      }
    } catch (err) {
      setError('Could not fetch meals. Please try again.');
    } finally {
      setLoading(false);
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
        options={INGREDIENTS}
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

      <Button variant="contained" color="primary" onClick={findMeals} disabled={selected.length === 0}>
        Find Meals
      </Button>

      {/* Display Favorites */}
      {favorites.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>⭐ Your Favorite Meals</Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2 }}>
            {favorites.map((fav, i) => (
              <Card key={i} variant="outlined" sx={{ minWidth: 240, maxWidth: 280 }}>
                <CardContent>
                  <Typography variant="h6">{fav.name}</Typography>
                  <img src={fav.image} alt={fav.name} style={{ width: '100%', maxWidth: 200, borderRadius: 8 }} />
                  <Button
                    variant="outlined"
                    onClick={() => toggleFavorite(fav)}
                    sx={{ mt: 1 }}
                    color="secondary"
                  >
                    ★ Remove Favorite
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* Display Found Meals */}
      <Box sx={{ mt: 4 }}>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && meals.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', gap: 2, py: 1 }}>
            {meals.map((meal, idx) => (
              <Card key={idx} variant="outlined" sx={{ minWidth: 240, maxWidth: 280, flex: '0 0 auto' }}>
                <CardContent>
                  <Typography variant="h6">{meal.name}</Typography>
                  {meal.image && (
                    <img src={meal.image} alt={meal.name} style={{ width: '100%', maxWidth: 200, borderRadius: 8, marginBottom: 8 }} />
                  )}
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={`https://www.themealdb.com/meal/${meal.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Recipe
                    </Button>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => toggleFavorite(meal)}
                    >
                      {favorites.find(fav => fav.id === meal.id)
                        ? <StarIcon sx={{ fontSize: 20 }} />
                        : <StarBorderIcon sx={{ fontSize: 20 }} />}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (!loading && !error && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {selected.length === 0 ? 'Select ingredients to see possible meals.' : 'No matching meals found.'}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
