import { LabelUI, InputUI, ButtonUI } from "./ui";
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthProvider';
import TaskFlowLogo from '../assets/taskflow.png';

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();
  const { register } = useContext(AuthContext); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password === confPassword){
      const tryRegister = await register(username, email, password, confPassword); 
      if (tryRegister) {
        toast.success('Welcome to ecodrive');
        // navigate("/"); 
      } else {
        toast.error('Invalid credentials, please try again.');
      }
    }else{
      toast.error('The passwords do not match. Please try again.')
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="TaskFlow"
            src={TaskFlowLogo}
            className="mx-auto h-24 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Get started
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">

              <div className="mt-2 pr-1 ">
                <div className="mb-2">
                    <label htmlFor='username' className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                </div>                
                <InputUI 
                  id='name'
                  name='name' 
                  type='text' 
                  placeholder='jimmy123'
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
              </div>


            <div>
              <LabelUI htmlFor='email'>Email</LabelUI>
              <div className="mt-2">
                <InputUI 
                  id='email' 
                  name='email' 
                  type='email' 
                  autoComplete="email" 
                  placeholder='email@gmail.com' 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <LabelUI htmlFor='password'>Password</LabelUI>
              </div>
              <div className="mt-2">
                <InputUI 
                  id='password'
                  name='password' 
                  type='password' 
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>
            </div>
                
            <div>
              <div className="flex items-center justify-between">
                <LabelUI htmlFor='password'>Confirm password</LabelUI>
              </div>
              <div className="mt-2">
                <InputUI 
                  id='confpassword'
                  name='confpassword' 
                  type='password' 
                  autoComplete="current-password"
                  onChange={(e) => setConfPassword(e.target.value)} 
                  required
                />
              </div>
            </div>

            <div>
              <ButtonUI type='submit'> Sign up </ButtonUI>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already registered?{' '}
            <a href="/login" className="font-semibold leading-6 text-eco2.1 hover:text-eco2">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
