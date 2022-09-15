import React from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import 'antd/dist/antd.min.css'
import './App.css'

import Home from './pages/home'

export default function App() {
  return (
    <div className="wrap">
      <BrowserRouter>
        <Switch>
          <Route path='/home' component={Home} />
          <Redirect to='home' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}
