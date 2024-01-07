import {Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm';

@Entity('categories')
class Category {
        
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string    

    @Column()
    description: string

    @CreateDateColumn()
    created_at?: Date    

    constructor(){
        if(!this.id){            
            this.created_at = new Date()
        }
    }
}
export { Category }