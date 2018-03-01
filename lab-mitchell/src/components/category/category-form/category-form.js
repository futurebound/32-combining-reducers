import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.category
      ? this.props.category
      : { //IN CASE SOMETHING IS NOT PASSED DOWN THROUGH PROPS
        title: '',
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
    this.setState({title: ''});
  }

  //this.props.buttonText SO THAT IT DYNAMIC, CAN DO CHANGE/SUBMIT/UPDATE/LEAVE ETC
  render() {
    return (
      <form className='category-form' onSubmit={this.handleSubmit}>
        <input 
          type='text'
          name='title'
          value={this.state.title}
          onChange={this.handleChange}
          placeholder='category name'
        />

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    );
  }
}

export default CategoryForm;