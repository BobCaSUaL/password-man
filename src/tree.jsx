import React from 'react'
import component from 'functional-react'
import {Glyphicon, Media, Grid} from 'react-bootstrap'
import {dispatch} from './reducer'

const inspect = (obj) => require('util').inspect(obj, { depth: null })

const select = path => () => dispatch({
   type: '/tree/SELECT',
   data: { selectedPath: path }
})


const selected = ({...tree, selectedPath}) =>
   selectedPath && selectedPath.length > 0 ?
      selected({
         ...tree.children[tree.selectedPath[0]],
         selectedPath: tree.selectedPath.slice(1)
      }) : tree

const renderCategory = ({tree, path}, handle) => (
   <Grid>
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
                        type: 'recursion',
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
   </Grid>
)

const _render = ({tree, path}, handle) => renderCategory({tree, path}, handle)
const render = ({props: {tree}}, handle) => _render({
   tree: selected(tree), path: tree.selectedPath
}, handle)

export default component('Tree', {render})
