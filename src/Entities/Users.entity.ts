import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserType } from "./enums";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    firstname: string;

    @Column({nullable: false})
    lastname: string;


    @Column({nullable: false})
    username: string;

    @Column({
        type:'enum',
        enum: UserType,
        nullable: false,
        default: UserType.REPORTER
    })
    userType: string;

    @Column({
        unique: true,
        nullable: false
    })
    phone: string;

    @CreateDateColumn()
    createdOn: Date;

    @Column()
    password: string;
}