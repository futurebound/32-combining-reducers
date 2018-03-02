import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate} from '../../actions/category-actions';
import CategoryForm from '../category/category-form/category-form';
import CategoryItem from '../category/category-item/category-item';

class Dashboard extends React.Component {
  render() {
    return(
      <section className='dashboard'>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);