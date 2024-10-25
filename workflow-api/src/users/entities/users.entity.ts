import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    GUEST = 'GUEST'
}

@Entity('bg_user')
export class Users {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    username: string;
    
    @Column()
    password: string;
    
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role

    @CreateDateColumn({
        type: 'timestamp'
    })
    registered_at: Date
}