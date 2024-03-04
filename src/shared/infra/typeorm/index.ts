import "reflect-metadata"
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

const dbname = process.env.POSTGRES_DB //|| 'pedidos_db'
const dbuser = process.env.POSTGRES_USER //|| 'docker'
const dbpassword = process.env.POSTGRES_PASSWORD //|| 'docker'
const dbhost = process.env.DB_HOST // || 'postgres-db'
    
const AppDataSource = new DataSource({
    type: "postgres",
    host: dbhost,
    port: 5432,
    username: dbuser,
    password: dbpassword,
    database: dbname,
    synchronize: true,
    logging: true,
    entities: ["./dist/shared/infra/typeorm/entities/*.js"],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export { AppDataSource } 