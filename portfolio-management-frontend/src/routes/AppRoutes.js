// src/routes/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../components/pages/LandingPage';
import InvestorPage from '../components/pages/InvestorPage';
import FundManagerPage from '../components/pages/FundManagerPage';
import PortalManagerPage from '../components/pages/PortalManagerPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact component={LandingPage} />
            <Route path="/investor" component={InvestorPage} />
            <Route path="/fund-manager" component={FundManagerPage} />
            <Route path="/portal-manager" component={PortalManagerPage} />
        </Routes>
    );
};

export default AppRoutes;
