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

  saveDocument = (previous?: string): void => {
    if (JSON.stringify(this.state.document) !== previous) {
      localStorage.setItem('document', this.state.document);
      console.log('saving...');
    }
    const currentString = JSON.stringify(this.state.document);
    setTimeout(() => {
      this.saveDocument(currentString)
    }, 500);
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (this.props.onChange) {
      const ev = {
        markdown: event.target.value,
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
    // <div
    //   className="Editor"
    //   contentEditable
    //   onInput={this.handleChange}
    //   onBlur={this.handleChange}
    //   suppressContentEditableWarning={true}
    // >
    //   {this.parseDefault(this.initial || '')}
    // </div>
      <textarea onChange={this.handleChange} defaultValue={this.initial} className="Editor">
      </textarea>
    )
  }
}

