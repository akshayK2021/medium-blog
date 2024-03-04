Created an app which is deployed on clouflare(Serverless backend)
For that purpose hono library is used for use of code

postgres sql database is used from aiven because we have to use accelerate 
accelarate is used when working of database with serverless backend. For that purpose we have to create pool 
which will interact will all the workers and will interact with database
database cannot handle different workers hence to create poll we use accelerate of prisma


we have also published common modules such as zod to npm.

In this way Backend is implemented
