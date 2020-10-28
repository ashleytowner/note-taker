import React from 'react';
import PromptBox from './PromptBox';

type EditorMenuProps = {
  /**
   * Delete file callback.
   */
  onDelete?: () => void;
  /**
   * The string a user must type in order to successfully trigger the delete.
   */
  deleteConfirmation: string;
  /**
   * Edit file metadata & details callback.
   */
  onEdit?: () => void;
}

type EditorMenuState = {
  confirmDelete: boolean;
  deleteComplete: boolean;
}

const buttonStyles: React.CSSProperties = {
  background: 'var(--button-alt)',
  padding: '0.5rem'
}

const iconStyles: React.CSSProperties = {
  color: 'black'
}

const divStyles: React.CSSProperties = {
  display: 'flex',
  position: 'absolute',
  bottom: '1rem',
  gap: '1rem',
  marginLeft: '1rem'
}

export default class EditorMenu extends React.Component<EditorMenuProps, EditorMenuState> {

  state = {
    confirmDelete: false,
    deleteComplete: false
  }

  private beginDelete = (): void => {
    this.setState({
      confirmDelete: true
    })
  }

  private handleDelete = (confirmation: string) => {
    if (confirmation === this.props.deleteConfirmation) {
      this.props.onDelete && this.props.onDelete();
    }
  }

  private handleEdit = () => {
    this.props.onEdit && this.props.onEdit();
  }

  render(): JSX.Element {
    return (
      <div className="EditorMenu" style={divStyles}>
        {
          this.props.onEdit &&
          <button style={buttonStyles} onClick={this.handleEdit}>
            <i style={iconStyles} className="material-icons">edit</i>
          </button>
        }
        {
          this.props.onDelete &&
          <button style={buttonStyles} onClick={this.beginDelete}>
            <i style={iconStyles} className="material-icons">delete</i>
          </button>
        }
        {
          this.state.confirmDelete &&
          <PromptBox 
            message={
              `Are you sure you want to delete this document? This action cannot be undone. To delete, type "${this.props.deleteConfirmation}"`}
            onSubmit={this.handleDelete}
            onCancel={() => {this.setState({confirmDelete: false})}}
            okButtonText="Delete"
          ></PromptBox>
        }
      </div>
    )
  }
}