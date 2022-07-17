import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import { v4 as uuid } from "uuid";
import { User_Ticket } from "./user_tickets.entity";
  
  @Entity()
  export class User {
    @PrimaryColumn("uuid")
    readonly id: string
  
    @Column({
      length: 100,
      unique: true,
      nullable: false,
    })
    email: string;
  
    @Column({
      length: 100,
      nullable: false,
    })
    name: string;
  
    @Column({
      length: 100,
      nullable: false,
    })
    password: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column({ default: false })
    is_admin: boolean;

    @Column({default:false})
    authorized_email: boolean;

    @OneToMany(type => User_Ticket, user_ticket=>user_ticket.user, {eager:true})
    user_tickets: User_Ticket[]
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
  }
  