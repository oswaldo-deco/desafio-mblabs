import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import { Ticket } from "./ticket.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class User_Ticket{
    @PrimaryColumn("uuid")
    readonly id:string;

    @ManyToOne(type=>User, user => user.user_tickets)
    user: User

    @ManyToOne(type=>Ticket, ticket => ticket.user_tickets)
    ticket:Ticket

    @CreateDateColumn()
    bought_at:Date

    @Column()
    price_paid:number

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
    }
}