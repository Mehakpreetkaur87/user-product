import express from "express";
import cookieParser from "cookie-parser";

// import { loggingMiddleware } from "./src/shared/middleware/auth.middleware.js";
import {routes} from "./src/routes/routes.js"

import { ApiError } from "./src/shared/error.js";

import { connectDB } from "./src/config/db.js";
const app = express();

const PORT = process.env.PORT;

console.log({PORT});

app.use(express.json()); // provides req.body

// app.use(loggingMiddleware); // logs method and url

app.use(cookieParser()); // read ccookies



app.use( "/api", routes); // registering the routes


app.get('/', (req, res) =>{
   return res.status(200).send({hello: "world !!!"});
})

app.use((error, req, res, next)=>{ // global error middleware
  if(error instanceof ApiError){
      return res.status(error.statusCode).send({
          data: { error: error.name},
          statusCode: error.statusCode,
          message: error.message
      });
  }
  return res.status(500).send({
      data: {},
      statusCode: 500,
      message: error.message
  });
});



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});