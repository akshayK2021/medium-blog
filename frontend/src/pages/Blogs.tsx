import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs, useDetail } from "../hooks";
export default function Blogs() {
  const {loading,blogs}=useBlogs();
   const {username}=useDetail();
  if(loading){
    return <div className="flex flex-col justify-center items-center w-full h-[100vh]">
      <BlogSkeleton/>
      
     
    </div>
  }
  return (
    <div>
      <Appbar name={username} />
      <div className="  flex justify-center w-full">
        <div className="flex flex-col justify-center w-[75%] mt-10 ">
          {blogs.map(blog => <BlogCard key={blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"19 Mar 2024"}
          />)}
          

        </div>
      </div>
    </div>
  );
}
