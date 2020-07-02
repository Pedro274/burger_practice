import React, {useState} from 'react'
import Button from '../../components/UI/button/Button'
import classes from './ContactData.module.scss'
import axios from '../../axios-order'
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import Spinner from '../../components/UI/spinner/Spinner'
import Input from '../../components/UI/input/Input'

const ContactData = (props) => {

    const [contact,
        setContact] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        }, {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                }
            }
        }
    })

    const [loading,
        setLoading] = useState(false)

    const orderHandler = async(event) => {
        event.preventDefault();
        setLoading(true)
        const order = {
            ingredients: {
                ...props.ingredients
            },
            price: parseFloat(props.price).toFixed(2)
        }

        try {
            await axios.post('/orders.json', order)
        } catch (error) {
            alert(error.message)
        }
        setLoading(false)
        props
            .history
            .push('/')
    }

    const form = loading
        ? <Spinner/>
        : (
            <form>
                <Input inputtype='input' type='text' name='name' placeholder='Your name'/>
                <Input inputtype='input' type='email' name='email' placeholder='Your email'/>
                <Input inputtype='input' type='text' name='street' placeholder='Street'/>
                <Input inputtype='input' type='text' name='postal' placeholder='Postal Code'/>
                <Button buttonType='Success' clicked={orderHandler}>ORDER</Button>
            </form>
        )

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact Data</h4>
            {form}
        </div>
    )
}

export default WithErrorHandler(ContactData, axios)
