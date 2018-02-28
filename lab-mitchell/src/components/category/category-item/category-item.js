import React from 'react';
import {renderIf} from '../../../lib/utils';
import CategoryForm from '../category-form/category-form';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category ? this.props.category : {},
      editing: false,
    };

    // this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  };

  // handleClick() {
  //   this.props.onDelete(Object.assign({}, this.state));
  // };

  handleDelete() {
    this.props.onDelete(this.state.category);
  };

  handleEditing() {
    this.setState({editing: !this.state.editing});
  };

  render() {
    return (
      <li
        className='category-item'
        key={this.state.category.id}
        onDoubleClick={this.handleEditing}>
        {console.log(this.state.category)}
        <p>Category: {this.state.category.title}</p>
        <button onClick={this.handleDelete}>delete category</button>
        {renderIf(this.state.editing,
          <CategoryForm
            category={this.state.category}
            toggleEdit={this.handleEditing} 
            buttonText='update'
            onSubmit={this.props.onUpdate}/>
        )}
      </li>
    );
  };
}

export default CategoryItem;