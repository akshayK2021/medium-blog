import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SignupInput } from "@akshaykawadse/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export default function Auth({ type }: { type: "signup" | "signin" }) {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const navigate=useNavigate();

 async function sendRequest(){
  try{

   const response=await  axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)

   const jwt=response.data.jwt;
  
   localStorage.setItem("token",jwt);
   navigate("/blogs")
  
  }catch(err){

 // @ts-expect-error: Error handling for potential response data message
 alert(`${err.response.data.message}`);
  }
}
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center ">
        <div>
        <div className="px-10">
          <div className="text-3xl font-extrabold">{type==="signin"?"Enter Your Credentials":"Create an account"}</div>
          <div className=" text-slate-400">
          {type==="signin"?"Don't have an account? ":"Already have and account?"}  
            <Link className="underline pl-2" to={type==="signin"?"/signup":"/signin"}>
              {type==='signin'?"Sign up":"Sign in"}
            </Link>
          </div>
        </div>
        <div className="pt-4">
          {type==='signup'?<LabelledInput
            label="Name"
            placeholder="akshay"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
          });
            }}
          />:null}
          <LabelledInput
            label="Username"
            placeholder="akshay@gmail.com"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                username: e.target.value,
              });
            }}
          />
          <LabelledInput
            label="Password"
            type={"password"}
            placeholder="123456"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
     
          <button type="button" onClick={sendRequest}className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
           focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
            dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up":"Sign in"}</button>

        </div>
      </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div  className="mt-4">
      <label className="block mb-1 text-md  text-black font-semibold">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
       dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
