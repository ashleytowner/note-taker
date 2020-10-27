import React from "react";
import './Editor.scss';

type EditorProps = {
	onChange?: (event: { markdown: string }) => unknown;
	default?: string;
}

type EditorState = {
	document: string;
}

export default class Editor extends React.Component<EditorProps, EditorState> {

	initial: string;

	constructor(props: EditorProps) {
		super(props);
		this.initial = localStorage.getItem('document') || '';
		this.state = {
			document: this.initial
		}
		this.saveDocument();
		props.onChange && props.onChange({ markdown: this.initial });
	}

	saveDocument = (): void => {
		localStorage.setItem('document', this.state.document);
		setTimeout(this.saveDocument, 500);
	}

	handleChange = (event: React.ChangeEvent<HTMLDivElement>): void => {
		if (this.props.onChange) {
			const ev = {
				markdown: event.target.innerText,
			}
			this.setState({
				document: ev.markdown
			})
			this.props.onChange(ev);
		}
	}

	parseDefault(input: string): JSX.Element[] {
		return input.split('\n')
					.filter(s => !!s)
					.map(s => <p key={s}>{s}</p>)
	}

	render(): JSX.Element {
		return (
			<div
				className="Editor"
				contentEditable
				onInput={this.handleChange}
				onBlur={this.handleChange}
				suppressContentEditableWarning={true}
			>
				{this.parseDefault(this.initial || '')}
			</div>
		)
	}
}

