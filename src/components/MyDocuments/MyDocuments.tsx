import React from 'react';
import Firebase from 'firebase/app';
import 'firebase/firestore';
import { UserContext } from '../../providers/UserProvider';
import DocumentCard from '../DocumentCard/DocumentCard';
import MarkdownDocument from '../../types/Document';
import './MyDocuments.scss'
import PromptBox from '../PromptBox';

type MyDocumentsState = {
  documents: JSX.Element[]
}

export default class MyDocuments extends React.Component<Record<string, unknown>, MyDocumentsState> {

  mounted = false;

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      documents: []
    }
  }

  private createDocument = () => {
    if (!this.context.user?.uid) return;
    const newDoc: MarkdownDocument = {
      created: new Date(),
      name: 'New Document',
      owner: this.context.user.uid,
      markdown: '# New Document\nGet Started',
      tags: [],
      users: {
        [this.context.user.uid]: [
          'READ',
          'DELETE',
          'UPDATE'
        ]
      }
    };
    Firebase.firestore().collection('documents')
      // .add(newDoc)
      .doc()
      .set(newDoc)
      .then(() => {
        this.fetchData();
      })
  }

  private fetchData = () => {
    if (!this.context.user?.uid) return;
    this.getMyDocuments(this.context.user.uid).then(documents => {
      if (this.mounted) {
        this.setState({
          documents
        })
      }
    })
  }

  componentDidMount(): void {
    this.mounted = true;
    this.fetchData();
  }

  componentWillUnmount(): void {
    this.mounted = false;
  }

  componentDidUpdate(): void {
    if (this.state.documents.length === 0) {
      this.fetchData();
    }
  }

  getMyDocuments = async (uid?: string): Promise<JSX.Element[]> => {
    if (!uid) return [];
    const docs = await Firebase.firestore()
      .collection('documents')
      .where('owner', '==', uid)
      .get();
    return docs.docs.map(doc => {
      const data = doc.data() as MarkdownDocument;
      return <DocumentCard
        key={doc.id}
        href={`/edit/${doc.id}`}
        document={data}
      ></DocumentCard>
      // return <Link to={`/edit/${doc.id}`} key={doc.id}>{data.name}</Link>
    })
  }

  render(): JSX.Element {
    return (
      <div className='MyDocuments'>
        <h1>My Documents</h1>
        <button onClick={this.createDocument}>New</button>
        <PromptBox onSubmit={() => null} message="Please enter a file name."></PromptBox>
        <div className="file-grid">
          {this.state.documents}
        </div>
      </div>
    )
  }
}
MyDocuments.contextType = UserContext;