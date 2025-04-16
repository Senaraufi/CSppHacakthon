import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  TextField,
  Autocomplete,
  Stack,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

const INGREDIENTS = [
  'Eggs', 'Milk', 'Chicken', 'Tomato', 'Cheese', 'Bread', 'Onion', 'Potato', 'Rice', 'Pasta',
  'Apple', 'Banana', 'Carrot', 'Spinach', 'Beef', 'Fish', 'Beans', 'Corn', 'Peas', 'Butter',
];

export default function IngredientSelector() {
  const [selected, setSelected] = useState([]);
  const [meals, setMeals] = useState([]);
  const [dietary, setDietary] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const DIETARY_OPTIONS = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'nut-free', label: 'Nut-Free' },
  ];

  const findMeals = async () => {
    setLoading(true);
    setError(null);
    setMeals([]);

    try {
      const response = await fetch('http://localhost:5000/api/generate-meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: selected,
          diet: dietary,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch meals');
      const data = await response.json();

      console.log('🍽️ API response:', data);

      if (data.meals) {
        setMeals(data.meals.map(meal => ({
          name: meal.strMeal || meal.name,
          image: meal.strMealThumb || meal.image,
          id: meal.idMeal || meal.id,
        })));
      } else {
        setMeals([]);
      }

    } catch (err) {
      console.error('❌ Error fetching meals:', err);
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
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Select Ingredients" placeholder="Type to search..." />
        )}
        sx={{ mb: 2, maxWidth: 500 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={findMeals}
        disabled={selected.length === 0 || loading}
      >
        {loading ? 'Finding...' : 'Find Meals'}
      </Button>

      <Box sx={{ mt: 4 }}>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && meals.length > 0 ? (
          <Stack spacing={2}>
            {meals.map((meal, idx) => (
              <Card key={idx} variant="outlined" sx={{ maxWidth: 400 }}>
                <CardContent>
                  <Typography variant="h6">{meal.name}</Typography>
                  {meal.image && (
                    <img
                      src={meal.image}
                      alt={meal.name}
                      style={{ width: '100%', maxWidth: 200, borderRadius: 8, marginBottom: 8 }}
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (!loading && !error && (
          <Typography variant="body2" color="text.secondary">
            {selected.length === 0 ? 'Select ingredients to see possible meals.' : 'No matching meals found.'}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}


