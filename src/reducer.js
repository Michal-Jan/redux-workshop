import { createStore, compose, applyMiddleware } from "redux"
import ReduxThunk from 'redux-thunk'
import { 
    SET_GAME_STARTED, 
    SETUP_APP,
    RESET_GAME,
} from './actionTypes'

const defaultState = {
    nick: '',
    difficulty: null,
    gameStarted: false
  }

const reducer = (state = defaultState, action) => {
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

const store = createStore(
    reducer,
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export {
    store
}