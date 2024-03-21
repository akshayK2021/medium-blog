
import Appbar from "../components/Appbar";
import Footer from "../components/Footer";




export default function Home() {
  
 
  return (
    <div>
      <Appbar />
      <div>
        <div className="flex justify-center items-center w-full h-[100vh]">
          <div className="flex flex-col justify-center w-[75%] mt-10 ">
            <div className="text-4xl font-bold text-center">Welcome to Blog App</div>
            <div className="text-2xl font-semibold text-center mt-4">Create and Share your thoughts with the world</div>
            <div className="text-2xl font-semibold text-center mt-4">Sign in or Sign up to get started</div>
          </div>
        </div>
      </div>

      <Footer />





    </div>
  )
}
