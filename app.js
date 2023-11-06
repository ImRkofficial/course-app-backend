import { config } from 'dotenv';
config({
    path: './config/config.env'
})
import express from 'express';
import ErrorMiddleware from './middlewares/Error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import proxy from   "node-global-proxy";

let Proxy = proxy.default;
Proxy.setConfig({
  http: "http://localhost:3000",
  https: "https://localhost:3000",
});
Proxy.start();


const app = express();

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:['GET','POST','PUT','DELETE']
}))


// Importing and Using routes
import course from './routes/CourseRoutes.js';
import user from './routes/UserRoutes.js';
import payment from './routes/PaymentRoutes.js';
import other from './routes/OtherRoutes.js';
app.use('/api/v1', course);
app.use('/api/v1', user);
app.use('/api/v1', payment);
app.use('/api/v1', other);


app.get('/',(req,res)=>{
    res.status(200).send(`<h1>Server is Working good Click <a href="${process.env.FRONTEND_URL}">here</a> to visit frontend !</h1>`)
})


export default app;


app.use(ErrorMiddleware);