import React, { useState } from 'react'
import styled from 'styled-components'
import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reviewProduct } from '../../actions/setProduct';
import {Redirect} from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    
`
const StarThis = styled.div`
    width: 40%;
    margin: auto;
    margin-top: 15px;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid 1px black;
   
`;
const ReviewThis = styled.div`
    border: solid 1px black;
    width: 40%;
    display: flex;
    gap: 10px;
    margin: auto;
    margin-top: 15px;
    height: 100px;
`;

const SubmitButton = styled.button`
width: 40%;
font-size: 16px;
border-radius: 18px;
background-color: lightblue;
color: black;
`


function Rating({isAuth}) {

    

    const [star, setStars] = useState(0)
    const [review, setReview] = useState("")
    const productData = useSelector(state=>state.SingleProduct)
    const user = useSelector(state=>state.userLogin.user)
    const dispatch = useDispatch()
    const handleChange = (e)=>{
        setStars(e)
        
      
    }
    const submitReview = ()=>{
        
        const Review = {star,review,user:user.firstName}
        window.location.href = `/Product/${productData.SingleProduct._id}`;
        dispatch(reviewProduct(productData.SingleProduct._id,Review))

    }
    if(!isAuth){
        return <Redirect to='/login'/>
    }
    else{
        
    return (
        <Wrapper>
            
            <StarThis>
                <p>Rate this product:</p>
                <ReactStars
                
                count={5}
                onChange={handleChange}
                size={24}
                activeColor="#ffd700"
                />
                

  
            </StarThis>
            <ReviewThis>
                <p>Review this: </p>
                <textarea placeholder="review" name="review" value={review} cols="30" rows="10" onChange={(e)=>{setReview(e.target.value)}}></textarea>
                
            </ReviewThis>
            <SubmitButton onClick={submitReview}>Submit</SubmitButton>
        </Wrapper>
    )
}}

export default Rating
