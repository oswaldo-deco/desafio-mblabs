import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Partner } from "./partner.entity";
import { Ticket } from "./ticket.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Event{
    @PrimaryColumn("uuid")
    readonly id:string

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    localization:string

    @Column()
    adress:string
    
    @Column()
    date:Date

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(type => Ticket, ticket=>ticket.event, {eager:true})
    tickets: Ticket[]

    @ManyToMany(type=> Partner, {eager: true})@JoinTable()
    partners: Partner[]

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
    }
}