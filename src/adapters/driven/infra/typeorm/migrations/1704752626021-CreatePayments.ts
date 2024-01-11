import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePayments1704752626021 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'payments',
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
                        isNullable: true
                    },
                    {
                        name: 'amount',
                        type: 'decimal'
                    },
                    {
                        name: 'payment_unique_number',
                        type: 'varchar'
                    },                    
                    {
                        name: 'payment_date',
                        type: 'timestamp',                        
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKOrderPayment',
                        referencedTableName: 'orders',
                        referencedColumnNames: ['id'],
                        columnNames: ['order_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payments')
    }

}
