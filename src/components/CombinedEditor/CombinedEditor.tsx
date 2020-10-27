import Renderer from "../Renderer/Renderer";
import React from "react";
import Editor from "../Editor/Editor";
import Nav from "../Nav/Nav";
import "./CombinedEditor.scss"

type CombinedEditorProps = {
	onChange: (event: { markdown: string }) => unknown;
	markdown: string;
	initial?: string;
}

export default class CombinedEditor extends React.Component<CombinedEditorProps> {
	initial: string;
	constructor(props: CombinedEditorProps) {
		super(props);
		this.initial = props.initial || '';
	}

	render(): JSX.Element {
		return (
			<div className="CombinedEditor">
				<Nav />
				<Editor default={this.initial} onChange={this.props.onChange} />
				<Renderer markdown={this.props.markdown} />
			</div>
		)
	}
}