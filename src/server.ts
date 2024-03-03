import 'reflect-metadata';
import express, { Router } from 'express'
import "express-async-errors";
import { router } from './clean/external/web/routers'
import './shared/infra/typeorm';

const app = express()
const port = process.env.PORT || 3333;

app.use(express.json())

app.get('/health', (request, response) => {
    return response.status(200).send('Ok');
})

app.use('/api/v1', router)

app.listen(port, () => console.log(`Server is running at port ${port}`))
