import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export default function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div className="border border-slate-200 py-4 w-full p-3">
      <div className="flex  items-center ">
        <div className="flex justify-center ">
          <Avatar name={authorName} />
        </div>
        <div className="font-extralight text-sm pl-2">{authorName} </div>
        <div className="text-[7px] font-light  text-slate-400 pl-2  ">
          &#9679;
        </div>
        <div className="pl-2 font-thin text-sm ">{publishedDate}</div>
      </div>
      <div className="text-xl pt-2 font-semibold">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-500 text-sm  pt-4 font-thin">
        {`${Math.ceil(content.length / 100)}minute(s)  read`}
      </div>
      {/* <div className="bg-slate-200 h-1 w-full"></div> */}
    </div>
    </Link>
  );
}

export function Avatar({ name,size=6 }: { name: string,
size?: number}) {

  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400  rounded-full dark:bg-gray-600 w-${size} h-${size}`}>
      <span className={` font-semibold text-${size===6?"xs":"md"}   text-gray-700 dark:text-gray-300`}>
        {(name[0]+name[1]).toUpperCase()}
      </span>
    </div>
  );
}
