import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { MDBInput,} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlices';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [name, setName] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state)=>state.auth)

    const [register,{isLoading}] = useRegisterMutation()

    useEffect(() => {
      if(userInfo){
        navigate('/')
      }
    },[navigate,userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        
        if(password !== confirmPassword){
          toast.error('Passwords do not match')
        }else{
          try {
            const res = await register({name, email, password}).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
          } catch (err) {
            toast.error(err?.data?.message|| err.error)
          }
        }
    }

    return (
      <FormContainer className="p-3 my-5 d-flex flex-column w-50">
            <h1>Sign up</h1>

      <Form onSubmit={submitHandler}>
        <MDBInput  wrapperClass='mb-4'
         label='Name'
          type='name'
          value={name}
          onChange={(e)=> setName(e.target.value)}  />
          
        <MDBInput wrapperClass='mb-4' label='Email address'  type='email'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}/>

        <MDBInput wrapperClass='mb-4' label='Password'  type='password'
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>

         <MDBInput wrapperClass='mb-4' label='Confirm password'  type='password'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}/>

        {isLoading&&<Loader />}

        <Button
            type='submit'
            variant='primary'
            className='mt-3'
          >
            Sign up
          </Button>

        <div className="text-center">
         <p>Alreadt have an Account? <Link to='/login'>Sign in</Link></p>
        </div>
      </Form>
    </FormContainer>
  
  
  )
}

export default RegisterScreen