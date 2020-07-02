import React from 'react';
import classes from './BuildControls.module.scss';
import BuildControl from './buildControl/BuildControl';

const controls = [
    {
        label: 'Salad',
        type: 'salad'
    }, {
        label: 'Bacon',
        type: 'bacon'
    }, {
        label: 'Cheese',
        type: 'cheese'
    }, {
        label: 'Meat',
        type: 'meat'
    }
]

function BuildControls(props) {

    return (
        <div>
            <div className={classes.BuildControls}>
                <p>Current Prize:
                    <strong>${(props.price).toFixed(2)}</strong>
                </p>
                {controls.map((ctrl, index) => {
                    return <BuildControl
                        key={index}
                        label={ctrl.label}
                        disabled={props.disableButton[ctrl.type]}
                        more={() => props.addIngredient(ctrl.type)}
                        less={() => props.removeIngredient(ctrl.type)}/>
                })}
                <button
                    className={classes.OrderButton}
                    disabled={props.purchaseable}
                    onClick={props.purchaseHandler}>ORDER NOW</button>
            </div>
        </div>
    )
}

export default BuildControls
