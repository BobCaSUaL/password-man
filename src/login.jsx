import React from 'react'
import component from 'functional-react'
import _ from 'lodash'
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button, Grid} from 'react-bootstrap'
import {dispatch} from './reducer'

const FieldGroup = ({ id, label, help, ...props }) => (
   <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
   </FormGroup>
)

const auth = ({props: {location, router}, event: {target}}) => dispatch({
   type: '/system/LOGIN',
   data: {...(_.mapValues(target.elements,
      (e, k) => (isNaN(parseInt(k)) || undefined) && e.value)
   )}
}) & location.state && location.state.nextPathname ?
   router.replace(location.state.nextPathname) :
   router.replace('/')

const render = ({props}, handle) => (
   <Grid>
      <form action="" onSubmit={handle(auth)}>
         <FieldGroup
            id="username"
            name="username"
            type="text"
            label="username"
            placeholder="username"/>
         <FieldGroup
            id="password"
            name="password"
            type="password"
            label="password"
            placeholder="password"/>
         <Button type='submit'>Accedi</Button>
      </form>
   </Grid>
)

export default component('Home', {render})
