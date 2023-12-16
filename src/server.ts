import express from 'express'


const app = express()

app.use(express.json())

app.get('/', (request, response)=>{
    return response.json({messaege: 'Wello world'})
})


app.listen(3333, () => console.log("server is running"))
