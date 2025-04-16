import React from 'react';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  InputBase,
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Restaurant as RestaurantIcon } from '@mui/icons-material';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722', // A warm orange color for food theme
    },
    secondary: {
      main: '#4caf50', // A fresh green color
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <RestaurantIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FoodieHub
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 1, p: 0.5 }}>
              <InputBase
                placeholder="Search recipes..."
                sx={{ ml: 1, flex: 1, color: 'inherit' }}
              />
              <IconButton color="inherit" size="small">
                <SearchIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Discover Delicious Recipes
                </Typography>
                <Typography variant="body1" paragraph>
                  Welcome to FoodieHub, your ultimate destination for exploring, sharing, and creating amazing recipes.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse through our collection of recipes, share your culinary creations, and connect with other food enthusiasts.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Popular Categories
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Breakfast & Brunch
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Quick & Easy Meals
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Healthy Recipes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Desserts
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
