import React, {useState, useEffect} from 'react';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/buildControls/BuildControls';
import Modal from '../../components/UI/modal/Modal';
import OrderSummary from '../../components/burger/orderSummary/OrderSummary';
import axios from '../../axios-order'
import Spinner from '../../components/UI/spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

function BurgerBuilder(props) {

    const [state,
        setState] = useState({ingredients: null})
    const [purchaseable,
        setPurchaseable] = useState(true)
    const [purchasing,
        setPurchasing] = useState(false)
    const [totalPrice,
        setTotalPrice] = useState(4)

    useEffect(() => {
        const fetch = async() => {
            try {
                const response = await axios.get('https://react-my-burger-51f3f.firebaseio.com/ingredient.json')
                setState({ingredients: response.data})
            } catch (error) {
                console.log(error.message)
            }
        }
        fetch()
    }, [])

    const purchaseHandler = () => setPurchasing(true)
    const purchaseCancelHandler = () => setPurchasing(false)

    const purchaseContinueHandler = () => {

        const encodeUrl = []
        for(let i in state.ingredients) {
            encodeUrl.push(`${encodeURIComponent(i)}=${encodeURIComponent(state.ingredients[i])}`)
        }

        encodeUrl.push(`price=${totalPrice}`)
        const queryParams = encodeUrl.join('&')
        props.history.push({
            pathname: '/checkout',
            search: `?${queryParams}`
        })
        setPurchasing(false)
    }

    const purchaseableButtonHandler = (ingredients) => {
        const sum = Object
            .keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, num) => sum + num, 0)
        const allowToPurchaseState = sum
            ? false
            : true
        setPurchaseable(allowToPurchaseState)
    }

    const addIngredientHandler = (type) => {
        const newIngredientState = {
            ...state.ingredients
        }
        newIngredientState[type] = state.ingredients[type] + 1
        const newTotalPriceState = totalPrice + INGREDIENT_PRICES[type]
        setState({
            ...state,
            ingredients: {
                ...newIngredientState
            }
        })
        setTotalPrice(newTotalPriceState)
        purchaseableButtonHandler(newIngredientState)
    }

    const removeIngredientHandler = (type) => {
        const newIngredientState = {
            ...state.ingredients
        }
        newIngredientState[type] = state.ingredients[type]
            ? state.ingredients[type] - 1
            : state.ingredients[type]
        const newTotalPriceState = (state.ingredients[type]
            ? totalPrice - INGREDIENT_PRICES[type]
            : totalPrice)
        setState({
            ...state,
            ingredients: {
                ...newIngredientState
            }
        })
        setTotalPrice(newTotalPriceState)
        purchaseableButtonHandler(newIngredientState)
    }

    const disableButton = {
        ...state.ingredients
    }
    for (let i in disableButton) {
        disableButton[i] = disableButton[i] === 0
            ? true
            : false
    }

    let modalContent = null;
    if (state.ingredients) {
        modalContent = (<OrderSummary
                totalPrice={totalPrice}
                ingredients={state.ingredients}
                cancelOrder={purchaseCancelHandler}
                continueOrder={purchaseContinueHandler}/>)
    }

    let burger = null;
    let burgerControls = null;
    if (state.ingredients) {
        burger = <Burger ingredients={state.ingredients}/>
        burgerControls = (<BuildControls
            purchaseHandler={purchaseHandler}
            price={totalPrice}
            purchaseable={purchaseable}
            addIngredient={addIngredientHandler}
            removeIngredient={removeIngredientHandler}
            disableButton={disableButton}/>)
    } else {
        burger = <div style={{
            textAlign: "center"
        }}><Spinner/></div>
    }

    return (
        <div>
            <Modal show={purchasing} close={purchaseCancelHandler}>
                {modalContent}
            </Modal>
            {burger}
            {burgerControls}
        </div>
    )
}

export default WithErrorHandler(BurgerBuilder, axios)
