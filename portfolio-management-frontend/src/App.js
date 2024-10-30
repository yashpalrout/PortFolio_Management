import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage'; // Import the LandingPage
// import InvestorLogin from './components/pages/InvestorLogin'; // Create this component
// import FundManagerLogin from './components/pages/FundManagerLogin'; // Create this component
// import PortalManagerLogin from './components/pages/PortalManagerLogin'; // Create this component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                {/* <Route path="/investor-login" element={<InvestorLogin />} />
                <Route path="/fund-manager-login" element={<FundManagerLogin />} />
                <Route path="/portal-manager-login" element={<PortalManagerLogin />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
