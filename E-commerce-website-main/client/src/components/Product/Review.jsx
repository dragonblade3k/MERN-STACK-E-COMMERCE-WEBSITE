import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div`
    border: solid 1px black;
    padding: 5px;
    margin-top: 10px;
`
const Star = styled.i`
    color:green;
`
const Comment = styled.p`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`
const Details = styled.p`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
`

function Review({createdAt,star,review,user}) {
    return (
        <Wrapper>
            <Comment>
                 <Star className="fas fa-star">{star}</Star>
                {review}
            </Comment>
            <Details>
            <small>{user}</small> 
            <small>{moment(createdAt).fromNow()} </small>
             
            </Details>
        </Wrapper>
    )
}

export default Review
