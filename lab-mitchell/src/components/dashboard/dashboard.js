import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate} from '../../actions/category-actions';
import CategoryForm from '../category/category-form/category-form';
import CategoryItem from '../category/category-item/category-item';

class Dashboard extends React.Component {
  render() {
    return(
      <section>
        <h1>expense tracker</h1>

        <CategoryForm
          buttonText='create'
          onComplete={this.props.categoryCreate}/>

        {this.props.categories ?
          this.props.categories.map(category =>
            <CategoryItem
              category={category}
              key={category.id}/>
          )
          :
          undefined
        }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  expenses: state.expenses,
});

const mapDispatchToProps = (dispatch, getState) => ({
  categoryCreate: category => dispatch(categoryCreate(category)),
  // expenseCreate: expense => dispatch(expenseCreate(expense)),
  // expenseUpdate: expense => dispatch(expenseUpdate(expense)),
  // expenseDelete: expense => dispatch(expenseDelete(expense)),

  // dashboardCategoryCreate is now on dashboard.props.dCC or this.props.dCC
  // category comes from form data
  // returns a function thats invoked
  // that calls ACTION categoryCreate
  // that takes category as an argument
});

//THESE DO NEED TO BE IN THIS ORDER, configuring dashboard to be exported properly
//REUSE THESE FOR EVERY COMPONENT THAT NEEDS ACCESS TO STORE, JUST SWAP OUT DASHBOARD FOR THEIR COMPONENT NAME
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);