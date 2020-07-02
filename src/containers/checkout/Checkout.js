import React, {useState, useEffect} from 'react';
import CheckoutSummary from './checkoutSummary/CheckoutSummary';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ContactData from '../contactData/ContactData';

const Checkout = (props) => {

    const [state,
        setState] = useState({
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        }
    })

    const [price,
        setPrice] = useState(0)

    useEffect(() => {
        const query = new URLSearchParams(props.location.search)
        const ingredients = {}
        for (const [key, value]of query.entries()) {
            if (key === 'price') { setPrice(value)}
            else{ ingredients[key] = +value }
        }
        if (Object.keys(ingredients).length) {
            setState({
                ingredients: {
                    ...ingredients
                }
            })
        }

    }, [props])

    const onCheckoutCancelHandler = () => props.history.goBack()
    const onCheckoutContinueHandler = () => props.history.replace('/checkout/contact-data')
    
    return (
        <div>
            <CheckoutSummary
                ingredients={state.ingredients}
                onCheckoutCancel={onCheckoutCancelHandler}
                onCheckoutContinue={onCheckoutContinueHandler}/>
                <Route path={props.match.path + '/contact-data'} render={() => <ContactData ingredients={state.ingredients} price={price} {...props}/>}/>
        </div>
    )
}

export default withRouter(Checkout) 
