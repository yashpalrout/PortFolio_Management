import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage'; // Import the LandingPage
import InvestorPage from './components/pages/InvestorPage';
import FundManagerPage from './components/pages/FundManagerPage'
// import InvestorLogin from './components/pages/InvestorLogin'; // Create this component
// import FundManagerLogin from './components/pages/FundManagerLogin'; // Create this component
// import PortalManagerLogin from './components/pages/PortalManagerLogin'; // Create this component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/InvestorPage" element={<InvestorPage />} />
                <Route path="/FundManagerPage" element={<FundManagerPage />} />
                {/* <Route path="/portal-manager-login" element={<PortalManagerLogin />} /> */} 
            </Routes>
        </Router>
    );
};

export default App;
