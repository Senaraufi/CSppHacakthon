import React, { useState } from 'react';
import { Box, Typography, Button, Chip, TextField, Autocomplete, Stack, Card, CardContent } from '@mui/material';

// Example ingredient list (could be replaced with backend data)
const INGREDIENTS = [
  'Eggs', 'Milk', 'Chicken', 'Tomato', 'Cheese', 'Bread', 'Onion', 'Potato', 'Rice', 'Pasta', 'Apple', 'Banana', 'Carrot', 'Spinach', 'Beef', 'Fish', 'Beans', 'Corn', 'Peas', 'Butter',
];

// Mock meal suggestions
const MOCK_MEALS = [
  { name: 'Omelette', ingredients: ['Eggs', 'Cheese', 'Onion'] },
  { name: 'Chicken Sandwich', ingredients: ['Chicken', 'Bread', 'Tomato'] },
  { name: 'Veggie Stir Fry', ingredients: ['Carrot', 'Onion', 'Peas', 'Rice'] },
  { name: 'Banana Pancakes', ingredients: ['Banana', 'Eggs', 'Milk'] },
];

export default function IngredientSelector() {
  const [selected, setSelected] = useState([]);
  const [meals, setMeals] = useState([]);

  const findMeals = () => {
    // For now, filter mock meals that can be made with selected ingredients
    const possibleMeals = MOCK_MEALS.filter(meal =>
      meal.ingredients.every(ing => selected.includes(ing))
    );
    setMeals(possibleMeals);
  };

  return (
    <Box sx={{ my: 6, p: 4, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
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
      <Button variant="contained" color="primary" onClick={findMeals} disabled={selected.length === 0}>
        Find Meals
      </Button>
      <Box sx={{ mt: 4 }}>
        {meals.length > 0 ? (
          <Stack spacing={2}>
            {meals.map((meal, idx) => (
              <Card key={idx} variant="outlined" sx={{ maxWidth: 400 }}>
                <CardContent>
                  <Typography variant="h6">{meal.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ingredients: {meal.ingredients.join(', ')}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {selected.length === 0 ? 'Select ingredients to see possible meals.' : 'No matching meals found.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
