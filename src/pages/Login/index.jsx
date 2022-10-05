import React from "react";
import { Route, Switch } from 'react-router-dom'

// 自己的组件引入
import { User, Register } from "./components/index";

export default function Login() {
  return (
    <div>
        <Switch>
          <Route path='/login/login' component={User} />
          <Route path='/login/register' component={Register} />
        </Switch>
    </div>
  );
}
