import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '../Cart/Grid'


function Order({isAuth}) {
    const orders = useSelector(state => state.userLogin.user.orders)
    
    return (
        <React.Fragment>
        {orders.map( (item,i)=>(
            <Grid
                key={i}
                id={item._id}
                title={item.Title}
                owner={item.Owner}
                yourOrder = {true}
                price={item.Price}
                image={item.Image}
                selected={item.selected}
            />
        ) 
        )}
        </React.Fragment>
    )
}

export default Order
