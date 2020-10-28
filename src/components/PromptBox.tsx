import React from 'react';

type PromptBoxProps = {
  /**
   * Callback function upon submission of prompt input.
   */
  onSubmit: (input: string) => void;
  /**
   * Cancel handler
   */
  onCancel: () => void;
  /**
   * The message to display to the user
   */
  message: string;
  /**
   * The message to display on the confirmation button
   * @default 'Okay'
   */
  okButtonText?: string;
  /**
   * The message to display on the cancel button
   * @default 'Cancel'
   */
  cancelButtonText?: string;
}

export default class PromptBox extends React.Component<PromptBoxProps, { value: string }> {

  state = {
    value: ''
  }

  private modalStyles: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 100,
    padding: '1rem',
    borderRadius: '4px',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 0px 1000px rgba(0, 0, 0, 0.8)',
    backgroundColor: 'var(--background)'
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: event.target.value
    });
  }

  private handleSubmit = (): void => {
    this.props.onSubmit(this.state.value || '');
  }

  private handleCancel = (): void => {
    this.props.onCancel();
  }
  
  render(): JSX.Element {
    return (
      <div className="modal" style={this.modalStyles}>
        <p>{this.props.message}</p>
        <input onChange={this.handleChange} type="text" />
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <button
            onClick={this.handleCancel}
            style={{backgroundColor: 'var(--button-alt)'}}
          >{this.props.cancelButtonText || 'Cancel'}</button>
          <button onClick={this.handleSubmit}>{this.props.okButtonText || 'Okay'}</button>
        </div>
      </div>
    )
  }
}