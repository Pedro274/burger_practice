import React, {useEffect, useState} from 'react'
import Order from '../../components/order/Order'
import axios from '../../axios-order'
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler'
import Spinner from '../../components/UI/spinner/Spinner'

const Orders = () => {

    const [orders,
        setOrders] = useState([])
    const [loading,
        setLoading] = useState(true)

    useEffect(() => {
        const fetch = async() => {
            try {
                const ordersArr = []
                const response = await axios.get('/orders.json')
                for (const [key,
                    value]of Object.entries(response.data)) {
                    ordersArr.push({
                        ...value,
                        id: key
                    })
                }
                setOrders(ordersArr)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        fetch()
    }, [])

    const ordersContent = orders.map(order => {
        return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
    })

    return (
        <div>
            {loading
                ? <Spinner/>
                : ordersContent}
        </div>
    )
}

export default WithErrorHandler(Orders, axios)
