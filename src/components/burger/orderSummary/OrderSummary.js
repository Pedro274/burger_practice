import React from 'react'
import Button from '../../UI/button/Button'


function OrderSummary({ingredients, cancelOrder, continueOrder, totalPrice}) {

    const ingredientSummary = Object
        .keys(ingredients)
        .map((igKey, index) => <li key={index}><span style={{textTransform: 'capitalize'}}>{igKey}:{ingredients[igKey]}</span></li>)

    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total price: ${totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button buttonType='Danger' clicked={cancelOrder}>CANCEL</Button>
            <Button buttonType='Success' clicked={continueOrder}>CONTINUE</Button>
        </div>
    )
}

export default OrderSummary
