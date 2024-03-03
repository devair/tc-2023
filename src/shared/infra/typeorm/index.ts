import "reflect-metadata"
import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'database_pedidos',
    port: 5432,
    username: "docker",
    password: "docker",
    database: "pedidos_db",
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