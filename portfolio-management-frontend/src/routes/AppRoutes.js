import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InvestorPage from "./components/pages/InvestorPage";
import FundManagerPage from "./components/pages/FundManagerPage";
import AboutPage from "./components/pages/AboutPage"; // Example additional page
import TermsPage from "./components/pages/TermsPage"; // Example additional page

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/investor" component={InvestorPage} />
        <Route path="/fund-manager" component={FundManagerPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/terms" component={TermsPage} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
