import React from 'react';
import { ErrorMessage, useField } from 'formik';
import styled from 'styled-components';



const Input = styled.input`

  background: #F0F0FF;
    width: 40%;
    padding: 5px;
  
`

const Error =styled.div`

    width: 40%;
    color: red;
    text-align: left;
    font-size: 12px;
`
const FlexDiv = styled.div`
 position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom:10px;
    
   
`
const Label = styled.label`
    margin-bottom: 5px;
    
`






export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FlexDiv  >
      <Label htmlFor={field.name} >{label}</Label>
      <Input
        className={` ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"
      />
      <ErrorMessage component={Error}  name={field.name}  />
    </FlexDiv>
  )
}