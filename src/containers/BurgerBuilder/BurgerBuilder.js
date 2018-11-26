import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
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
        this.updatePurchaseState(newIngredients);
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
        this.updatePurchaseState(newIngredients);
    }

    updatePurchaseState = (ingredients) => {
        let sum = 0;
        for (let key in ingredients) {
            sum += ingredients[key];
        }
        this.setState({purchasable: sum > 0});
    }

    modalCloseHandler = () => {
        this.setState({purchasing: false});
    }

    modalContinueHandler = () => {
        // alert('You Continue !');

        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Neha Sadhvi',
                address: {
                    street: 'Parkview Ln',
                    zipCode: '92600',
                    country: 'California'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(data => {
                console.log(data);
                this.setState({loading: false, purchasing: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({loading: false, purchasing: false});
            });
    }

    render () {

        let disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = <OrderSummary 
                        price={this.state.totalPrice.toFixed(2)}
                        ingredients={this.state.ingredients} 
                        modalClose={this.modalCloseHandler} 
                        modalContinue={this.modalContinueHandler} />
        
        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.modalCloseHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    added={this.addIngredientsHandler} 
                    removed={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseState={this.state.purchasable}
                    purchase={this.purchaseHandler}
                />
            </Aux>
        );
    };
}

export default BurgerBuilder;

