import express, {Request, Response} from "express";
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { todoRouter } from './routes/todo';
import passport from 'passport';
import { configurePassport } from "./passport/passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { unlink } from "fs";
import expressSession from 'express-session';
import { configureRoutes } from "./routes/routes";

const app = express();


app.get("/", (req: Request, res: Response) => {
    return res.send("Hello World!");
});

app.route('/')
.get((req: Request, res: Response) =>{
return res.send('You make a GET request');
})
.post((req: Request, res: Response) =>{
    return res.send('You make a POST request');
    })
    .put((req: Request, res: Response) =>{
        return res.send('You make a PUT request');
        })
        .all((req: Request, res: Response) =>{
            return res.send('You make an X request');
            });

mongoose.connect('mongodb://localhost:27017/todo', {}).then(res=>console.log('connected to database'))


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized : false
}
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);
app.use('/app', configureRoutes(passport, express.Router()));

                        
app.listen(3000, () => {
    console.log("Application listening at http://localhost:3000");
});
