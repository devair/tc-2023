import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrderItems1704750394634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order_items',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        isPrimary: true,
                    },                    
                    {
                        name: 'order_id',
                        type: 'int',                        
                    },
                    {
                        name: 'product_id',
                        type: 'int',                        
                    },
                    {
                        name: 'unit_price',
                        type: 'decimal'
                    },
                    {
                        name: 'quantity',
                        type: 'int'
                    },                    
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKOrderOrderItem',
                        referencedTableName: 'orders',
                        referencedColumnNames: ['id'],
                        columnNames: ['order_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    },
                    {
                        name: 'FKProductOrderItem',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['product_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order_items')
    }

}
