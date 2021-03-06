import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bulma/css/bulma.css'

import Navbar from './shares/Navbar'
import LazyWrapper from './shares/LazyWrapper'
import './App.scss'

const Page404 = React.lazy(() => import('./pages/Page404'))
const FileStoragePage = React.lazy(() => import('./pages/FileStoragePage'))
const ProcessMonitorPage = React.lazy(() => import('./pages/ProcessMonitorPage'))
const SnapshotPage = React.lazy(() => import('./pages/SnapshotPage'))
const WebcamPage = React.lazy(() => import('./pages/WebcamPage'))
const ScreenRecorderPage = React.lazy(() => import('./pages/ScreenRecorderPage'))

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LazyWrapper(FileStoragePage)} />
          <Route exact path="/files" component={LazyWrapper(FileStoragePage)} />
          <Route exact path="/programs" component={LazyWrapper(ProcessMonitorPage)} />
          <Route exact path="/snapshot" component={LazyWrapper(SnapshotPage)} />
          <Route exact path="/webcam" component={LazyWrapper(WebcamPage)} />
          <Route exact path="/screen" component={LazyWrapper(ScreenRecorderPage)} />
          <Route component={LazyWrapper(Page404)} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
