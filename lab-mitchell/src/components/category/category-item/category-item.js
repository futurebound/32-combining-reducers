import React from 'react';
import {connect} from 'react-redux';
import {renderIf} from '../../../lib/utils';
import CategoryForm from '../category-form/category-form';
import {categoryUpdate} from '../../../actions/category-actions';
import {categoryDelete} from '../../../actions/category-actions';
import ExpenseForm from '../../expense/expense-form/expense-form';
import {expenseCreate} from '../../../actions/expense-actions';

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
    this.props.categoryDelete(this.state.category);
  };

  handleEditing() {
    this.setState({editing: !this.state.editing});
  };

  render() {
    return (
      <div
        className='category-item'
        key={this.props.category.id}
        onDoubleClick={this.handleEditing}>
        <p>Category: {this.props.category.title}</p>
        <button onClick={this.handleDelete}>delete</button>
        {renderIf(this.state.editing,
          <CategoryForm
            category={this.state.category}
            buttonText='update'
            onComplete={this.props.categoryUpdate}/>
        )}

        <ExpenseForm
          buttonText='create expense'
          onComplete={this.props.expenseCreate}/>

        {this.props.expenses ?
          this.props.expenses[this.props.category.id].map(expense =>
            <ExpenseItem
              expense={expense}
              key={expense.id}/>
          )
          :
          undefined
        }
      </div>
    );
  };
}

const mapStateToProps = state => ({
  expenses: state.expenses,
});

const mapDispatchToProps = (dispatch, getState) => ({
  categoryUpdate: category => dispatch(categoryUpdate(category)),
  categoryDelete: category => dispatch(categoryDelete(category)),
  expenseCreate: expense => dispatch(expenseCreate(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);