import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User_Ticket } from "./user_tickets.entity";
import { Event } from "./event.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Ticket{
    @PrimaryColumn("uuid")
    readonly id:string;

    @Column({
        nullable: false
    })
    price:number

    @Column({
        nullable: false
    })
    type: string

    @Column({
        nullable:true
    })
    observations: string

    @Column({
        nullable:true
    })
    amount: number

    @Column({
        nullable:true
    })
    amount_left: number

    @OneToMany(type => User_Ticket, user_ticket=>user_ticket.ticket, {eager:true})
    user_tickets: User_Ticket[]

    @ManyToOne(type=>Event, event => event.tickets, {onDelete: "CASCADE"})
    event:Event

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
    }
}