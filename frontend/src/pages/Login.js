import { React } from "react";
import { LoginForm } from "../components/LoginForm";
const BACKEND = process.env.REACT_APP_API;

export const Login = () => {
    return (
        <div className="">
            <LoginForm/>
        </div>
    )
}
