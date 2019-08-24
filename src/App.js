import React from 'react'
import PropTypes from 'prop-types'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import Home from './Home'
import Setup from './Setup'
import Game from './Game'

class App extends React.Component {
  
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            component={Home}
          />
          <Route
            exact
            path='/setup'
            component={Setup}
          />
          <Route
            exact path='/game'
            component={Game}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

App.propTypes = {
  history: PropTypes.object
}

export default App
