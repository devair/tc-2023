import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomers1704660514497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "customers" ,
               columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "cpf",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "email",
                    type: "varchar", 
                    isNullable: true                                    
                },
                {
                    name: "phone",
                    type: "varchar",
                    isNullable: true                        
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }          
               ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("customers")
    }

}
