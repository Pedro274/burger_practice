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
                    placeholder: 'Your E-mail'
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
                    ],
                    value: ''
                }
            }
        }
    })

    const [loading,
        setLoading] = useState(false)

    const orderHandler = async(event) => {
        event.preventDefault();
        setLoading(true);

        const userContact = {};
        for(const [key, value] of Object.entries(contact.orderForm)){
            const obj = {...value}
            userContact[key] = obj.value
        }    

        const order = {
            ingredients: {
                ...props.ingredients
            },
            customer: userContact,
            price: parseFloat(props.price).toFixed(2)
        }

        try {
            await axios.post('/orders.json', order)
        } catch (error) {
            alert(error.message)
        }
        
        props.history.push('/')  
    }

    const inputChangeHandler = (event, fieldName) => {
        const newInputValue = event.target.value;
        const newContactState = {...contact};
        const newFieldValue = {...newContactState.orderForm[fieldName]}
        newFieldValue.value = newInputValue;
        newContactState.orderForm[fieldName] = newFieldValue
        setContact(newContactState)
    }

    
    const inputs = Object
        .keys(contact.orderForm)
        .map((inputFieldName, index) => {
            const inputField = contact.orderForm[inputFieldName]
            return <Input
                key={index}
                inputtype={inputField.elementType}
                config={inputField.elementConfig}
                value={inputField.value}
                inputChange={(event) => inputChangeHandler(event, inputFieldName)}/>
        });

    const form = loading
        ? <Spinner/>
        : (
            <form>
                {inputs}
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
