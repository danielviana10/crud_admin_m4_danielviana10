import express, { Application, json } from 'express'
import "express-async-errors";
import "dotenv/config";
import middlewares from './middlewares';
import {userRouter, loginRouter } from './routers';
import courseRouter from './routers/course.router';

const app: Application = express()
app.use(json())

app.use("/users", userRouter)
app.use("/courses", courseRouter)
app.use("/login", loginRouter)

app.use(middlewares.handleError)

export default app
