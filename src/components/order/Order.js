import React from 'react'
import classes from './Order.module.scss'

const Order = (props) => {

    const ingredientsArr = []
    for (const [key, value] of Object.entries(props.ingredients)) {
        ingredientsArr.push({name: key, amount: value})
    }

    const ingredients = ingredientsArr.map(ingredient => {
        return <span className={classes.IngredientsList} key={ingredient.name}>{` ${ingredient.name}(${ingredient.amount})`}</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price:
            <strong>USD {props.price}</strong>
            </p>
        </div>)
}

export default Order
