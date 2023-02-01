import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Labels {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    name: string;
}