import { 
    SET_GAME_STARTED, 
    SETUP_APP,
    RESET_GAME,
} from './actionTypes'

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
