import React from 'react';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.expense
      ? this.props.expense
      : {
        title: '',
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    console.log('handlesubmit', this.props.expense);
    console.log('e.target:', e.target);
    e.preventDefault();
    if (!this.props.expense) this.props.onComplete(Object.assign({}, this.state));
    if (e.target.buttonText === 'update') {
      console.log('hit update');
      this.props.onUpdate(this.props.expense);
      this.props.toggleEdit();
    }
    this.setState({ title: '' });
  }

  render() {
    return (
      <form className='expense-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='title'
          value={this.state.title}
          onChange={this.handleChange}
        />

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    );
  }
}

export default ExpenseForm;