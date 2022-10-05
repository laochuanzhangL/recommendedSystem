import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.min.css'
// import './App.css'

import Home from './pages/Home'
import Login from './pages/Login' 

export default function App() {
  return (
    <div className="wrap">
      <BrowserRouter>
        <Switch>
          <Route path='/login/*' component={Login} />
          <Route path='/home' component={Home} />
          <Redirect to='/login/login' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
