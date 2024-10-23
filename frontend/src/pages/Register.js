import { React } from "react";
import { RegisterForm } from "../components/RegisterForm";
const BACKEND = process.env.REACT_APP_API;

export const Register = () => {
    return (
        <div className="">
            <RegisterForm/>
        </div>
    )
}
