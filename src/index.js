// schema规定哪些元素能包含哪些元素不能包含
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
// import { sc } from "prosemirror-schema-basic";
import { history, redo, undo } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { Schema, Slice, DOMParser } from "prosemirror-model";
import { ReplaceStep  } from 'prosemirror-transform';
import { schema } from 'prosemirror-schema-basic';


const pDOM = ["p", 0];

const schema1 = new Schema({
	nodes: {
		doc: {
			content: "block+",
		},
		paragraph: {
			content: "text*",
			group: 'block',
			parseDOM: [{ tag: "p" }],
			toDOM() {
				return pDOM;
			},
		},
		blockquote: {group: "block", content: "block+"},
		text: { inline: true },
		/* ... and so on */
	},
});

const content = document.querySelector('#content');

const state = EditorState.create({
	doc: DOMParser.fromSchema(schema1).parse(content)
});
console.log('state1', state);
const step = new ReplaceStep(3, 5, Slice.empty);
const result = step.apply(state.doc);
console.log('result', result);

const view = new EditorView(document.querySelector('#editor'), {
	state
});

window.view = view;
