import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { setGameStarted } from './actions'

const Home = props => {
  return (
    <div className='l-centered'>
      <Link
        className='c-start-link'
        to='/setup'
        onClick={props.setGameStarted}
        >
        Start
      </Link>
      {/* <h1>Michał Januszko</h1> */}
    </div>
  )
}

Home.propTypes = {
  setGameStarted: PropTypes.func
}

export default connect(null, { setGameStarted })(Home)
