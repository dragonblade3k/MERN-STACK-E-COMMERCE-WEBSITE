import React, { useState } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {updateUser, userLogout} from '../../actions/setUser'


const MainDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const RightPorfile = styled.img`
    width: 300px;
    height: 300px;
`
const LeftProfile = styled.form` 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    
    border: solid 1px #e0dfdf;
    margin: 10px;
    padding: 10px;
    & * {
    width: 50%;
    margin-top: 10px;
    padding: 5px;
    }

 `
const FirstName = styled.label``
const LastName = styled.label``
const Email = styled.label``
const Address = styled.label``
const File = styled.label``


const FirstNameInput = styled.input``
const LastNameInput = styled.input``
const EmailInput = styled.input``
const AddressInput = styled.textarea ``
const FileInput = styled.input``


const Update = styled.button`
    width: 100px;
    text-align: center;
    background-color: #2f96f6;
    border: none;
    padding: 5px;
    border-radius: 8px;
`

const Logout = styled.button`
    width: 100px;
    text-align: center;
    background-color: #2f96f6;
    border: none;
    padding: 5px;
    border-radius: 8px;
`



function Profile({isAuth}) {
    const dispatch = useDispatch()

    const user = useSelector(state => state.userLogin.user)
    const [state, setstate] = useState(user)
    
    const handelSubmit = (e)=>{
        e.preventDefault();
        
        dispatch(updateUser(state))
    }
    const handleImage = (element)=>{
        var file = element.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          console.log('im here')
            setstate({...state,image:reader.result})
        }
        reader.readAsDataURL(file);
    }

    const handleLogout = (e)=>{

        dispatch(userLogout())
        
    }

    if(!isAuth){
        return <Redirect to='/login'/>
    }
    else{
        return (
<MainDiv>
  
           <RightPorfile src= { state.image? state.image: "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}/>



           <LeftProfile>
               <FirstName htmlFor='firstName'> FirstName: </FirstName>
               <FirstNameInput  id='firstName' name='fistName' value={state.firstName} onChange={(e)=>setstate({...state,firstName:e.target.value})}/>

               <LastName htmlFor='lastName'>Lastname:</LastName>
               <LastNameInput id='lastName' name='lasstName'  value={state.lastName} onChange={(e)=>setstate({...state,lastName:e.target.value})}/>

               <Email htmlFor='email'>Email:</Email>
                <EmailInput id='email' name='email'  value={state.email} onChange={(e)=>setstate({...state,email:e.target.value})}/> 

               <Address  htmlFor='address'>Address</Address>
               <AddressInput id='address' name='address'  value={state.address} onChange={(e)=>setstate({...state,address:e.target.value})}/>

                <File htmlFor='image'> Choose Image </File>
                <FileInput type='file' id='image' name='image' onChange={handleImage}/>
                <Update type='submit' onClick={handelSubmit} > Update </Update>
                <Logout onClick={handleLogout}> Logout </Logout>
           </LeftProfile>
           
           </MainDiv>
        )
    }
    
}

export default Profile
