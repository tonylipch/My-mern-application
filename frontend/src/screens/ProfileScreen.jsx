import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { MDBInput,} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateMutation } from '../slices/usersApiSlices';


const ProfileScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [name, setName] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userInfo } = useSelector((state)=>state.auth)

    const [updateProfile, {isLoading}] = useUpdateMutation()

    useEffect(() => {
     setName(userInfo.name)
     setEmail(userInfo.email)
    },[userInfo.setName, userInfo.setEmail])

 const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

    return (
      <FormContainer className="p-3 my-5 d-flex flex-column w-50">
            <h1>Update profile</h1>

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

        {isLoading&& <Loader />}

        <Button
            type='submit'
            variant='primary'
            className='mt-3'
          >
            Update
          </Button>
      </Form>
    </FormContainer>
  
  
  )
}

export default ProfileScreen