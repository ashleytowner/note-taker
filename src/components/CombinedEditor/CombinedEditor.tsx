import Renderer from '../Renderer/Renderer';
import React from 'react';
import Editor from '../Editor/Editor';
import './CombinedEditor.scss'
import { RouteComponentProps, withRouter } from 'react-router';
import MarkdownDocument from '../../types/Document';
import Firebase from 'firebase/app';
import 'firebase/firestore';
import EditorMenu from '../EditorMenu';


type CombinedEditorProps = {
  onChange: (event: { markdown: string }) => unknown;
  markdown: string;
  initial?: string;
} & RouteComponentProps;

type CombinedEditorState = {
  document?: MarkdownDocument;
}

class CombinedEditor extends React.Component<CombinedEditorProps, CombinedEditorState> {
  initial: string;
  
  
  constructor(props: CombinedEditorProps) {
    super(props);
    this.initial = props.initial || '';
    this.state = {
      document: undefined
    }
  }

  componentDidMount(): void {
    const { id } = this.props.match.params as Record<string, string>;
    Firebase.firestore().collection('documents').doc(id).get().then(doc => {
      const data = doc.data() as MarkdownDocument;
      data.markdown = data.markdown?.replace(/\\n/g, '\n');
      this.setState({
        ...this.state,
        document: data
      })
    })
  }

  handleChange = (ev: { markdown: string }) => {
    this.props.onChange(ev);
    const newState: { document: MarkdownDocument } = JSON.parse(JSON.stringify(this.state));
    newState.document && (newState.document.markdown = ev.markdown);
    this.setState(newState);
  }

  handleSave = (): void => {
    const { id } = this.props.match.params as Record<string, string>;
    if (this.state.document) {
      Firebase.firestore()
        .collection('documents')
        .doc(id)
        .update(this.state.document);
    }
  }

  render(): JSX.Element {
    return (
      <div className="CombinedEditor"> 
        <Editor 
          onSave={this.handleSave}
          value={this.state.document?.markdown}
          onChange={this.handleChange}
        />
        <Renderer markdown={this.state.document?.markdown || ''} />
        <EditorMenu
          onDelete={() => null}
          onEdit={() => null}
        ></EditorMenu>
      </div>
    )
  }
}

export default withRouter(CombinedEditor);