import { EntitySchema } from 'typeorm';
import { Product } from '../../../../domain/Product';
import { BaseColumnSchemaPart } from './BaseColumnSchemaPart ';


export const ProductEntity = new EntitySchema<Product>({
    name: 'products',
    columns: {
        ...BaseColumnSchemaPart,
        code: {
            type: 'varchar',
            unique: true
        },
        name: {
            type: 'varchar',
            unique: true
        },
        description: {
            type: 'varchar',
        },
        price: {
            type: 'decimal',
            default: 0
        },
        image: {
            type: 'varchar',
        },
        categoryId: {
            name: 'category_id',
            type: 'int'
        }        
    },
    
    relations: {
        category: {
            type: 'many-to-one',
            target: 'categories', 
            onDelete: 'SET NULL',
            joinColumn: {
                name: 'category_id'
            }
        },

        orders: {
            type: 'many-to-many',            
            target: 'orders',            
            joinColumn: {
                name: 'product_id'
            },                                
        }
    },
})