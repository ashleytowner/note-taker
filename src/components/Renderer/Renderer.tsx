import React from 'react';
import Markdown from 'markdown-it';
import Highlight from 'highlight.js';
import './Renderer.scss';
import '../../assets/dracula.css';
import Emoji from 'markdown-it-emoji';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Latex from 'markdown-it-latex';
import 'markdown-it-latex/dist/index.css'

type RendererProps = {
  markdown: string;
}

export default class Renderer extends React.Component<RendererProps> {
  parseMarkdown = (): string => {
    const md = new Markdown({
      linkify: true,
      langPrefix: 'language-',
      highlight: (str, lang) => {
        if (lang && Highlight.getLanguage(lang)) {
          try {
            return Highlight.highlight(lang , str).value
          } catch (e) {
            console.error(e);
          }
        }
        return '';
      }
    })
      .use(Emoji)
      .use(Latex);
    return md.render(this.props.markdown);
  }

  render(): JSX.Element {
    return (
      <div dangerouslySetInnerHTML={{__html: this.parseMarkdown()}} className="Renderer">
      </div>
    );
  }
}