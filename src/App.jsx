import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./App.css";
import Routes from "./utils/routes";

export default function App() {
  return (
    <div className="wrap">
      <BrowserRouter>
        <Switch>
          {Routes.map((item) => (
            <Route
              path={item.path}
              component={item.component}
              key={`${item.component}`}
            />
          ))}
          <Redirect to="/login/login" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
