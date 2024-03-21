import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog, useDetail } from "../hooks";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";


export default function Blog() {
  const {id}=useParams();
  const {loading,blog}=useBlog({
    id:id ||"" }
  );
  const {username}=useDetail();

  if(loading || !blog){
    return<div>
      <Appbar name={username}/>
       <div><Spinner/></div>
       </div>
  }
  return (
    <div>
    
      <FullBlog blog={blog}/>

    </div>
  )
}
