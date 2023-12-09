import { config } from 'dotenv';
config({
    path: './config/config.env'
})
import express from 'express';
import ErrorMiddleware from './middlewares/Error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

// Using middlewares
app.use(express.json());

app.use(cookieParser())

app.use(cors({
    origin:'http://127.0.0.1:3000/login',
    withCredentials: false,
    methods:["GET","POST","PUT","DELETE"]
}));
app.use(express.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

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
