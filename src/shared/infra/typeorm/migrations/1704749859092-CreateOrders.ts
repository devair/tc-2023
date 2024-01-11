import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrders1704749859092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "orders",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isGenerated: true,
                        isPrimary: true,
                    },
                    {
                        name: 'customer_id',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                        isNullable: true
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKCustomerOrder',
                        referencedTableName: 'customers',
                        referencedColumnNames: ['id'],
                        columnNames: ['customer_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders')
    }

}
