import React, { useContext, useState } from "react";
import { LabelUI, InputUI, ButtonUI } from "./ui";
import { AuthContext } from "../context/AuthProvider";
import { BoardContext } from "../context/BoardContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import TaskFlowLogo from '../assets/taskflow.png';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);
    const {fetchBoards} = useContext(BoardContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(email && password){
            if(await login(email, password)){
                toast.success('Welcome again')
            }else{
                toast.error('Invalid credentials, please try again.');
            }
        }
    }

    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="TaskFlow"
            src={TaskFlowLogo}
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                <div className="text-sm">
                  <a href="/" className="font-semibold text-eco2.1 hover:text-eco2">
                    Forgot password?
                  </a>
                </div>
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
              <ButtonUI type='submit'> Sign in </ButtonUI>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
              <a href='/register' className="font-semibold leading-6 text-eco2.1 hover:text-eco2">
                Sign up here
              </a>
          </p>
        </div>
      </div>
    )
}