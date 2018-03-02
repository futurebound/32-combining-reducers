import React from 'react';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.expense
      ? this.props.expense
      : {
        name: '',
        cost: '',
        categoryId: this.props.categoryId,
        editing: false,
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState({name: '', cost: '', editing: false});
  }

  render() {
    return (
      <form className='expense-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='name'
          value={this.state.name}
          onChange={this.handleChange}
          placeholder='name'/>
        <input
          type='number'
          name='cost'
          value={this.state.cost}
          onChange={this.handleChange}
          placeholder='cost'/>

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    );
  }
}

export default ExpenseForm;