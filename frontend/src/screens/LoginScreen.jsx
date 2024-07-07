import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {MDBInput}from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlices';
import { setCredentials } from '../slices/authSlice';
import {toast} from 'react-toastify'
import Loader from '../components/Loader';

  

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] =  useLoginMutation()

    const {userInfo} = useSelector((state) => state.auth)

    useEffect(()=>{
      if(userInfo){
        navigate('/')
      }
    },[navigate, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
          const res = await login({email, password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate('/')
        } catch (err) {
         toast.error(err?.data?.message || err.error)
        }
    }

    return (
      <FormContainer className="p-3 my-5 d-flex flex-column w-50">
            <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
      <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'
      value={email}
      onChange={(e)=> setEmail(e.target.value)}/>

      <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}/>

      {isLoading && <Loader />}

      <Button
          type='submit'
          variant='primary'
          className='mt-3'
        >
          Sign In
        </Button>

      <div className="text-center">
        <p>Not a member? <Link to='/register'>Register</Link></p>
      </div>
      </Form>
    </FormContainer>
  
  
  )
}

export default LoginScreen