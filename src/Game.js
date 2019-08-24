import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Questions from './Questions'
import Background from './Background'
import SidePanel from './SidePanel'
import EndScreen from './EndScreen'
import { connect } from 'react-redux' 
import { resetGame, getQuestions, setBadAnswer, setGoodAnswer } from './actions'


class Game extends Component {
  constructor (props) {
    super(props)

    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.setCurrentAnswer = this.setCurrentAnswer.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }

  componentDidMount () {
    const {
      appSettings: {
        nick,
        difficulty,
        gameStarted
      },
      history
    } = this.props

    if (!nick || !difficulty || !gameStarted) {
      history.replace('/')
      return
    }

    this.fetchQuestions()
  }

  async resetGame () {
    await this.props.resetGame()
    this.props.history.push('/')
  }

  fetchQuestions () {
    this.props.getQuestions(this.props.appSettings.difficulty)
  }

  setCurrentAnswer (answer) {
    return () => {
      const {
        questions,
        currentQuestionNumber,
        setGoodAnswer,
        setBadAnswer
      } = this.props

      const currentQuestion = questions[currentQuestionNumber]

      return answer === currentQuestion.correctAnswer ? setGoodAnswer() : setBadAnswer()
    }
  }

  render () {
  
    const {
      questions,
      currentQuestionNumber,
      hasWon,
      isGameFinished,
    } = this.props

    if (!questions.length) {
      return null
    }

    const {
      question,
      correctAnswer,
      answers,
    } = questions[currentQuestionNumber]

    return isGameFinished
      ? (
        <EndScreen
          hasWon={hasWon}
          currentQuestionNumber={currentQuestionNumber}
          resetGame={this.resetGame}
        />
      )
      : (
        <div className='l-game'>
          <Background>
            <div className='c-questions'>
              <Questions
                question={question}
                answers={answers}
                correctAnswer={correctAnswer}
                onSelect={this.setCurrentAnswer}
              />
            </div>
          </Background>
          <SidePanel
            currentQuestionNumber={currentQuestionNumber}
            correctAnswer={correctAnswer}
            answers={answers}
            setCurrentQuestionAnswers={this.setCurrentQuestionAnswers}
          />
        </div>
      )
  }
}

Game.propTypes = {
  appSettings: PropTypes.object,
  history: PropTypes.object,
  resetGame: PropTypes.func,
  questions: PropTypes.array,
  getQuestions: PropTypes.func, 
  setBadAnswer: PropTypes.func,  
  setGoodAnswer: PropTypes.func
}

const mapStateToProps = state => ({
  appSettings: state.mainReducer,
  questions: state.gameReducer.questions,
  currentQuestionNumber: state.gameReducer.currentQuestionNumber,
  hasWon: state.mainReducer.hasWon,
  isGameFinished: state.mainReducer.isGameFinished,
})

export default connect(mapStateToProps, { resetGame, getQuestions, setBadAnswer,  setGoodAnswer })(Game)
