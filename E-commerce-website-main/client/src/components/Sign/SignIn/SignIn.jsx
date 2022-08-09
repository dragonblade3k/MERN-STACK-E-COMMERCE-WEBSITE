import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Formik, Form } from 'formik';
import { TextField } from '../TextField';

import {Redirect} from 'react-router-dom';
import styled from 'styled-components';
import { userLogin } from '../../../actions/setUser';


const Login = styled.button`
    padding-inline: 37px;
    padding-block: 12px;
    text-align: center;
    background: blue;
    color: white;
    border: none;
   

`
const ErrorMessage = styled.p`
  color: red;
  font: 12;

`

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 15px;

`
const Wrapper = styled.div`
    width: 600px;
    margin: auto;
    text-align: center;

`



const SignIn= ({isAuth})=> {

  const dispatch = useDispatch();
  const login = useSelector(state => state.userLogin)
  if(isAuth){
    return <Redirect to='/'/>
  }
  else{
    return (
      <Formik
        initialValues={{
         
          email: '',
          password: '',
         
          
        }}
        
        onSubmit={values => {
         
          dispatch(userLogin(values));
         
        }}
      >
        {formik => (
          <Wrapper align="center">
            <h1 >Login</h1>
            <StyledForm>
              <TextField label="Email" name="email" type="text" />
              <TextField label="Password" name="password" type="password" />
              <Login type="submit">Log in</Login>
            
              {login.error? <ErrorMessage  > Invalid email or password </ErrorMessage>: null}
              
            </StyledForm>
          </Wrapper>
        )}
      </Formik>
    )
  }}

export default SignIn


