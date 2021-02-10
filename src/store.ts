import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import rootReducer from './modules'


const history = createBrowserHistory()

const initialState = {}
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history),
]

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window as any

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

export default createStore(
  rootReducer,
  initialState,
  composedEnhancers,
)
