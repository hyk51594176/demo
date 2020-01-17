import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { reducer } from './reducer'
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
