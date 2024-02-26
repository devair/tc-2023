import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./BaseColumnSchemaPart ";
import { Customer } from "../../../../clean/core/entity/Customer";


export const CustomerEntity = new EntitySchema<Customer>({
    name: "customers",
    columns: {
        ...BaseColumnSchemaPart,
        name: {
            type: 'varchar',
        },
        cpf: {
            type: 'varchar',
            unique: true
        },
        email: {
            type: 'varchar',
            unique: true
        },
        phone: {
            type: 'varchar',            
        },
        
    },

})