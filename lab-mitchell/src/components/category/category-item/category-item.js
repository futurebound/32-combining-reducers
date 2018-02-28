import React from 'react';
import {renderIf} from '../../../lib/utils';
import CategoryForm from '../category-form/category-form';

class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category ? this.props.category : {},
      expense: this.props.expense ? this.props.category : {},
      editing: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  };

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
        <p>Category: {this.state.category.title}</p>
        <button onClick={this.handleDelete}>delete category</button>
        {renderIf(this.state.editing,
          <CategoryForm
            category={this.state.category}
            toggleEdit={this.handleEditing} 
            buttonText='update'
            onUpdate={this.props.onUpdate}/>
        )}
      </li>
    );
  };
}

export default CategoryItem;