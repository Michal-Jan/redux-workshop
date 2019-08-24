import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux' 
import { setupApp } from './actions'

class Setup extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      name: '',
      difficulty: ''
    }
  }

  componentDidMount () {
    const {
      history,
      gameStarted
    } = this.props

    if (!gameStarted) {
      history.replace('/')
    }
  }

  async onSubmit (e) {
    e.preventDefault()

    const {
      props: {
        setupApp,
        history
      },
      refs: {
        nickName: {
          value: nickNameVal
        },
        difficulty: {
          value: difficultyVal
        }
      }
    } = this

    if (!nickNameVal.length) {
      window.alert('Please enter the name :)')
      return
    }

    await setupApp(nickNameVal, difficultyVal)
    history.push('/game')
    
  }

  render () {
    return (
      <div className='l-centered'>
        <form
          className='f-start'
          onSubmit={this.onSubmit}
        >
          <label
            className='f-start__label'
            htmlFor='nickname'
          >
            Nick:
          </label>
          <input
            className='f-start__control'
            type='text'
            ref='nickName'
            id='nickname'
            autoFocus
          />
          <label
            className='f-start__label'
            htmlFor='difficulty'
          >
            Difficulty:
          </label>
          <select
            ref='difficulty'
            id='difficulty'
            className='f-start__control'
          >
            <option
              value='easy'
            >
              Easy
            </option>
            <option
              value='medium'
            >
              Medium
            </option>
            <option
              value='hard'
            >
              Hard
            </option>
          </select>
          <button
            className='f-start__action'
            type='submit'
          >
            Start
          </button>
        </form>
      </div>
    )
  }
}

Setup.propTypes = {
  setupApp: PropTypes.func,
  gameStarted: PropTypes.bool,
  history: PropTypes.object
}

const mapStateToProps = state => ({
  gameStarted: state.gameStarted
})

export default connect(mapStateToProps, { setupApp })(Setup)
