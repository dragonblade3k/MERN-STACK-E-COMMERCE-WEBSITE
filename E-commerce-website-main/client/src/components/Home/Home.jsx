
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Card from './Card'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProducts } from '../../actions/setProduct'


const Wrapper = styled.div`
display: flex;
flex-direction: row;
`
const Cards = styled.div`
display:flex;
flex-wrap: wrap;
margin-top: 20px;
width: 100%;
justify-content: center;
align-items: center;
gap: 5px;
row-gap: 30px;
`

function Home() {
   
    const productState = useSelector(state => state.Product)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchProducts());  
    },[dispatch])
    return (
        <Wrapper>
            <Cards> 
            {productState.loading? <h1>Please wait loading...</h1>:
            productState.product.map((prod)=>(
                <Card
                key = {prod._id}
                id = {prod._id}
                img = {prod.Image}
                title = {prod.Title}
                price = {prod.Price}
                stars = {prod.Stars}
                />
                ))}
            </Cards>
        </Wrapper>
          
       
    )
}

export default Home
