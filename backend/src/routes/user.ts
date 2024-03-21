import { Hono } from "hono";
import {  PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@akshaykawadse/medium-common";





export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();



userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success}=signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs not correct"
    })
  }


  try {
    
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name:body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    return c.status(403);
  }
});


userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const {success}=signinInput.safeParse(body);
    if(!success){
      return c.body("Hitting Signin Route",403,{
        message:"Inputs not correct"
      })
    }
    const user = await prisma.user.findFirst({
      where: {
        username: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        message: "Incorrect Username or Password ",
      });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.json({
      message: "Eror occured while signin",
    });
  }
  return c.text("a");
});

userRouter.get("/details", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authHeader=c.req.header("authorization") || "";
  console.log("authHea",authHeader)

  const id=await verify(authHeader,c.env.JWT_SECRET);
  const user=await prisma.user.findFirst({ where: { id: id.id } });
  // console.log("user`",user)
  if(user){
    return c.json({
     username: user.name
    })
     
  }
  else{
    c.status(403)
    return c.json({
      message:"You are not logged in"
    })
  }
 

})

userRouter.get("/delete",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  await prisma.blog.deleteMany();
  await prisma.user.deleteMany();
  
  return c.json({
    message:"Deleted all users"
  })
  
  

})
