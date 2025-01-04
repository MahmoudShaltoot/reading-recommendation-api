import { UserReadBook } from "src/users-read-book/entities/user-read-book.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({default: false})
    is_admin: boolean

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => UserReadBook, (usersReadBook) => usersReadBook.user)
    usersReadBooks: UserReadBook[];
}
