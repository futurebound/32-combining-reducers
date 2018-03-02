import React from 'react';
import {connect} from 'react-redux';
import {renderIf} from '../../../lib/utils';
import ExpenseForm from '../expense-form/expense-form';
import {expenseUpdate} from '../../../actions/expense-actions';
import {expenseDelete} from '../../../actions/expense-actions';


class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.expense;
    this.state.editing = false;

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
  };

  handleDelete() {
    this.props.expenseDelete(this.state);
  };

  handleEditing() {
    this.setState({editing: !this.state.editing});
  };

  render() {
    return (
      <div
        className='expense-item'
        key={this.props.expense.id}
        onDoubleClick={this.handleEditing}>
        <p>Expense: {this.props.expense.name}</p>
        <p>Cost: {this.props.expense.cost}</p>
        <button onClick={this.handleDelete}>delete</button>
        {renderIf(this.state.editing,
          <ExpenseForm
            expense={this.state}
            buttonText='update'
            onComplete={this.props.expenseUpdate} />
        )}
      </div>
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