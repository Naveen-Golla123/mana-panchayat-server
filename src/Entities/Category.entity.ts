import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News.entity";

@Entity({name: "category"})
export class Category {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable:false
    })
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @OneToMany(()=>News,news=> news.category)
    news: News[];
}