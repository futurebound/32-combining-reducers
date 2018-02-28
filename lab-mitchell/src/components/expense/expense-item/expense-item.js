import React from 'react';
import { renderIf } from '../../../lib/utils';
import ExpenseForm from '../expense-form/expense-form';

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
    this.props.onDelete(this.state.expense);
  };

  handleEditing() {
    this.setState({editing: !this.state.editing});
  };

  render() {
    return (
      <li
        className='expense-item'
        key={this.state.expense.id}
        onDoubleClick={this.handleEditing}>
        <p>Expense: {this.state.expense.title}</p>
        <button onClick={this.handleDelete}>delete expense</button>
        {renderIf(this.state.editing,
          <ExpenseForm
            expense={this.state.expense}
            toggleEdit={this.handleEditing}
            buttonText='update'
            onUpdate={this.props.onUpdate} />
        )}
        <ul>
          {this.props.expenses ?
            this.props.expenses.map(expense =>
              <ExpenseItem
                key={expense.id}
                expense={expense}
                title={expense.title}
                onUpdate={this.props.expenseUpdate}
                onDelete={this.props.expenseDelete} />
            )
            :
            undefined
          }
        </ul>
      </li>
    );
  };
}

export default ExpenseItem;