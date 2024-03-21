import Appbar from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
          <div className="col-span-8 ">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd Dec 2023</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4 ">
            <div className="text-slate-600 text-lg">
            Author
            </div>
            
            <div className="flex w-full flex-row items-center">
              <div className="pr-3">
              <Avatar name={blog.author.name || "Anonymous"} size={10} />
              </div>
              <div className="flex flex-col">
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random call phrase about the author's ability to grab the
                  users attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
