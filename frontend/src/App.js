import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
} from '@mui/material';
import { PlayArrow as PlayArrowIcon, Fastfood as FastfoodIcon } from '@mui/icons-material';
import IngredientSelector from './IngredientSelector';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8BA870',
      light: '#B6CFAE',
      dark: '#5C7A29',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFB347',
      light: '#FFD699',
      dark: '#FF8C00',
      contrastText: '#fff',
    },
    background: {
      default: '#FFF8E1',
      paper: '#FFFFFF',
    },
    accent: {
      main: '#6D4C41',
    },
    text: {
      primary: '#222',
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Quicksand", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#8BA870',
    },
    h6: {
      color: '#FFB347',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 14,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#8BA870',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

// Hardcoded featured recipes
const featuredRecipes = [
  {
    name: 'Apple Frangipan Tart',
    image: 'https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg',
  },
  {
    name: 'Chicken Handi',
    image: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg',
  },
  {
    name: 'Beef Wellington',
    image: 'https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg',
  },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Navigation */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <FastfoodIcon sx={{ color: '#111', fontSize: 32, mr: 1 }} />
              <Typography variant="h6" sx={{ color: '#111', fontWeight: 'bold', letterSpacing: 1 }}>
                Every Last Bite
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button sx={{ color: '#111', fontWeight: 500 }}>Home</Button>
              <Button sx={{ color: '#111', fontWeight: 500 }}>About</Button>
              <Button sx={{ color: '#111', fontWeight: 500 }}>Recipes</Button>
              <Button sx={{ color: '#111', fontWeight: 500 }}>Contact</Button>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Simple and Tasty Recipe Ideas
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
                Let's help you create delicious meals with ingredients you already have, reducing food waste one recipe at a time.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" size="large">
                  Explore
                </Button>
                <Button variant="outlined" color="primary" size="large">
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <Box component="img" src="/images/hero-image.jpg" sx={{ width: '100%', borderRadius: 4 }} /> */}
            </Grid>
          </Grid>
        </Container>

        {/* Ingredient Selector */}
        <IngredientSelector />

        {/* Recipe Cards - always show featured recipes */}
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
            {featuredRecipes.map((item, index) => (
              <Card key={index} sx={{ width: 220, minWidth: 180, mx: 1, borderRadius: 3, boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  height="120"
                  image={item.image}
                  alt={item.name}
                  sx={{ objectFit: 'cover', width: '100%', borderRadius: 2 }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography gutterBottom variant="subtitle1" component="div" sx={{ fontWeight: 600, textAlign: 'center' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Visit this incredible recipe with different and tasty ingredients
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>

        {/* Contact Section */}
        <Container maxWidth="sm" sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" gutterBottom sx={{ color: 'primary.main' }}>
            Contact us for more Info
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Have questions about reducing food waste or need recipe suggestions? We're here to help!
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Contact
          </Button>
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: '#1e2a3b', color: 'white', py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body2">
                  Our mission and values
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" gutterBottom>
                  Services
                </Typography>
                <Typography variant="body2">
                  What we offer
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" gutterBottom>
                  Help Center
                </Typography>
                <Typography variant="body2">
                  FAQs and support
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant="h6" gutterBottom>
                  Legal
                </Typography>
                <Typography variant="body2">
                  Terms and conditions
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
