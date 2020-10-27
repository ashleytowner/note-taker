import React from "react";
import Markdown from 'markdown-it';
import './Renderer.scss';

type RendererProps = {
	markdown: string;
}

export default class Renderer extends React.Component<RendererProps> {
	parseMarkdown = (): string => {
		const md = new Markdown();
		return md.render(this.props.markdown);
	}

	render(): JSX.Element {
		return (
			<div className="Renderer" style={{position: 'absolute', right: 0, height: '100vh', width: '50vw'}}>
				<p dangerouslySetInnerHTML={{__html: this.parseMarkdown()}}></p>
			</div>
		);
	}
}