import { 
    SET_GAME_STARTED, 
    SETUP_APP,
    RESET_GAME,
    GET_QUESTIONS,
} from './actionTypes'
import { fetchQuestions } from './helpers'
import { shuffle } from 'lodash'

export const setGameStarted = () => dispatch => {
    dispatch(setGameStartedAction())
}

export const setupApp = (nick, difficulty) => dispatch => {
    dispatch(setupAppAction(nick, difficulty))
}

export const resetGame = () => dispatch => {
    dispatch(resetGameAction())
}

// action creator
export const setGameStartedAction = () => ({
    type: SET_GAME_STARTED
})

export const setupAppAction = (nick, difficulty) => ({
    type: SETUP_APP,
    payload: { nick, difficulty }
})

export const resetGameAction = () => ({
    type: RESET_GAME
})

export const getQuestions = difficulty => async dispatch => {
    const response = await fetchQuestions(difficulty)

    const questions = response.map(item => {
        const {
            incorrectAnswers,
            ...rest
        } = item

        return {
            ...rest,
            answers: shuffle([rest.correctAnswer, ...incorrectAnswers])
        }
    })

    dispatch(getQuestionsAction(questions))
}

export const getQuestionsAction = questions => ({
    type: GET_QUESTIONS,
    payload: questions
})