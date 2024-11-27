import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import RideEstimate from './pages/RideEstimate';
import RideConfirm from './pages/RideConfirm';
import History from './pages/History';
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estimate" element={<RideEstimate />} />
            <Route path="/confirm" element={<RideConfirm />} />
            <Route path="/history" element={<History />} />
            <Route path="create-user"element={<CreateUser/>}/>
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;