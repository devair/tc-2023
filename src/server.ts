import 'reflect-metadata';
import express, { Router } from 'express'

import "express-async-errors";

import { router } from '@driver/routers'

import '@shared/container';
import '@driven/infra/typeorm';


const app = express()

app.use(express.json())

app.get('/', (request, response)=>{
    return response.json({message: 'Wello world'})
})

app.use(router)

app.listen(3333, () => console.log("Server is running"))
