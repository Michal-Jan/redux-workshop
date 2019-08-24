import React from 'react'
import PropTypes from 'prop-types'
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { setGameStarted } from './reducer'

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

const mapDispatchToProps = dispatch => ({
  setGameStarted: () => {
    dispatch(setGameStarted())
  }
})

export default connect(null, mapDispatchToProps)(Home)
