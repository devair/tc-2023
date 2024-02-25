import 'reflect-metadata';
import express, { Router } from 'express'

import "express-async-errors";

import { router } from './clean/external/routers'

//import './shared/container';
import './shared/infra/typeorm';


const app = express()

app.use(express.json())

app.get('/', (request, response)=>{
    return response.json({message: 'Wello world'})
})

app.use(router)

app.listen(3333, () => console.log("Server is running"))
