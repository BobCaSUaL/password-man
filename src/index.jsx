import React from 'react'
import {render} from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'

import Home from './home'
/*************************** application rendering ****************************/
render((
   <Router history={browserHistory}>
      <Route path="*" component={Home}/>
   </Router>
), document.getElementById('app_container'))
