import { EntitySchema } from 'typeorm';
import { BaseColumnSchemaPart } from './BaseColumnSchemaPart ';
import { Payment } from '../../../../clean/core/entity/Payment';


export const PaymentEntity = new EntitySchema<Payment>({
    name: 'payments',
    columns: {
        ...BaseColumnSchemaPart,
        orderId: {
            name: 'order_id',
            type: 'int'
        },
        amount: {
            type: 'decimal',
            default: 0
        },
        paymentUniqueNumber: {
            name: 'payment_unique_number',
            type: 'varchar',
        },
        paymentDate: {
            name: 'payment_date',
            type: 'timestamp with time zone',
        }
    },

    relations: {
        order: {
            type: 'many-to-one',
            target: 'orders',
            onDelete: 'SET NULL',
            joinColumn: {
                name: 'order_id'
            }
        }
    },
})