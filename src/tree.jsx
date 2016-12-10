import React from 'react'
import component from 'functional-react'
import {Button, Col, Glyphicon, Grid, Media, Navbar, Table} from 'react-bootstrap'
import {dispatch} from './reducer'

const inspect = (obj) => require('util').inspect(obj, { depth: null })

const select = path => () => dispatch({
   type: '/tree/SELECT',
   data: { selectedPath: path }
})
const backPath = path => () => dispatch({
   type: '/tree/SELECT',
   data: { selectedPath: path.slice(0, -1) }
})


const selected = ({...tree, selectedPath}) =>
   selectedPath.reduce((tree, path) => tree.children[path], tree)

const renderCategory = ({tree, path, deep}, handle) => (
   <Media.List>
      {tree.children.map(({...child, children}, index) => (
         <Media.ListItem key={index}
            onClickCapture={handle(select(path.concat(index)))}>
            <Media.Left>
               <Glyphicon glyph={child.data.icon || 'asterisk'} />
            </Media.Left>
            <Media.Body>
               <Media.Heading>{child.data.name}</Media.Heading>
               {children && children.length > 0 && _render({
                  tree: {
                     type: child.type,
                     children
                  },
                  path: path.concat(index),
                  deep: deep - 1
               }, handle)}
            </Media.Body>
            <Media.Right>
               <Glyphicon glyph="chevron-right" />
            </Media.Right>
         </Media.ListItem>
      ))}
   </Media.List>
)
const renderEntry = ({tree: {data}, path}, handle) => (
   <Media key={path.slice(-1)}>
      <Media.Left>
         <Glyphicon glyph={data.icon || 'asterisk'} />
      </Media.Left>
      <Media.Body>
         <Media.Heading>{data.name}</Media.Heading>
         <Table striped={true} bordered={true} condensed={true} hover={true}>
            <tbody>
               <tr>
                  <th>username:</th>
                  <td>{data.username}</td>
               </tr>
               <tr>
                  <th>password:</th>
                  <td>{data.password instanceof Array ? data.password[0].value : data.password}</td>
               </tr>
               <tr>
                  <th>link:</th>
                  <td>{data.link}</td>
               </tr>
               <tr>
                  <th>securityQuestion:</th>
                  <td>{data.securityQuestion}</td>
               </tr>
               <tr>
                  <th>securityAnswers:</th>
                  <td>{data.securityAnswers}</td>
               </tr>
            </tbody>
         </Table>
      </Media.Body>
   </Media>
)

const _render = ({tree, path, deep}, handle) => deep > 0 && do {
   tree.type === 'root' ?
      renderCategory({tree, path, deep}, handle) :
   tree.type === 'category' ?
      renderCategory({tree, path, deep}, handle) :
   tree.type === 'entry' ?
      renderEntry({tree, path}, handle) :
   undefined
}
const render = ({props: {tree}}, handle) => (
   <Grid fluid={true}>
      <Navbar>
         <Navbar.Header>
            <Button bsStyle="primary" bsSize="large"
               onClickCapture={handle(backPath(tree.selectedPath))}>
               <Glyphicon glyph={
                  tree.selectedPath.length > 0 ?
                     'chevron-left' : 'menu-hamburger'
                  }/>
            </Button>
         </Navbar.Header>
         <Navbar.Header>
            <Navbar.Brand>
               PasswordMan
            </Navbar.Brand>
         </Navbar.Header>
      </Navbar>
      <Grid>
         {
            _render({
               tree: selected(tree), path: tree.selectedPath,
               deep: 1
            }, handle)
         }
      </Grid>

      <pre>{inspect(selected(tree))}</pre>
   </Grid>
)

export default component('Tree', {render})
