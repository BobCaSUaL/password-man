import React from 'react'
import component from 'functional-react'
import {Button, Glyphicon, Grid, Media, Navbar} from 'react-bootstrap'
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
   selectedPath && selectedPath.length > 0 ?
      selected({
         ...tree.children[tree.selectedPath[0]],
         selectedPath: tree.selectedPath.slice(1)
      }) : tree

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
const renderEntry = ({tree, path}, handle) => (
   <Media key={path.slice(-1)}>
      <Media.Left>
         <Glyphicon glyph={tree.data.icon || 'asterisk'} />
      </Media.Left>
      <Media.Body>
         <Media.Heading>{tree.data.name}</Media.Heading>
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
   <div>
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

      <pre>{inspect(select(tree))}</pre>
   </div>
)

export default component('Tree', {render})
