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
      main: '#a4ac4c', // Sage green
      light: '#fffae4', // Light cream
      dark: '#8a9140', // Darker sage
    },
    secondary: {
      main: '#fffae4', // Warm beige
      light: '#d8d1b8',
      dark: '#b0a588',
    },
    background: {
      default: '#FFFFE4', // Light cream background
      paper: '#fff',
    },
    text: {
      primary: '#2c2c2c',
      secondary: '#4a4a4a',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
      color: '#a4ac4c',
    },
    h6: {
      color: '#a4ac4c',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#a4ac4c',
        },
      },
    },
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Every Last Bite
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: 2, p: 0.5, mr: 2 }}>
              <InputBase
                placeholder="Enter ingredients you have..."
                sx={{ ml: 1, flex: 1, color: 'inherit', minWidth: '250px' }}
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
                  Save Food, Create Amazing Meals
                </Typography>
                <Typography variant="body1" paragraph>
                  Welcome to Every Last Bite, where we help you reduce food waste by generating delicious recipes from ingredients you already have.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Simply enter the ingredients in your kitchen, and we'll suggest creative recipes to make sure nothing goes to waste.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    What We Offer
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Recipe Generation from Your Ingredients
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Food Waste Reduction Tips
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Ingredient Shelf Life Guide
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Smart Shopping Lists
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
