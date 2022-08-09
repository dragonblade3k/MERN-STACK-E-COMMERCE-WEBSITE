import React ,{useEffect}from 'react'
import styled from 'styled-components'
import {Link, useHistory} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../../actions/setProduct'
import Review from './Review'
import { addToCart } from '../../actions/setCart'

const Wrapper = styled.div`
    margin-top:15px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-left: 15px;

`
const LeftContent = styled.div`
    display: flex;
    flex-direction:column;
    width:300px;
`;
const RightContent = styled.div`
    display: flex;
    flex-direction:column;
    width:500px;
    margin-left: 15px;
`;
const Image = styled.img`
    width: 100%;
`;
const AddToCart = styled.button`
    margin-top:15px;
    height: 40px;
    width: 100%;
    background: #FF9F00;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    border-radius: 118px;
    color: #FFFFFF;
    border: none;
`;
const Owner = styled.p`
    color: #a59e9e;

`;
const Description = styled.strong``;
const Quntity = styled.strong`
    margin-top: 10px;
    color: red;
`;
const Price = styled.p`
    margin-top: 10px;
`;
const Offers = styled.ul` 
    display: flex;
    flex-direction:column;
    margin-top: 10px;
    list-style-type:none;`
;
const Offer = styled.li` 
    margin-top: 10px;
    display: flex;
    & >i{
        color: green;
    }
    font-size: 16px;
`;
const Rating = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 10px;
    width: 100%;
    height: 100%;
 `;

const Star = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left:10px;
`
const Stars = styled.i`
    color: yellow;
    font-size: 10px;
    text-shadow: 0 0 1px #000;
   
`
const Content = styled.div`
    display: flex;
    flex-direction:column;

`

const RateProduct = styled.button`
   
    color: white;
    background-color: #3030f0;
    font-size:14px;
    border-radius: 10%;
    outline: none;
    border: none;
    padding: 5px;
    margin-left:50px;
    
`

function Product({match}) {
    const data = useSelector(state=>state.SingleProduct)
    const cart = useSelector(state => state.cart)
    let history = useHistory()
    const dispatch = useDispatch()
    const fetchData = ()=>{

        dispatch(fetchProduct(match.params.id));
    }
    const isInCart = ()=>{
        
        return cart.find(element=> element._id === data.SingleProduct._id);
    }

    const addtoCart =()=>{
        
        dispatch(addToCart(data.SingleProduct));
    }
    const goToCart = ()=>{ 
        history.push('/cart');
    }
    useEffect(() => {
        fetchData();
       
    // eslint-disable-next-line
    }, []);
    
    return (
        <Wrapper>

            {!data.loading? 
            <React.Fragment>
             <LeftContent>
                        <Image src={data.SingleProduct.Image}></Image>
                        {!isInCart()? 
                            <AddToCart onClick={addtoCart}>ADD TO CART</AddToCart>:
                            <AddToCart onClick={goToCart}>GO TO CART</AddToCart>
                            }
                        </LeftContent>
                    <RightContent>
                    <Owner>{data.SingleProduct.Owner}</Owner>
                    <Description>{data.SingleProduct.Title}</Description>
                    <Quntity>Only {data.SingleProduct.Quantity} Product left</Quntity>
                    <Price><strong>Price:</strong>Rs.{data.SingleProduct.Price}</Price>
                    <Offers>
                    <strong>Available Offers: </strong>                   
                            <Offer><i className="fas fa-tags"></i><strong>Combo offer:</strong> Buy 2 items save 5%;Buy 3 or more save 10%</Offer>
                            <Offer><i className="fas fa-tags"></i><strong>Bank offer:</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Offer>
                            <Offer><i className="fas fa-tags"></i><strong>Bank offer:</strong>₹20 Off on first prepaid transaction using UPI payments, minimum order value ₹750/</Offer>                   
                    </Offers>
                    <Content>
                        <Rating>                           
                            <p>Ratings & Reviews:</p> 
                            <Star>
                                {Number(data.SingleProduct.Stars).toFixed(2)}
                                <Stars className="fas fa-star"></Stars>
                            </Star>                
                            <Link to={`/review/${data.SingleProduct._id}`}><RateProduct>Rate product</RateProduct></Link>
                        </Rating>
                        {data.SingleProduct.Review.map(rev=>(
                            <Review
                            key = {rev._id}
                            createdAt={rev.createdAt}
                            star={rev.star}
                            review={rev.review}
                            user={rev.user}
                            
                            />
                            
                        ))}
                    </Content>
                    </RightContent>
                    </React.Fragment>

                    :
                    <h1>Page is loading</h1>

        }
                     
                   
        

        </Wrapper>
    )
}

export default Product
