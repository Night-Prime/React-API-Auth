import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {Input} from '@mui/material';
import Button from '@mui/material/Button';
import authService from '../services/authService';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try{
      await authService.signUp(name, email, password, role).then(
        (response) => {
          console.log("Sucessfully Signed in: ", response);
          navigate('/');
        }
      );
    } catch(error) {
      console.log(error);
    }
  }


    return (
        <Box sx={{ flexGrow: 1,
         }}>

        <form onSubmit={handleSignUp}>
          <Input 
            type="text" 
            placeholder="Name"
            value={name}
            onChange = {(e) => setName(e.target.value)}
            /><br />
          <Input 
            type="email"
            placeholder="Email"
            value={email}
            onChange = {(e) => setEmail(e.target.value)}
             /><br />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /><br />
          
          <Input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            /><br />
        <Button type="submit" variant="contained">Register</Button>
        </form>
      </Box>
     );
}
 
export default SignUpPage;