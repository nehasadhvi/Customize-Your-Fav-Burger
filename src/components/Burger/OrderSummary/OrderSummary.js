import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientsList = Object.keys(props.ingredients)
        .map(igkey => {
            return(
                <li key={igkey}>
                    <span style={{textDecoration: 'capitalize'}}>{igkey}: {props.ingredients[igkey]}</span>
                </li>
            );
        });

    return (
        <Aux>
            <div>Your Order</div>
            <div>This delicious Burger includes:</div>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: ${props.price}</strong></p>
            <p>Continue to checkout ?</p>
            <Button btnType='Danger' clicked={props.modalClose}>CANCEL</Button>
            <Button btnType='Success' clicked={props.modalContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;