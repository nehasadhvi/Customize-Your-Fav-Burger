import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICE = {
    salad: 0.4,
    bacon: 1.2,
    cheese: 0.9,
    meat: 1.1
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientsHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
    }

    removeIngredientsHandler = (type) => {
        const newCount = this.state.ingredients[type] - 1;
        if (newCount < 0) return;
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice
        });
    }

    render () {

        let disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        } 

        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    added={this.addIngredientsHandler} 
                    removed={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    };
}

export default BurgerBuilder;

