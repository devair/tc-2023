import 'reflect-metadata';
import express, { Router } from 'express'

import "express-async-errors";

import { router } from './routers'

import './shared/container';

const app = express()

app.use(express.json())

app.get('/', (request, response)=>{
    return response.json({messaege: 'Wello world'})
})

app.use(router)

app.listen(3333, () => console.log("server is running"))
