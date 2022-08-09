import React from 'react'
import {useDispatch} from 'react-redux'
import { Formik, Form } from 'formik';
import { TextField } from '../TextField';
import * as Yup from 'yup';
import styled from 'styled-components';

import {Link} from 'react-router-dom';
import { createUser } from '../../../actions/setUser';
const Login = styled.button`
    padding-inline: 37px;
    padding-block: 12px;
    text-align: center;
    background: blue;
    color: white;
    border: none;
    margin-bottom: 5px;

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
const Span = styled.span``



const SignUp = ()=> {
    const dispatch = useDispatch();
    const validate = Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is required'),
    })
    return (
      
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          address: ''
        }}
        validationSchema={validate}
        onSubmit={values => {
          dispatch(createUser({
            firstName:values.firstName,
            lastName:values.lastName,
            email:values.email,
            address:values.address,
            password:values.password
          }))
        }}
      >
        {formik => (
          <Wrapper align="center">
            <h1 >Register</h1>
            <StyledForm>
              <TextField label="First Name" name="firstName" type="text" />
              <TextField label="Last Name" name="lastName" type="text" />
              <TextField label="Email" name="email" type="email" />
              <TextField label="Address" name="address" type="address" />
              <TextField label="Password" name="password" type="password" />
              <TextField label="Confirm Password" name="confirmPassword" type="password" />
              <Login type="submit">Register</Login>
              <Link to='/login'><Span>Already have an account?</Span></Link>
             
            </StyledForm>
          </Wrapper>
        )}
      </Formik>
    )
  }

export default SignUp


