import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Container } from '@mui/material';
import Dashboard from './components/Dashboard';
import MultiPlanComparison from './components/MultiPlanComparison';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/compare">
              Compare Plans
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/compare" element={<MultiPlanComparison />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App; 