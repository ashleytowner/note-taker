import React from 'react';

type PromptBoxProps = {
  /**
   * Callback function upon submission of prompt input.
   */
  onSubmit: (input: string) => void;
  /**
   * The message to display to the user
   */
  message: string;
  /**
   * The message to display on the confirmation button
   * @default 'Okay'
   */
  buttonText?: string;
}

export default class PromptBox extends React.Component<PromptBoxProps, { value: string }> {

  private modalStyles: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 100,
    padding: '1rem',
    borderRadius: '4px',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 0px 1000px rgba(0, 0, 0, 0.8)'
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      value: event.target.value
    });
  }

  private handleSubmit = (): void => {
    this.props.onSubmit(this.state.value);
  }
  
  render(): JSX.Element {
    return (
      <div className="modal" style={this.modalStyles}>
        <p>{this.props.message}</p>
        <input onChange={this.handleChange} type="text" />
        <button onClick={this.handleSubmit}>{this.props.buttonText || 'Okay'}</button>
      </div>
    )
  }
}