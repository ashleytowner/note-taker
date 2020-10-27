import React from 'react';
import { Link } from 'react-router-dom';
import MarkdownDocument from '../../types/Document';
import './DocumentCard.scss';

type DocumentCardProps = {
  document: MarkdownDocument;
  href: string;
}

export default class DocumentCard extends React.Component<DocumentCardProps> {

  render(): JSX.Element {
    return (
      <div className="DocumentCard">
        <Link to={this.props.href}>{this.props.document.name}</Link>
        <p>{this.props.document.tags.join(',')}</p>
      </div>
    )
  }
}