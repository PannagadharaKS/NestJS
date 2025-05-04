import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;
}

    // @PrimaryColumn()                               --->            PRIMARY KEY WITHOUT AUTO GENERATE FUNC
    // @PrimaryGeneratedColumn()                      --->            PRIMARY KEY AUTO GENERATE FUNC