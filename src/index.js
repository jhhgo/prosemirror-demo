import { schema } from 'prosemirror-schema-basic'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { undo, redo, history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap } from 'prosemirror-commands'
import { DOMParser } from 'prosemirror-model'

const content = document.querySelector('#content')
const state = EditorState.create({
  doc: DOMParser.fromSchema(schema).parse(content)
})
console.log('initial state', state)
const view = new EditorView(document.body, {state, dispatchTransaction(transaction) {
  let newState = view.state.apply(transaction)
  console.log('newState', newState)
  view.updateState(newState)
}})