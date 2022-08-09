import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { removeFromCart, updateFromCart } from '../../actions/setCart';




const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 10px;
    border: solid 1px #cfcbcb;
    padding: 5px;
    width: 100%;
   
    * {
            margin-left: 15px;
    }
`
const Info = styled.div`
    display: flex;
    flex-direction:column;
    transform: translate(0px, -10px);
    
`
const Image = styled.img`
    width: 60px;
    height: 100%;
`

const Owner = styled.p`
    color: #a59e9e;

`;
const Description = styled.strong``;

const Price = styled.p`
    
`;

const Delete = styled.button`
    padding: 5px;
    background-color: #1ac3f6;
    color: white;
    border:none;
`

function Grid({id,title,owner,price,image,quantity,selected,yourOrder}) {
    const dispatch = useDispatch()

    if(!yourOrder){
        const handleQtychange = (e)=>{  
            dispatch(updateFromCart(id,e.target.value));
        }
        const handleDelete =  (e)=>{
            
            dispatch(removeFromCart(id))
        }
      
        return (
           
                
                    <Item>
                        <Image src={image}/>
                        <Info>
                            <Owner>{owner}</Owner>
                            <Description>{title}</Description>
                        </Info>
                        <select value={selected} onChange={handleQtychange} >
                          {[...Array(quantity).keys()].map(x =>
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          )}
                        </select>
                        
                        <Price><strong>Price:</strong>{` Rs. ${price}`}</Price>
                        <Delete onClick={handleDelete}>Delete</Delete>
                    </Item>
                
               
         
        )
    }
    else{    
        return (
           
                
                    <Item>
                        <Image src={image}/>
                        <Info>
                            <Owner>{owner}</Owner>
                            <Description>{title}</Description>
                        </Info>                     
                        <Price><strong>Price:</strong>{` Rs. ${price}`}</Price>
                       
                    </Item>      
         
        )
    }
    
}

export default Grid
