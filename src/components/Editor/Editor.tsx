import React from "react";
import Markdown from 'markdown-it';
import './Editor.scss';

type EditorProps = {
	onChange?: (event: string) => unknown;
}

type EditorState = {
	rendered: string
}

export default class Editor extends React.Component<EditorProps, EditorState> {

	constructor(props: EditorProps) {
		super(props);
		this.state = {
			rendered: ''
		}
	}

	handleChange = (event: React.ChangeEvent<HTMLDivElement>): void => {
		if (this.props.onChange) {
			this.props.onChange(event.target.innerText || '');
		}
		this.setState({
			rendered: new Markdown().render(event.target.innerText)
		})
	}

	// renderColours = (tokens: Token[]): void => {
	// 	console.log(tokens);
	// 	const tokenTypes = tokens
	// 		.map(tk => tk.type)
	// 		.filter((t, ind, arr) => arr.indexOf(t) === ind)
	// 		.sort();
	// 	console.log(tokenTypes);
	// }

	render(): JSX.Element {
		return (
			<div
				className="Editor"
				style={{fontFamily: 'fira code', position: 'absolute', height: '100vh', width: '50vw'}}
				contentEditable
				onInput={this.handleChange}
			></div>
		)
	}
}

