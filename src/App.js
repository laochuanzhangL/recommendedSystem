import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.min.css'
// import './App.css'

import Home from './pages/home'
import Register from './pages/Login'

export default function App() {
  return (
    <div className="wrap">
      <BrowserRouter>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/home' component={Home} />
          <Redirect to='register' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
