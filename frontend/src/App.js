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
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';

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
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Navigation */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'primary.main', fontWeight: 'bold' }}>
              Every Last Bite
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="primary">Home</Button>
              <Button color="primary">About</Button>
              <Button color="primary">Recipes</Button>
              <Button color="primary">Contact</Button>
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
              <Box component="img" src="/images/hero-image.jpg" sx={{ width: '100%', borderRadius: 4 }} />
            </Grid>
          </Grid>
        </Container>

        {/* Recipe Cards */}
        <Container maxWidth="lg" sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            {[
              { title: 'Fresh Fruit Smoothies', image: '/images/smoothie.jpg' },
              { title: 'Healthy Banana Treats', image: '/images/banana.jpg' },
              { title: 'Citrus Refreshments', image: '/images/citrus.jpg' }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visit this incredible recipe with different and tasty juice
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Video Section */}
        <Box sx={{ position: 'relative', mb: 8 }}>
          <Box
            component="img"
            src="/images/video-thumbnail.jpg"
            sx={{
              width: '100%',
              height: 400,
              objectFit: 'cover',
            }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            <PlayArrowIcon sx={{ color: 'white', fontSize: 40 }} />
          </IconButton>
        </Box>

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
