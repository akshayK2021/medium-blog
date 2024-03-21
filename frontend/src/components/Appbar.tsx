import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export default function Appbar({name="Anonymous"}:{name?:string}) {
  
  return (
    <div className="border-b flex justify-between px-10 py-4 items-center">
     <Link to={"/blogs"}  className=" cursor-pointer  font-semibold">
        MEDIUM

      </Link>
      <div className={`${name==="Anonymous"?"hidden":"block"}`}>
        <Link to={"/publish"}>
        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none
           focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2
           ">New</button>
        </Link>


        
        <Avatar name={name || "Anonymous"} size={10}/>

      </div>
      <div className={`${name==="Anonymous"?"block":"hidden"}`}>
        <Link to={"/signin"}>
        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none
           focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2
           ">Signin</button>
        </Link>
        <Link to={"/signup"}>
        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none
           focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2
           ">Signup</button>
        </Link>
        </div>

    </div>
  )
}
