import React from 'react';
import classes from './Burger.module.scss';
import BurgerIngredient from './burgerIngredient/BurgerIngredient';

function Burger(props)  {

    const transformIngredient = Object
        .keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
        })
        .reduce((arr, currentArr) => {
            return arr.concat(currentArr);
        },[])

        
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformIngredient.length ? transformIngredient : <p>Please start adding ingredients</p>}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default Burger
