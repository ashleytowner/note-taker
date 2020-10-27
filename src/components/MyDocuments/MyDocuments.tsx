import React from "react";
import Firebase from "firebase";

type MyDocumentsState = {
  documents: JSX.Element[]
}

export default class MyDocuments extends React.Component<unknown, MyDocumentsState> {

  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      documents: []
    }
  }

  componentDidMount(): void {
    this.getMyDocuments();
  }

  getMyDocuments = (): void => {
    const uid = Firebase.auth().currentUser?.uid;
    if (!uid) {
      setTimeout(this.getMyDocuments, 0);
      return;
    }
    Firebase.firestore().collection('documents').where('owner', '==', uid).get().then(docs => {
      const documents = docs.docs.map(doc => {
        const data = doc.data();
        return (<div key={doc.id}>{data.name}</div>);
      });
      this.setState({
        documents
      });
    });
  }

  render(): JSX.Element {
    return (
      <div className='MyDocuments'>
        <h1>My Documents</h1>
        {this.state.documents}
      </div>
    )
  }
}