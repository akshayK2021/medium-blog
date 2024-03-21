import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/utils/jwt/jwt";
import { createBlogInput, updateBlogInput } from "@akshaykawadse/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
   Variables: {
    userId:string;
   }
}>();

blogRouter.use("/*", async(c, next) => {
  const authHeader=c.req.header("authorization") || "";

  const user=await verify(authHeader,c.env.JWT_SECRET);
 
  if(user){
    c.set("userId",user.id);
     await next();
  }
  else{
    c.status(403)
    return c.json({
      message:"You are not logged in"
    })
  }
 
});



blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {success}=createBlogInput.safeParse(body);
  if(!success){
    return c.json({
      message:"Create Blog Input not correct",
    })
  }
  const authorId=c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId),
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (e) {
    return c.status(403);
  }
});



blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const {success}=updateBlogInput.safeParse(body)
    if(!success){
      return c.json({
        message:"Update Blog Input not correct",
      })
    }
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: blog.id,
    });
  } catch (e) {
    return c.status(403);
  }
});

blogRouter.get("/bulk", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.blog.findMany({
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        },
        published:true
      }
    })

    return c.json({
      blogs: blogs,
    });
  } catch (e) {
    return c.status(403);
  }
});



blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id =  c.req.param("id");
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id)
      },
      select:{
        content:true,
        title:true,
        id:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });

    return c.json({
      blog: blog,
    });
  } catch (e) {
    return c.status(403);
  }
});



//Todo: Add pagination

