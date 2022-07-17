import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity()
export class Partner {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column({
        length: 120,
        nullable: false,
    })
    name: string;

    @Column({
        length: 300,
        nullable: false,
    })
    description: string;

    @Column()
    logo:string

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @Column({
    default: true,
    })
    active: boolean;

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
    }
}