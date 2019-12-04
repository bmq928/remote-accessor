import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bulma/css/bulma.css'

import Navbar from './shares/Navbar'
import LazyWrapper from './shares/LazyWrapper'
import './App.scss'

const Page404 = React.lazy(() => import('./pages/Page404'))
const FileStoragePage = React.lazy(() => import('./pages/FileStoragePage'))
const ProcessMonitorPage = React.lazy(() => import('./pages/ProcessMonitorPage'))

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/files" component={LazyWrapper(FileStoragePage)} />
          <Route exact path="/programs" component={LazyWrapper(ProcessMonitorPage)} />
          <Route component={LazyWrapper(Page404)} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
