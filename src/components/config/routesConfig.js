import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "../Content/Dashboard";
import CountriesStats from "../Content/CountriesStats";
import NotFound from "../NotFound";

export const AllRoutes = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/countriesStats" component={CountriesStats} />
    <Route component={NotFound} />
  </Switch>
);
