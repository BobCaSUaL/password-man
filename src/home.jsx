import React from 'react'
import component from 'functional-react'
import {FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock, Button, Grid} from 'react-bootstrap'

const FieldGroup = ({ id, label, help, ...props }) => (
   <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
   </FormGroup>
)

const auth = ({props}) => 'username' + 'password'

const render = ({props}, handler) => (
   <Grid>
      <form>
         <FieldGroup
            id="username"
            type="text"
            label="username"
            placeholder="username"/>
         <FieldGroup
            id="password"
            type="password"
            label="password"
            placeholder="password"/>
         <Checkbox>resta collegato</Checkbox>
         <Button type='submit' onClick={handler(auth)}>Accedi</Button>
      </form>
   </Grid>
)

export default component({render})
