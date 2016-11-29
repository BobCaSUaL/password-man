import React from 'react'
import component from 'functional-react'
import {render as domRender} from 'react-dom'
import { browserHistory, Router, Route, withRouter } from 'react-router'
import {subscribe, getState, dispatch, syncHistory} from './reducer'

import login from './login'
import tree from './tree'

const wrap = (Comp) => do {
   const componentWillMount = ({props, state}, setState) => do {
      setState(getState() || {})
      subscribe(
         () => setState(getState() || {})
      )
   }
   const render = ({ props, state }) => (<Comp {...state}/>)
   component('Wrapper', { componentWillMount, render })
}

const loggedIn = ({system: {username, password}}) => !(!username || !password)
const requireAuth = (nextState, replace) => !loggedIn(getState()) && replace({
   pathname: '/login',
   state: { nextPathname: nextState.location.pathname }
 })
domRender((
   <Router history={syncHistory(browserHistory)}>
      <Route path="/login" component={wrap(withRouter(login))}/>
      <Route path="/" component={wrap(tree)} onEnter={requireAuth}/>
   </Router>
), document.getElementById('app_container'))
