import { createStore, combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const store = createStore(combineReducers({
   ...['system', 'tree'].reduce((acc, elem) => ({
      ...acc, [elem]: require(`./${elem}`).reducer
   }), {}),
   routing: routerReducer
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export const dispatch = store.dispatch
export const getState = store.getState
export const subscribe = store.subscribe
export const syncHistory = (history) => syncHistoryWithStore(history, store)
