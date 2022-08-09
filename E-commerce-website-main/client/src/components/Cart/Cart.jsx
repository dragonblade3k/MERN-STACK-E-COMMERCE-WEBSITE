import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import Grid from '../Cart/Grid'

import StripeCheckout from "react-stripe-checkout";
import { paymentProduct } from '../../actions/setCart'
import { updateOrders } from '../../actions/setUser'
import { Link } from 'react-router-dom'
const LeftContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 700px;
    margin: 30px;

`


const MainContent = styled.div`
    display: flex;
   
`

const RightContent = styled.div`
    border: solid 1px #dadada;
    width: 300px;
    margin-top:30px ;
    height: 190px;
    display: flex;
    flex-direction: column;
`

const Label = styled.strong``
const Value = styled.p``
const Group = styled.div`
    display: flex;
    margin: 10px;
`
const StyledLink = styled(Link)`

    text-decoration: none;
    color: white;
     &:hover {
        text-decoration: none;
        color: red;
    }

`

const Checkout = styled.button`
    border: none;
    padding-block: 6px;
    width: 90%;
    margin: 0 auto;
    border-radius: 12px;
    background-color: #FF9F00;
`

function Cart({isAuth}) {
    const cartItem = useSelector(state => state.cart);
    const user = useSelector(state => state.userLogin.user);
    const dispatch = useDispatch()
    // console.log('rendered')
    const [countPrice, setcountPrice] = useState({})
    const handleSum = (total,num)=>{
        return total + parseInt(num.selected)
    }
    const handlePrice = (total,num)=>{
        return total + parseInt(num.Price)*parseInt(num.selected)
    }
    const handleToken = (token)=>{
        const amount = countPrice.totalPrice
        const orderId = cartItem.map(item=>(item._id));
        dispatch(paymentProduct(token,amount))  
        dispatch(updateOrders(user,orderId))
     
        
    }
    useEffect(() => {
            const sum = cartItem.reduce(handleSum,0);
            const price = cartItem.reduce(handlePrice,0);
            const totalPrice = price===0? 0: (price-100)*100;
            
            
            setcountPrice({sum,price,totalPrice})
            

    }, [cartItem])
    if(!isAuth){
        return <Redirect to='/login'/>
    }
    else{
        return (
            <React.Fragment>
                 <MainContent>
                <LeftContent>
                {cartItem.map( (item)=>(
                    <Grid
                        key={item._id}
                        id={item._id}
                        title={item.Title}
                        owner={item.Owner}
                        quantity={item.Quantity}
                        price={item.Price}
                        image={item.Image}
                        selected={item.selected}
                    />
                ) 
                )}
                </LeftContent>
                <RightContent>
                    <Group>
                        <Label>Price ({`${countPrice.sum} items`}):<span>&nbsp;&nbsp;</span></Label>
                        <Value>{`Rs. ${countPrice.price}`}</Value>
                    </Group>
                    
                   {countPrice.price !==0 ? <Group>
                        <Label>Discount :<span>&nbsp;&nbsp;</span></Label>
                        <Value>{`Rs. 100`}</Value>
                    </Group>:null}
                    
                    <Group>
                        <Label>Price :<span>&nbsp;&nbsp;</span></Label>
                        <Value>{countPrice.price!==0? `Rs. ${countPrice.price-100}`:`Rs. 0`}</Value>
                    </Group>
                    <Checkout>
                        {countPrice.totalPrice!==0?
                           <StripeCheckout
                           stripeKey="pk_test_51IzhazSC63LzAl40CbWXRR6BNWRvB0XS7W2to3SyxgktH5tBlfB6H3vBEA8l9Wl762wCeWxkKwtvR5j91DlQREHu00Wmu3fc6J"
                           token={handleToken}
                           amount={(countPrice.price-100)*100 }
                           currency="INR"
                           panelLabel="Pay"
                           email={user.email}
                           alipay
                           
                       >
                           PROCEED TO CHECKOUT
                       </StripeCheckout>
                       :
                       <StyledLink to='/'>
                       CHECK OUR PRODUCTS
                       </StyledLink>
                            
                    
                        }
                     
                    </Checkout>
                </RightContent>
                </MainContent>
            </React.Fragment>
          
        )
    }
}

export default Cart
