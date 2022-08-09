import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
const Wrapper = styled.div`
height: 50px;
background-color: #333;
width: 100%;

`
const StyledLink = styled(Link)`

    text-decoration: none;
    color: white;
     &:hover {
        text-decoration: none;
        color: red;
    }

`


const NavItems = styled.ul`
display: flex;
flex-direction: row;
color: white;
height: 100%;
align-items: center;
justify-content: space-between;
list-style-type: none;
`
const LeftItem = styled.li`
flex-grow: 6;
margin-left: 15px;
`
const RightItems = styled.li`
flex-grow: 1;
`


function Navbar() {
    const userLogin = useSelector(state => state.userLogin)
    return (
        <React.Fragment>
            <Wrapper>
                <NavItems>
                    <LeftItem><StyledLink to='/' >E commerce Website</StyledLink></LeftItem>
                    
                    {userLogin.login ?<RightItems> <StyledLink to='/cart'>Cart</StyledLink> </RightItems>:null}
                    
                    {userLogin.login ?<RightItems> <StyledLink to='/your-orders'>Previous orders</StyledLink> </RightItems>:null}
                   
                    { userLogin.login ?  <RightItems><StyledLink to='/profile'>Profile</StyledLink></RightItems>:<RightItems><StyledLink to='/register'>Sign in</StyledLink></RightItems>}
                </NavItems>  
            </Wrapper>
        </React.Fragment>
    )
}

export default Navbar
