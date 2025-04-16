import React, { useState } from 'react';
import { Box, Typography, Button, Chip, TextField, Autocomplete, Stack, Card, CardContent, ToggleButton, ToggleButtonGroup } from '@mui/material';

// Example ingredient list (could be replaced with backend data)
const INGREDIENTS = [
  'Eggs', 'Milk', 'Chicken', 'Tomato', 'Cheese', 'Bread', 'Onion', 'Potato', 'Rice', 'Pasta', 'Apple', 'Banana', 'Carrot', 'Spinach', 'Beef', 'Fish', 'Beans', 'Corn', 'Peas', 'Butter',
];

// TheMealDB public API endpoint (ingredient filter)
const getApiUrl = (ingredients) =>
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients.map(encodeURIComponent).join(',')}`;

export default function IngredientSelector() {
  const [selected, setSelected] = useState([]);
  const [meals, setMeals] = useState([]);
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
      // TheMealDB returns { meals: [ { idMeal, strMeal, strMealThumb }, ... ] }
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
          // Deterministic color assignment for each ingredient
          const chipColors = [
            'primary', 'secondary', 'success', 'warning', 'error', 'info',
          ];
          // Simple hash function for string
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
      <Box sx={{ mt: 4 }}>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && meals.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              overflowX: 'auto',
              gap: 2,
              py: 1,
              scrollbarWidth: 'thin',
            }}
          >
            {meals.map((meal, idx) => (
              <Card key={idx} variant="outlined" sx={{ minWidth: 240, maxWidth: 280, mx: 1, flex: '0 0 auto' }}>
                <CardContent>
                  <Typography variant="h6">{meal.name}</Typography>
                  {meal.image && (
                    <img src={meal.image} alt={meal.name} style={{ width: '100%', maxWidth: 200, borderRadius: 8, marginBottom: 8 }} />
                  )}
                  {/* TheMealDB does not provide ingredient list in this endpoint */}
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (!loading && !error && (
          <Typography variant="body2" color="text.secondary">
            {selected.length === 0 ? 'Select ingredients to see possible meals.' : 'No matching meals found.'}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
