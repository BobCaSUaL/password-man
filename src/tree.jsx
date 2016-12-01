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

const renderCategory = ({tree, path}, handle) => (
   <Media.List>
      {tree.children.map(({...child, children}, index) => (
         <Media.ListItem key={index}
            onClickCapture={handle(select(path.concat(index)))}>
            <Media.Left>
               <Glyphicon glyph={child.data.icon} />
            </Media.Left>
            <Media.Body>
               <Media.Heading>{child.data.name}</Media.Heading>
               {children && children.length > 0 && _render({
                  tree: {
                     type: child.type,
                     children
                  },
                     path: path.concat(index)
                  }, handle)
               }
            </Media.Body>
            <Media.Right>
               <Glyphicon glyph="chevron-right" />
            </Media.Right>
         </Media.ListItem>
      ))}

      {path.length <= 0 && (<pre>{inspect(tree)}</pre>)}
   </Media.List>
)
const renderEntry = ({tree, path}, handle) => (
   <Media key={path.slice(-1)}>
      <Media.Left>
         <Glyphicon glyph={tree.data.icon} />
      </Media.Left>
      <Media.Body>
         <Media.Heading>{tree.data.name}</Media.Heading>
      </Media.Body>
      <Media.Right>
         <Glyphicon glyph="chevron-right" />
      </Media.Right>
   </Media>
)

const _render = ({tree, path}, handle) => do {
   tree.type === 'root' ?
      renderCategory({tree, path}, handle) :
   tree.type === 'category' ?
      renderCategory({tree, path}, handle) :
   tree.type === 'entry' ?
      renderEntry({tree, path}, handle) :
   null
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
               tree: selected(tree), path: tree.selectedPath
            }, handle)
         }
      </Grid>
   </div>
)

export default component('Tree', {render})
