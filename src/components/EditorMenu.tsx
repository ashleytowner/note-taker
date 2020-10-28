import React from 'react';

type EditorMenuProps = {
  /**
   * Delete file callback.
   */
  onDelete?: () => void;
  /**
   * Edit file metadata & details callback.
   */
  onEdit?: () => void;
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
  gap: '1rem'
}

export default class EditorMenu extends React.Component<EditorMenuProps> {

  private handleDelete = () => {
    this.props.onDelete && this.props.onDelete();
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
          <button style={buttonStyles} onClick={this.handleDelete}>
            <i style={iconStyles} className="material-icons">delete</i>
          </button>
        }
      </div>
    )
  }
}