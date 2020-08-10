import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

let baseUrl = 'http://localhost:3000/pizzas/'

class App extends Component {
  state = {
    pizzas: [],
    currentPizza: {}
  }

  componentDidMount() {
    fetch(baseUrl)
      .then(response => response.json())
      .then(allPizzas => this.setState({ pizzas: allPizzas }))
  }

  editHandler = (e, obj) => {
    this.setState({
      currentPizza: obj
    })
  }
 
  submitHandler = (newObj, id) => {
    fetch(baseUrl + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        topping: newObj.topping,
        size: newObj.size,
        vegetarian: newObj.vegetarian
      })
    })
      .then(response => response.json())
      .then(newPizza => this.setState(prevState => {
        prevState.pizzas.forEach((pizza, index) => {
          if (pizza.id === newPizza.id) {
            prevState.pizzas[index] = newPizza;
          }
        });
        return prevState;
      }))
  }

  render() {
    
    return (
      <Fragment>
        <Header />
        <PizzaForm currentPizza={this.state.currentPizza} submitHandler={this.submitHandler}/>
        <PizzaList pizzas={this.state.pizzas} editHandler={this.editHandler}/>
      </Fragment>
    );
  }
}

export default App;
