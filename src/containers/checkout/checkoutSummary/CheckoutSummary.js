import React from 'react'
import classes from './CheckoutSummary.module.scss'
import Burger from '../../../components/burger/Burger'
import Button from '../../../components/UI/button/Button'

function CheckoutSummary(props) {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well!</h1>
            <div className={classes.BurgerSummary}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div>
                <Button buttonType="Danger" clicked={props.onCheckoutCancel}>CANCEL</Button>
                <Button buttonType="Success" clicked={props.onCheckoutContinue}>CONTINUE</Button>
            </div>
        </div>
    )
}

export default CheckoutSummary
