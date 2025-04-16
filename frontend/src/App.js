import React, { useRef, useEffect, useState } from 'react';
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
  TextField,
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

// FoodSavedToday component
function FoodSavedToday() {
  const BASE = 128;
  const [saved, setSaved] = useState(BASE);
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const key = `foodSaved_${today}`;
    let val = localStorage.getItem(key);
    if (!val) {
      val = BASE;
    } else {
      val = parseInt(val, 10) + 1;
    }
    setSaved(val);
    localStorage.setItem(key, val);
  }, []);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ minWidth: 280, bgcolor: '#f7fff2', boxShadow: 4, borderRadius: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h2" sx={{ color: 'success.main', fontWeight: 700, mb: 1 }}>
          {saved} kg
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
          of food saved today!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Thanks to our community, we're making a real impact on food waste every single day.
        </Typography>
      </Card>
    </Box>
  );
}

function App() {
  // Section refs for scrolling
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const recipesRef = useRef(null);
  const contactRef = useRef(null);
  // Scroll handler
  const scrollTo = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
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
              <Button sx={{ color: '#111', fontWeight: 500 }} onClick={() => scrollTo(homeRef)}>Home</Button>
              <Button sx={{ color: '#111', fontWeight: 500 }} onClick={() => scrollTo(aboutRef)}>About</Button>
              <Button sx={{ color: '#111', fontWeight: 500 }} onClick={() => scrollTo(recipesRef)}>Recipes</Button>
              <Button sx={{ color: '#111', fontWeight: 500 }} onClick={() => scrollTo(contactRef)}>Leave a Suggestion</Button>
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <span ref={homeRef} />
        <Container
          maxWidth="xl"
          sx={{
            mt: 0,
            mb: 10,
            py: { xs: 8, md: 14 },
            minHeight: { xs: 400, md: 600 },
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: { xs: '2.5rem', md: '4rem' }, mb: 3 }}
              >
                Simple and Tasty Recipe Ideas
              </Typography>
              <Typography
                variant="h5"
                paragraph
                sx={{ mb: 5, color: 'text.secondary', fontSize: { xs: '1.1rem', md: '1.5rem' } }}
              >
                Let's help you create delicious meals with ingredients you already have, reducing food waste one recipe at a time.
              </Typography>
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ px: 5, py: 1.5, fontSize: '1.25rem', borderRadius: 3 }}
                  onClick={() => scrollTo(recipesRef)}
                >
                  Explore
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ px: 5, py: 1.5, fontSize: '1.25rem', borderRadius: 3 }}
                  onClick={() => scrollTo(aboutRef)}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <Box component="img" src="/images/hero-image.jpg" sx={{ width: '100%', borderRadius: 4 }} /> */}
            </Grid>
          </Grid>
        </Container>

        {/* About Section */}
        <span ref={aboutRef} />
        <Box sx={{ py: 6, px: 2, bgcolor: 'background.paper', mb: 8 }}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>About Every Last Bite</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Our mission is to help you make the most of the ingredients you already have, reducing food waste and inspiring creativity in the kitchen. Select your ingredients, get meal ideas, and enjoy delicious recipes tailored to you.
            </Typography>
            {/* Food Saved Today Component */}
            <FoodSavedToday />
          </Container>
        </Box>


        {/* Ingredient Selector */}
        <span ref={recipesRef} />
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

        {/* Suggestion Form Section */}
        <span ref={contactRef} />
        <Container maxWidth="sm" sx={{ textAlign: 'center', mb: 8, bgcolor: '#fff', py: 5, borderRadius: 3, boxShadow: 2 }}>
          <Typography variant="h3" gutterBottom sx={{ color: 'primary.main' }}>
            Leave a Recipe Suggestion
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Have a great recipe idea or suggestion? Let us know below!
          </Typography>
          <Box component="form" sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={e => {
            e.preventDefault();
            // Simple demo: just show an alert
            alert('Thank you for your suggestion!');
            e.target.reset();
          }}>
            <TextField name="name" label="Your Name" variant="outlined" fullWidth required />
            <TextField name="email" label="Email (optional)" variant="outlined" fullWidth type="email" />
            <TextField name="suggestion" label="Your Recipe Suggestion" variant="outlined" fullWidth required multiline rows={4} />
            <Button type="submit" variant="contained" color="primary" size="large">
              Submit Suggestion
            </Button>
          </Box>
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
