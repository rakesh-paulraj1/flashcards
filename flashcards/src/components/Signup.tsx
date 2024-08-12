import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
interface SignupInput {
    username: string;
    password: string;
}


export const  SignupCard = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
         username:"",
         password: ""

    });



    async function signuphandler() {
        
             axios.post(`${config.apiUrl}/signup`, postInputs)
            .then((response)=>{
                const jwt = response.data.body.jwt;
            const id = response.data.body.id;
            const name = response.data.body.username;
           const {message}=response.data
           alert(message);
            localStorage.setItem("token", jwt);
            localStorage.setItem("user", id);
            localStorage.setItem("username", name);
            navigate("/");
            })
            .catch((error)=>{
                if (axios.isAxiosError(error) && error.response) {
                    
                    console.error('Error response:', error.response.data);
                    const errorMessage = error.response.data.err || 'An error occurred during signup';
                    alert(errorMessage); 
            }})
            
      
        
    }
    return <div className="h-screen flex justify-center items-center">
        <div className="h-[470px] w-[360px] bg-neutral-950 rounded-lg shadow-slate-800 shadow-[0_0_10px_2px_rgb(148,163,184)] flex flex-col items-center p-4">
            <div>
                <div className="px-10">
                    <div className="font-bold text-4xl p-4 text-neutral-400">
                        SignUp
                    </div>
                    <div className="text-slate-400 ">
                         Already have an account ?
                        <Link className=" flex center underline" to="/signin">
                           SignIn
                        </Link>
                    </div>
                </div>
                
                      <LabelledInput label="Name" type={"text"} placeholder="Your Name " onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }} />
                
                    <LabelledInput label="Password" type={"password"} placeholder="Minimum 6 characters" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={signuphandler} type="button" className="mt-6 h-9 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 my-8">SignUp</button>
                    <div className="text-slate-400 ">
                        <Link to={'/dashboard'}>Access Flashcards</Link>
                    </div>
                </div>
            </div>
        </div>
    
}

interface LabelledInputType {

    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-white font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

