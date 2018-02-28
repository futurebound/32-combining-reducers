import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate, categoryUpdate, categoryDelete} from '../../actions/category-actions';
import {expenseCreate, expenseUpdate, expenseDelete} from '../../actions/expense-actions';
import CategoryForm from '../category/category-form/category-form';
import CategoryItem from '../category/category-item/category-item';

class Dashboard extends React.Component {
  render() {
    return(
      <section>
        <h1>its an expense tracker</h1>

        <CategoryForm
          buttonText='create'
          onComplete={this.props.categoryCreate} />
        <ul>
          {this.props.categories ?
            this.props.categories.map(category =>
              <CategoryItem
                key={category.id}
                category={category}
                title={category.title}
                onUpdate={this.props.categoryUpdate}
                onDelete={this.props.categoryDelete}/>
            )
            :
            undefined
          }
        </ul>
      </section>
    );
  }
}

//maps to be this.props.category
const mapStateToProps = state => ({
  categories: state.categories,
  expenses: state.expenses,
});

//WRAP IN PARENS () B/C WE RETURNING AN OBJECT
const mapDispatchToProps = (dispatch, getState) => ({
  categoryCreate: category => dispatch(categoryCreate(category)),
  categoryUpdate: category => dispatch(categoryUpdate(category)),
  categoryDelete: category => dispatch(categoryDelete(category)),
  expenseCreate: expense => dispatch(expenseCreate(expense)),
  expenseUpdate: expense => dispatch(expenseUpdate(expense)),
  expenseDelete: expense => dispatch(expenseDelete(expense)),
  // dashboardCategoryCreate is now on dashboard.props.dCC or this.props.dCC
  // category comes from form data
  // returns a function thats invoked
  // that calls ACTION categoryCreate
  // that takes category as an argument
});

//THESE DO NEED TO BE IN THIS ORDER, configuring dashboard to be exported properly
//REUSE THESE FOR EVERY COMPONENT THAT NEEDS ACCESS TO STORE, JUST SWAP OUT DASHBOARD FOR THEIR COMPONENT NAME
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);