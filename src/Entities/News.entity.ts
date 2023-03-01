import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category.entity";
import { Labels } from "./Labels.entity";
import { Users } from "./Users.entity";

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

    @ManyToOne(()=> Users, users=> users.newsCreated)
    @JoinColumn()
    author: Users;

    @Column()
    MetaDescription: string;

    @Column({
        nullable:false,
        default: false
    })
    isDeleted: boolean
    
    // Relations
    @ManyToOne(()=> Category, category=> category.news)
    @JoinColumn()
    category: Category;

    @ManyToMany(()=> Labels)
    @JoinTable()
    labels: Labels[];

    createOnDate: string;

    @Column({
        default: 0
    })
    views: number;
}