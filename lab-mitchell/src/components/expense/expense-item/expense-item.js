import React from 'react';
import {connect} from 'react-redux';
import {renderIf} from '../../../lib/utils';
import ExpenseForm from '../expense-form/expense-form';
import {expenseUpdate} from '../../../actions/expense-actions';
import {expenseDelete} from '../../../actions/expense-actions';


class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: this.props.expense ? this.props.expense : {},
      editing: false,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  };

  handleDelete() {
    this.props.expenseDelete(this.state.expense);
  };

  handleEditing() {
    this.setState({editing: !this.state.editing});
  };

  render() {
    return (
      <li
        className='expense-item'
        key={this.props.expense.id}
        onDoubleClick={this.handleEditing}>
        <p>Name: {this.props.expense.name}</p>
        <p>Cost: {this.props.expense.cost}</p>
        <button onClick={this.handleDelete}>delete expense</button>
        {renderIf(this.state.editing,
          <ExpenseForm
            expense={this.state.expense}
            buttonText='update'
            onComplete={this.props.expenseUpdate} />
        )}
      </li>
    );
  };
}

const mapStateToProps = state => ({
  expenses: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
  expenseUpdate: expense => dispatch(expenseUpdate(expense)),
  expenseDelete: expense => dispatch(expenseDelete(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseItem);