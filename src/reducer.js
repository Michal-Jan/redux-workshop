import { 
    createStore, 
    compose, 
    applyMiddleware, 
    combineReducers 
} from "redux"
import ReduxThunk from 'redux-thunk'
import { 
    SET_GAME_STARTED, 
    SETUP_APP,
    RESET_GAME,
    GET_QUESTIONS,
} from './actionTypes'

const defaultState = {
    nick: '',
    difficulty: null,
    gameStarted: false
  }

const gameState = {
    questions: [],
    currentQuestion: {},
    answers: [],
    currentQuestionNumber: 0,
    answer: {}
}

const mainReducer = (state = defaultState, action) => {
    const { type, payload } = action

    switch (type) {
        case SET_GAME_STARTED:
            return {
                ...state, 
                gameStarted: true
            }
        case SETUP_APP: 
            return {
                ...state, 
                nick: payload.nick,
                difficulty: payload.difficulty,
            }
        case RESET_GAME:
            return {
                ...defaultState
            }
        default:
            return state
    }
}

const gameReducer = (state = gameState, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: payload
            }
        default:
            return state
    }
}

const store = createStore(
    combineReducers({
        mainReducer,
        gameReducer,
    }),
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export {
    store
}