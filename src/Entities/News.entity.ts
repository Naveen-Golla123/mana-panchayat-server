import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category.entity";
import { Labels } from "./Labels.entity";

@Entity({name:"news"})

export class News {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: ""
    })
    title: string;

    @Column({
        nullable: false,
        default: ""
    })
    newsDescription: string;

    @CreateDateColumn()
    createdOn: Date;

    @Column({
        nullable: false,
        default: ""
    })
    imgUrl: string;

    @Column({
        nullable: false,
        default: ""
    })
    location: string;

    @Column()
    MetaDescription: string;
    
    // Relations
    @ManyToOne(()=> Category, category=> category.news)
    @JoinColumn()
    category: Category;

    @ManyToMany(()=> Labels)
    @JoinTable()
    labels: Labels[];
}