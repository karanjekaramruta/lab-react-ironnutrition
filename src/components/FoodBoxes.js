import React, { Component } from 'react';
import './FoodBox.css';
import FoodBox from './FoodBox';
import 'bulma/css/bulma.css';
import foods from '../foods.json';
import AddFood from './AddFood';
import SearchBar from './SearchBar';

class FoodBoxes extends Component {
  constructor(props) {
    super(props);
    this.addFoodHandler = this.addFoodHandler.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.todaysFoodHandler = this.todaysFoodHandler.bind(this);
  }

  state = {
    foods: foods,
    filterFoods: foods,
    searchTerm: this.props.searchTerm,
    todaysFoods: [],
    totalCalories: 0,
  };

  addFoodHandler(theFood) {
    var foodsCopy = [...this.state.foods];
    foodsCopy.push(theFood);
    this.setState({
      foods: foodsCopy,
    });
  }
  handleSearch(searchTerm) {
    debugger;
    let foodsModified = this.state.foods.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({
      filterFoods: foodsModified,
    });
  }

  todaysFoodHandler(food) {
    debugger;
    var todaysFoodsCopied = [...this.state.todaysFoods];
    todaysFoodsCopied.push(food);
    this.setState({
      todaysFoods: todaysFoodsCopied,
    });
  }


  render() {
    return (
      <div className="columns">
        <div className="column">
          <SearchBar handleSearch={this.handleSearch} />
          {this.state.filterFoods.map((food, index) => (
            <FoodBox
              key={index.toString()}
              name={food.name}
              image={food.image}
              quantity={food.quantity}
              calories={food.calories}
              index={index}
              todaysFood={this.todaysFoodHandler}
            />
          ))}
          <AddFood addFood={this.addFoodHandler} />
        </div>
        <div className="column content">
          <h2 className="subtitle">Today's foods</h2>
          {this.state.todaysFoods.map((food, index) => (
            <ul key={index.toString()}>
              <li>
                {food.quantity} {food.name} = {food.calories}
              </li>
            </ul>
          ))}

          <strong>
            Total:
            {this.state.todaysFoods.reduce(
              (sum, food) => sum + food.calories,
              0
            )}{' '}
            cal
          </strong>
        </div>
      </div>
    );
  }
}

export default FoodBoxes;