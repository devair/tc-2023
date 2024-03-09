import 'reflect-metadata'
import express from 'express'
import "express-async-errors"
import { router } from './clean/external/web/routers'
import './clean/external/datasource/typeorm'
import * as dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import * as swaggerFile from './openapi.json'

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3333;

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/health', (request, response) => {
    return response.status(200).send('Ok');
})

app.use('/api/v1', router)

app.listen(port, () => console.log(`Server is running at port ${port}`))
