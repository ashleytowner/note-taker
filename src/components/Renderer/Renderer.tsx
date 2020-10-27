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
      <div dangerouslySetInnerHTML={{__html: this.parseMarkdown()}} className="Renderer">
      </div>
    );
  }
}